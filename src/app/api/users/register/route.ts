import { connectDb } from '@/config/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/utlis/sendEmail';

connectDb();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    // check the user is exists
    const user = await User.findOne({ email: reqBody.email });
    if (user) throw new Error('User already exists');
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashedPassword;

    // create user
    const newUser = new User(reqBody);
    const newUserRes = await newUser.save();

    // send verification email
    await sendEmail({
      email: newUser.email,
      emailType: 'emailVerification',
      userId: newUserRes._id.toString(),
    });

    return NextResponse.json({ message: 'user registered successfully ', success: true });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
