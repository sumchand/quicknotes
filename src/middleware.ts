// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    // ✅ If non-admin tries to access /admin
    if (req.nextUrl.pathname.startsWith('/admin') && payload.role !== 'Admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Allow access
    return NextResponse.next();
  } catch (error) {
    console.error('[JWT VERIFY ERROR]', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/notes/:path*'], // secure routes
};
