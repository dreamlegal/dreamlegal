// app/api/questions/route.js
import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

import prisma from "@/lib/prisma";
// const prisma = new PrismaClient();

// GET - Fetch all questions
export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

// POST - Create new question
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, description, question, purpose } = body;

    // Validate required fields
    if (!name || !email || !description || !question || !purpose) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const newQuestion = await prisma.question.create({
      data: {
        name,
        email,
        description,
        question,
        purpose
      }
    });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
}

// PUT - Update question (for admin to add answer)
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, answer } = body;

    if (!id || !answer) {
      return NextResponse.json(
        { error: 'Question ID and answer are required' },
        { status: 400 }
      );
    }

    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: { answer }
    });

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 }
    );
  }
}