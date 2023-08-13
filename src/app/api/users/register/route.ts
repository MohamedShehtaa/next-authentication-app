import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    console.log(reqBody); // => { username: 'm.shehta', email: 'test@test.com', password: '123456789' }
    return NextResponse.json({ message: 'user registered successfully ' });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// here one method for every crud operations methods  for ex => POST , GET < DELETE < UPDATE
