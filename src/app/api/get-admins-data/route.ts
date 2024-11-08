import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const admins = await prisma.PasswordReset.findMany();
    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json({ error: "An error occurred while fetching admins." }, { status: 500 });
  }
}
