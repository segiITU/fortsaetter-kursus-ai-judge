import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    
    const validCode = process.env.ACCESS_CODE || 'aof';
    
    const isValid = code?.toLowerCase() === validCode.toLowerCase();
    
    return NextResponse.json({ valid: isValid });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}