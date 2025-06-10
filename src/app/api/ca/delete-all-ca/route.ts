// app/api/delete-all/route.js
// import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

import prisma from "@/lib/prisma";


export async function DELETE() {
  try {
    // Delete AnalyzedArticle first (child records)
    await prisma.analyzedArticle.deleteMany({});
    
    // Delete CompanyAnalysis (parent records)
    await prisma.companyAnalysis.deleteMany({});
    
    return NextResponse.json({ 
      success: true, 
      message: 'All records deleted' 
    });
    
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}