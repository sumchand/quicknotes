// src/app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  cookies().set('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/'
  });

  return NextResponse.json({ success: true, message: 'Logged out' });
}
