// i want to display welcome user if he logged in so we will use the token to get userId and get the user to display
import { NextRequest, NextResponse } from 'next/server';
import { validateTokenAndGetUser } from '@/utlis/tokenValidation';

export async function GET(request: NextRequest) {
  try {
    const userId = await validateTokenAndGetUser(request);
    const queryParams = new URL(request.nextUrl);
    // console.log(queryParams.searchParams.get('user'));
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
