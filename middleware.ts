import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jwt from 'jose'


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authPages = ['/login', '/register', '/forgot-password', 'reset-password'];
  const isAuthPage = authPages.some(page => path.startsWith(page))
  if (isAuthPage) {
    const accessToken = request.cookies.get('access_token')?.value || '';
    if (accessToken) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
        const decoded = await jwt.jwtVerify(accessToken, secret);
        if (decoded) {
          return NextResponse.redirect(new URL('/manage/dashboard?status=authenticated', request.url));
        }
      } catch(error) {
        if (error instanceof Error) {
          console.info('jwt[auth]: ' + error.message);
        } else {
          console.info('jwt[auth]:', error);
        }
      }
    }
  } else if (request.nextUrl.pathname.startsWith('/manage')) {
    const accessToken = request.cookies.get('access_token')?.value || '';
    if (accessToken) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
        const decoded = await jwt.jwtVerify(accessToken, secret);
        if (!decoded) {
          return NextResponse.redirect(new URL('/login?status=expired', request.url));
        }
      } catch(error) {
        if (error instanceof Error) {
          console.info('jwt[manage]: ' + error.message);
        } else {
          console.info('jwt[manage]:', error);
        }
        return NextResponse.redirect(new URL('/login?status=unauthenticated', request.url));
      }
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
}
