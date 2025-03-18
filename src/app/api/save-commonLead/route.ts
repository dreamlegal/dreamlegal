import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, organization, designation, message } = await request.json();

    if (!email || !organization || !designation || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newLead = await prisma.commonLead.create({
      data: { email, organization, designation, message },
    });

    return NextResponse.json({ message: 'Lead submitted successfully', data: newLead }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
