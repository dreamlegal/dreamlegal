// "use server";
// import { s3Client } from "nodejs-s3-typescript";

// // Define the interface for the upload response
// export interface UploadResponse {
//   bucket: string;
//   key: string;
//   location: string;
//   status: number;
// }

// // S3 Config
// const s3Config = {
//   bucketName: process.env.AWS_BUCKET_NAME as string,
//   region: process.env.AWS_REGION as string,
//   accessKeyId: process.env.AWS_ACCESS_ID as string,
//   secretAccessKey: process.env.AWS_SECRET_ID as string,
// };

// export const UploadImage = async (
//   formData: FormData
// ): Promise<UploadResponse | string> => {
//   "use server";
//   try {
//     const file = formData.get("file") as File;
//     const folderName = formData.get("folderName") as string;
//     const s3 = new s3Client({
//       ...s3Config,
//       dirName: folderName,
//     });
//     const res = await s3.uploadFile(Buffer.from(await file.arrayBuffer()));
//     return res as UploadResponse;
//   } catch (e) {
//     return "Image Upload failed";
//   }
// };

"use server";
import { s3Client } from "nodejs-s3-typescript";

// Define the interface for the upload response
export interface UploadResponse {
  bucket: string;
  key: string;
  location: string;
  status: number;
}

// S3 Config
const s3Config = {
  bucketName: process.env.AWS_BUCKET_NAME,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_ID,
};

// Validate S3 configuration
const validateS3Config = () => {
  const missingKeys = Object.entries(s3Config)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingKeys.length > 0) {
    throw new Error(`Missing S3 configuration: ${missingKeys.join(', ')}`);
  }
};

export const UploadImage = async (
  formData: FormData
): Promise<UploadResponse> => {
  try {
    validateS3Config();

    const file = formData.get("file");
    if (!(file instanceof File)) {
      throw new Error("Invalid file in form data");
    }

    const folderName = formData.get("folderName");
    if (typeof folderName !== "string") {
      throw new Error("Invalid folderName in form data");
    }

    const s3 = new s3Client({
      ...s3Config as Required<typeof s3Config>,
      dirName: folderName,
    });

    const buffer = Buffer.from(await file.arrayBuffer());
    const res = await s3.uploadFile(buffer);

    if (!isUploadResponse(res)) {
      throw new Error("Invalid response from S3 upload");
    }

    return res;
  } catch (error) {
    console.error("Error in UploadImage:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Type guard for UploadResponse
function isUploadResponse(obj: any): obj is UploadResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.bucket === "string" &&
    typeof obj.key === "string" &&
    typeof obj.location === "string" &&
    typeof obj.status === "number"
  );
}
