import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ Missing',
    MONGODB_DB: process.env.MONGODB_DB || '❌ Not Set',
    JWT_SECRET: process.env.JWT_SECRET ? '✅ Set' : '❌ Missing'
  });
}
