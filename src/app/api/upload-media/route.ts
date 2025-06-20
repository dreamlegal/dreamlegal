import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// Configure AWS S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ID,
  },
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const type = formData.get('type'); // 'image' or 'video'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!type || !['image', 'video'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "image" or "video"' },
        { status: 400 }
      );
    }

    // Validate file type based on type parameter
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const validVideoTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
    
    if (type === 'image' && !validImageTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid image type. Only JPEG, PNG, and WebP are allowed' },
        { status: 400 }
      );
    }

    if (type === 'video' && !validVideoTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid video type. Only MP4, MPEG, MOV, AVI, and WebM are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (5MB for images, 100MB for videos)
    const maxSize = type === 'image' ? 5 * 1024 * 1024 : 100 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size must be less than ${type === 'image' ? '5MB' : '100MB'}` },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `legal-software/${type}s/${uuidv4()}.${fileExtension}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to S3
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME || 'dreamlegal-backend',
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    // Construct the file URL
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return NextResponse.json(
      { 
        url: fileUrl,
        fileName: fileName,
        type: type,
        message: `${type} uploaded successfully` 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// DELETE method to remove files from S3
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return NextResponse.json(
        { error: 'No fileName provided' },
        { status: 400 }
      );
    }

    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME || 'dreamlegal-backend',
      Key: fileName,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));

    return NextResponse.json(
      { message: 'File deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}