import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { validateImageUpload } from '@/lib/uploadSecurity';

/**
 * Simple per-account rate limit. The upload endpoint is a write endpoint on
 * an authenticated account, so it is limited to stop one account from filling
 * the storage volume.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_UPLOADS = 20;
const uploadLog = new Map();

const isRateLimited = (key) => {
  const now = Date.now();
  const entries = (uploadLog.get(key) || []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (entries.length >= RATE_LIMIT_MAX_UPLOADS) {
    uploadLog.set(key, entries);
    return true;
  }

  entries.push(now);
  uploadLog.set(key, entries);
  return false;
};

export async function POST(request) {
  try {
    // 1. Authentication — the endpoint writes to shared storage, so it is
    //    never open to anonymous callers.
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const rateKey = session.user.id || session.user.email || 'anonymous';
    if (isRateLimited(rateKey)) {
      return NextResponse.json(
        { success: false, error: { message: 'Too many uploads. Please try again later.' } },
        { status: 429 }
      );
    }

    // 2. Read the upload
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file || typeof file.arrayBuffer !== 'function') {
      return NextResponse.json(
        { success: false, error: { message: 'No file provided' } },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // 3. Validate the content, not the claim about the content
    const validation = validateImageUpload(buffer, file.type);
    if (!validation.ok) {
      return NextResponse.json(
        { success: false, error: { message: validation.message } },
        { status: validation.status }
      );
    }

    // 4. Store it under a name the server generated
    const uniqueFileName = `${crypto.randomUUID()}.${validation.ext}`;

    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, uniqueFileName);
      await fs.writeFile(filePath, buffer);

      return NextResponse.json({
        success: true,
        data: { url: `/uploads/${uniqueFileName}` },
      });
    } catch (fsErr) {
      // Serverless environments without a writable filesystem fall back to an
      // inline data URL. The bytes are already validated at this point.
      console.warn(
        'Filesystem write not supported in serverless environment, falling back to base64 Data URL:',
        fsErr.message
      );
      const dataUrl = `data:${validation.mime};base64,${buffer.toString('base64')}`;
      return NextResponse.json({
        success: true,
        data: { url: dataUrl },
      });
    }
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json(
      { success: false, error: { message: error.message || 'Upload failed on server' } },
      { status: 500 }
    );
  }
}
