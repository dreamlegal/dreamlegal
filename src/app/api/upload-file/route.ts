import { UploadImage, UploadResponse } from "@/actions/UploadAction";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file) {
    return Response.json({ error: "No files received." }, { status: 400 });
  }
  const foldername = formData.get("folderName") || "folders";
  const NewFormData = new FormData();
  NewFormData.append("file", file);
  NewFormData.append("folderName", foldername! as string);
  const res = await UploadImage(formData);
  const location = (res as UploadResponse).location;
  return Response.json(
    {
      msg: "Uploaded file",
      success: true,
      location,
    },
    {
      status: 201,
    }
  );
}
