import { connectDb } from '@/config/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { cookies } from 'next/dist/client/components/headers';

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

    // set token to cookies

    /**
     * A) => way 1
     * 
   *     cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), //30days
    });
   */

    // B) => way 2  best
    // will not send token in response and will set it to cookies
    //  any request form the client the cookies will attached automatically
    const response = NextResponse.json({
      message: 'login successful',
      success: true,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), //30days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
