import { connectDb } from '@/config/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

connectDb();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    // const users = await User.find({});
    // console.log(users);
    // console.log(db);

    return NextResponse.json({ message: 'user registered successfully ' });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
