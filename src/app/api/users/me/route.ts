// i want to display welcome user if he logged in so we will use the token to get userId and get the user to display
import { NextRequest, NextResponse } from 'next/server';
import { validateTokenAndGetUser } from '@/utlis/tokenValidation';
import User from '@/models/userModel';
import { connectDb } from '@/config/dbConfig';

connectDb();

export async function GET(request: NextRequest) {
  try {
    const userId = await validateTokenAndGetUser(request);
    const user = await User.findOne({ _id: userId }).select('-password');
    return NextResponse.json({
      message: 'get user successfully',
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
