// // app/api/upload/route.ts
// import { NextResponse } from 'next/server';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import { v4 as uuidv4 } from 'uuid';

// // Environment variables
// const REGION = process.env.AWS_REGION;
// const ACCESS_KEY = process.env.AWS_ACCESS_ID;
// const SECRET_KEY = process.env.AWS_SECRET_ID;
// const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// // Define the folder structure inside the S3 bucket
// const FOLDER_PATH = 'post/images/';

// // Create S3 client
// const s3Client = ACCESS_KEY && SECRET_KEY ? new S3Client({
//   region: REGION || 'us-east-1',
//   credentials: {
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_KEY,
//   },
// }) : null;

// // Upload a single file to S3
// async function uploadToS3(file: File): Promise<string> {
//   if (!s3Client || !BUCKET_NAME) {
//     throw new Error('S3 client or bucket name not configured');
//   }
  
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename = file.name;
//   const fileExtension = filename.split('.').pop();
  
//   // Generate unique filename
//   const uniqueFilename = `${uuidv4()}.${fileExtension}`;
  
//   // Create the full path in S3
//   const key = `${FOLDER_PATH}${uniqueFilename}`;
  
//   // Upload to S3
//   const command = new PutObjectCommand({
//     Bucket: BUCKET_NAME,
//     Key: key,
//     Body: buffer,
//     ContentType: file.type
//   });
  
//   await s3Client.send(command);
  
//   // Return the URL to the uploaded file
//   return `https://${BUCKET_NAME}.s3.${REGION || 'us-east-1'}.amazonaws.com/${key}`;
// }

// export async function POST(request: Request) {
//   try {
//     // Check if S3 is configured
//     if (!s3Client) {
//       console.error('AWS credentials not configured');
//       return NextResponse.json(
//         { error: 'Server is not configured for file uploads' },
//         { status: 500 }
//       );
//     }

//     if (!BUCKET_NAME) {
//       console.error('AWS_BUCKET_NAME not configured');
//       return NextResponse.json(
//         { error: 'Upload destination not configured' },
//         { status: 500 }
//       );
//     }

//     // Get the form data
//     const formData = await request.formData();
    
//     // Handle single file upload
//     if (formData.has('file')) {
//       const file = formData.get('file') as File;
      
//       if (!file) {
//         return NextResponse.json({ error: 'No file provided' }, { status: 400 });
//       }
      
//       const fileUrl = await uploadToS3(file);
//       return NextResponse.json({ url: fileUrl });
//     }
    
//     // Handle multiple file upload
//     else if (formData.has('files')) {
//       const files = formData.getAll('files') as File[];
      
//       if (!files || files.length === 0) {
//         return NextResponse.json({ error: 'No files provided' }, { status: 400 });
//       }
      
//       // Upload all files
//       const uploadPromises = files.map(file => uploadToS3(file));
//       const fileUrls = await Promise.all(uploadPromises);
      
//       return NextResponse.json({ urls: fileUrls });
//     }
    
//     return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    
//   } catch (error: any) {
//     console.error('Failed to upload to S3:', error);
    
//     return NextResponse.json(
//       { error: 'File upload failed: ' + error.message },
//       { status: 500 }
//     );
//   }
// }

// // Maximum payload size for uploads (adjust according to your needs)
// export const config = {
//   api: {
//     bodyParser: false,
//     responseLimit: '10mb',
//   },
// };
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// Environment variables
const REGION = process.env.AWS_REGION;
const ACCESS_KEY = process.env.AWS_ACCESS_ID;
const SECRET_KEY = process.env.AWS_SECRET_ID;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// Define the folder structure inside the S3 bucket
const FOLDER_PATH = 'post/images/';

// Create S3 client
const s3Client = ACCESS_KEY && SECRET_KEY ? new S3Client({
  region: REGION || 'us-east-1',
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
}) : null;

// Upload a single file to S3
async function uploadToS3(file: File): Promise<string> {
  if (!s3Client || !BUCKET_NAME) {
    throw new Error('S3 client or bucket name not configured');
  }
  
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name;
  const fileExtension = filename.split('.').pop();
  
  // Generate unique filename
  const uniqueFilename = `${uuidv4()}.${fileExtension}`;
  
  // Create the full path in S3
  const key = `${FOLDER_PATH}${uniqueFilename}`;
  
  // Upload to S3
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: file.type
  });
  
  await s3Client.send(command);
  
  // Return the URL to the uploaded file
  return `https://${BUCKET_NAME}.s3.${REGION || 'us-east-1'}.amazonaws.com/${key}`;
}

export async function POST(request: Request) {
  try {
    // Check if S3 is configured
    if (!s3Client) {
      console.error('AWS credentials not configured');
      return NextResponse.json(
        { error: 'Server is not configured for file uploads' },
        { status: 500 }
      );
    }

    if (!BUCKET_NAME) {
      console.error('AWS_BUCKET_NAME not configured');
      return NextResponse.json(
        { error: 'Upload destination not configured' },
        { status: 500 }
      );
    }

    // Get the form data
    const formData = await request.formData();
    
    // Handle single file upload
    if (formData.has('file')) {
      const file = formData.get('file') as File;
      
      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }
      
      const fileUrl = await uploadToS3(file);
      return NextResponse.json({ url: fileUrl });
    }
    
    // Handle multiple file upload
    else if (formData.has('files')) {
      const files = formData.getAll('files') as File[];
      
      if (!files || files.length === 0) {
        return NextResponse.json({ error: 'No files provided' }, { status: 400 });
      }
      
      // Upload all files
      const uploadPromises = files.map(file => uploadToS3(file));
      const fileUrls = await Promise.all(uploadPromises);
      
      return NextResponse.json({ urls: fileUrls });
    }
    
    return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    
  } catch (error: any) {
    console.error('Failed to upload to S3:', error);
    
    return NextResponse.json(
      { error: 'File upload failed: ' + error.message },
      { status: 500 }
    );
  }
}

// Route segment config for Next.js 13+ App Router
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
// For handling large file uploads
export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const bodyParser = {
  sizeLimit: '10mb'
};