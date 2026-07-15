import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return NextResponse.json({ success: false, error: { message: 'No file provided' } }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const finalName = `${uniqueSuffix}-${filename}`;

    // Target the public/uploads directory in the Next.js app
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, finalName);
    fs.writeFileSync(filePath, buffer);

    // Return the URL that can be used directly in <img> tags
    return NextResponse.json({
      success: true,
      data: { url: `/uploads/${finalName}` }
    });
  } catch (error) {
    console.error('Local Upload Error:', error);
    return NextResponse.json({ success: false, error: { message: 'Upload failed on server' } }, { status: 500 });
  }
}
