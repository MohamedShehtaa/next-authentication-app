import { NextRequest, NextResponse } from 'next/server';

// this file will executed when we send request or get the response form the server
// we can specify the execution of this file with options (Ex => when user login for example)
// like interceptor modify the request or the response

// should be like this
export function middleware(request: NextRequest) {
  // specify the path to run it to specific route
  const path = request.nextUrl.pathname;
  const isPublicPage = path === '/login' || path === '/register';
  const token = request.cookies.get('token')?.value || '';
  // => scenario's

  // A) if the path is public and the token is present , redirect to home page
  if (isPublicPage && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // B) if the path is private and the no token  , redirect to login page
  if (!isPublicPage && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // else  continue
  return NextResponse.next();
}

// the previous will work correctly but the styles and assets does not work because we need to match the other  paths

export const config = {
  matcher: ['/', '/profile/:path*', '/login', '/register'],
};
