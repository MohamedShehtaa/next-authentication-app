import { connectDb } from '@/config/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDb();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    // check if user exists
    const user = await User.findOne({ email: reqBody.email });
    if (!user) throw new Error('User does not exists');

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(reqBody.password, user.password);
    if (!isPasswordCorrect) throw new Error('Invalid Credentials');

    // return the token
    const dataToEncrypt = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
    };

    const token = jwt.sign(dataToEncrypt, process.env.jwt_secret!, { expiresIn: '1d' });

    return NextResponse.json({
      message: 'login successful',
      success: true,
      data: token,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
