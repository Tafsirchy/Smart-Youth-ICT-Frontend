import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return NextResponse.json({ success: false, error: { message: 'No file provided' } }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // 1. Try ImgBB if configured with a valid key (skipping known revoked keys)
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || process.env.IMGBB_API_KEY;
    if (apiKey && apiKey !== 'c8de207469679f516027a964db8ddf78') {
      try {
        const imgbbFormData = new FormData();
        imgbbFormData.append('image', buffer.toString('base64'));

        const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: 'POST',
          body: imgbbFormData,
        });

        const data = await imgbbRes.json();
        if (data.success && data.data?.url) {
          return NextResponse.json({
            success: true,
            data: { url: data.data.url }
          });
        }
      } catch (imgbbErr) {
        console.warn('ImgBB upload failed, falling back to local storage:', imgbbErr.message);
      }
    }

    // 2. Resilient Storage: Local public/uploads/ (local dev) or Data URL (Vercel Serverless)
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });

      const originalName = file.name || 'image.png';
      const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${cleanName}`;
      const filePath = path.join(uploadDir, uniqueFileName);

      await fs.writeFile(filePath, buffer);

      const publicUrl = `/uploads/${uniqueFileName}`;
      return NextResponse.json({
        success: true,
        data: { url: publicUrl }
      });
    } catch (fsErr) {
      console.warn('Filesystem write not supported in serverless environment, falling back to base64 Data URL:', fsErr.message);
      const mimeType = file.type || 'image/png';
      const base64Data = buffer.toString('base64');
      const dataUrl = `data:${mimeType};base64,${base64Data}`;
      return NextResponse.json({
        success: true,
        data: { url: dataUrl }
      });
    }
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ success: false, error: { message: error.message || 'Upload failed on server' } }, { status: 500 });
  }
}
