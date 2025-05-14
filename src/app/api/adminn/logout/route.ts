import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Clear the adminAuth cookie
    await cookies().delete('adminAuth');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during admin logout:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Logout failed' 
    }, { status: 500 });
  }
}