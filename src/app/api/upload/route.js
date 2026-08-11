import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return NextResponse.json({ success: false, error: { message: 'No file provided' } }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Upload to ImgBB directly instead of local filesystem
    const imgbbFormData = new FormData();
    imgbbFormData.append('image', buffer.toString('base64'));

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      throw new Error('ImgBB API key is missing');
    }

    const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: imgbbFormData,
    });

    const data = await imgbbRes.json();

    if (data.success) {
      return NextResponse.json({
        success: true,
        data: { url: data.data.url }
      });
    } else {
      throw new Error(data.error?.message || 'ImgBB upload failed');
    }
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ success: false, error: { message: 'Upload failed on server' } }, { status: 500 });
  }
}
