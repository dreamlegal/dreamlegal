
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
  const { token } = params;
  console.log('Received token on server:', token);

  if (typeof token !== 'string') {
    return NextResponse.json({ message: 'Invalid token format' }, { status: 400 });
  }

  // Find the password reset request using the token
  const resetRequest = await prisma.passwordReset.findUnique({
    where: { token: token },
  });

  console.log('Reset request found:', resetRequest);

  if (!resetRequest) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 404 });
  }

  // Check if the token has expired
  if (resetRequest.tokenExpiration < new Date()) {
    console.log('Token has expired:', resetRequest.tokenExpiration);
    return NextResponse.json({ message: 'Token has expired' }, { status: 400 });
  }

  return NextResponse.json({ message: 'Token is valid' }, { status: 200 });
}
