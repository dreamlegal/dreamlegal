// /app/api/upload-to-s3/route.js
import { NextRequest, NextResponse } from "next/server";
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_ID,
  region: process.env.AWS_REGION,
});

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json(
        { msg: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { msg: "Invalid file type. Only JPEG, PNG, and WebP are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { msg: "File size too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const uniqueFilename = `case-studies/${uuidv4()}.${fileExtension}`;

    // Upload parameters
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: uniqueFilename,
      Body: buffer,
      ContentType: file.type,
    //   ACL: 'public-read', // Make file publicly accessible
    };

    console.log('Uploading to S3 with params:', {
      bucket: process.env.AWS_BUCKET_NAME,
      key: uniqueFilename,
      contentType: file.type
    });

    // Upload to S3
    const result = await s3.upload(uploadParams).promise();

    console.log('S3 upload successful:', result.Location);

    return NextResponse.json(
      { 
        url: result.Location,
        key: uniqueFilename,
        msg: "Image uploaded successfully" 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error uploading image to S3:", error);
    
    // Provide more specific error messages
    if (error.code === 'InvalidAccessKeyId') {
      return NextResponse.json(
        { msg: "Invalid AWS credentials" },
        { status: 500 }
      );
    }
    
    if (error.code === 'NoSuchBucket') {
      return NextResponse.json(
        { msg: "S3 bucket not found" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        msg: "Failed to upload image",
        error: error.message 
      },
      { status: 500 }
    );
  }
}