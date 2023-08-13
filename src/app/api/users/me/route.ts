import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  try {
    const queryParams = new URL(request.nextUrl);
    console.log(queryParams.searchParams.get('user'));
    return NextResponse.json({
      message: 'users get request accessed successfully',
      data: {
        name: 'mohamed',
        email: 'test@test.com',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
