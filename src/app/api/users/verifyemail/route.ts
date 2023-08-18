import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import Token from '@/models/tokenModel';
import { connectDb } from '@/config/dbConfig';

connectDb();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const token = reqBody.token;
    const tokenObj: any = await Token.findOne({ token });
    const userId = tokenObj.userId;

    await User.updateOne({ _id: userId }, { isEmailVerified: true });

    return NextResponse.json({ message: 'email verified successfully ', data: null });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
