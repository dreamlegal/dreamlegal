// app/api/questions/[id]/route.js
import { NextResponse } from 'next/server';


import prisma from "@/lib/prisma";

// GET - Fetch single question by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const question = await prisma.question.findUnique({
      where: { id }
    });

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    return NextResponse.json(
      { error: 'Failed to fetch question' },
      { status: 500 }
    );
  }
}

// PUT - Update specific question
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { answer } = body;

    if (!answer) {
      return NextResponse.json(
        { error: 'Answer is required' },
        { status: 400 }
      );
    }

    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: { 
        answer,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

// DELETE - Delete question (optional admin feature)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.question.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}