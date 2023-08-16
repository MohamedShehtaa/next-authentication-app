// logout icon in the client component so we have not access the cookies form the client component

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: 'logout successful',
      success: true,
      data: null,
    });

    response.cookies.set('token', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0),
    });
    return response;
  } catch (e: any) {
    NextResponse.json({ message: e.message }, { status: 500 });
  }
}
