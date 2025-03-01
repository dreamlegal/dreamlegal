

import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// Correctly named environment variables
const REGION = process.env.AWS_REGION;
const ACCESS_KEY = process.env.AWS_ACCESS_ID;
const SECRET_KEY = process.env.AWS_SECRET_ID;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// Define the folder structure inside the S3 bucket
const FOLDER_PATH = 'blog/images/';

// Debug environment variables to console (will appear in server logs)
console.log('AWS Config Check:');
console.log('- Region:', REGION ? 'Set' : 'Missing');
console.log('- Access Key:', ACCESS_KEY ? 'Set' : 'Missing');
console.log('- Secret Key:', SECRET_KEY ? 'Set' : 'Missing');
console.log('- Bucket Name:', BUCKET_NAME ? 'Set' : 'Missing');

// Create S3 client only if credentials are available
const s3Client = ACCESS_KEY && SECRET_KEY ? new S3Client({
  region: REGION || 'us-east-1',
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
}) : null;

export async function POST(request) {
  try {
    // First verify environment config
    if (!s3Client) {
      console.error('AWS credentials not configured');
      return NextResponse.json(
        { error: 'Server is not configured for file uploads' },
        { status: 500 }
      );
    }

    if (!BUCKET_NAME) {
      console.error('AWS_S3_BUCKET_NAME not configured');
      return NextResponse.json(
        { error: 'Upload destination not configured' },
        { status: 500 }
      );
    }

    // Get the file from form data
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      );
    }

    // Get file data
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name;
    const fileExtension = filename.split('.').pop();
    
    // Generate unique filename
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    
    // Create the full path in S3, using the blog/images folder structure
    const key = `${FOLDER_PATH}${uniqueFilename}`;
    
    // Prepare upload command - REMOVED ACL parameter
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type
      // ACL parameter removed
    });
    
    console.log('Attempting S3 upload to bucket:', BUCKET_NAME);
    console.log('File path:', key);
    await s3Client.send(command);
    console.log('S3 upload successful');
    
    // Return the URL to the uploaded file
    const fileUrl = `https://${BUCKET_NAME}.s3.${REGION || 'us-east-1'}.amazonaws.com/${key}`;
    
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error('Failed to upload file to S3:', error);
    console.error('Error details:', error.message);
    
    // More user-friendly error message
    return NextResponse.json(
      { error: 'File upload failed: ' + error.message },
      { status: 500 }
    );
  }
}