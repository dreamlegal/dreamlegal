// import { UploadImage, UploadResponse } from "@/actions/UploadAction";
// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
//   const formData = await request.formData();
//   const file = formData.get("file");
//   if (!file) {
//     return Response.json({ error: "No files received." }, { status: 400 });
//   }
//   const foldername = formData.get("folderName") || "folders";
//   const NewFormData = new FormData();
//   NewFormData.append("file", file);
//   NewFormData.append("folderName", foldername! as string);
//   const res = await UploadImage(formData);
//   const location = (res as UploadResponse).location;
//   return Response.json(
//     {
//       msg: "Uploaded file",
//       success: true,
//       location,
//     },
//     {
//       status: 201,
//     }
//   );
// }

import { UploadImage, UploadResponse } from "@/actions/UploadAction";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    
    if (!file || !(file instanceof File)) {
      return Response.json({ error: "No valid file received." }, { status: 400 });
    }

    const folderName = formData.get("folderName") as string || "folders";

    const newFormData = new FormData();
    newFormData.append("file", file);
    newFormData.append("folderName", folderName);

    const res = await UploadImage(newFormData);
    
    return Response.json(
      {
        msg: "File uploaded successfully",
        success: true,
        location: res.location,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error in file upload:", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "An unknown error occurred",
        success: false,
        details: error instanceof Error ? error.stack : undefined,
      },
      {
        status: 500,
      }
    );
  }
}
