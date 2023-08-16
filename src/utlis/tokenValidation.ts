import { NextRequest } from 'next/server';

export const validateTokenAndGetUser = async (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    // here the token = '' cuze we request api in server in home page so there's no cookies in server only in the browser all we need to send token to server component
    console.log('token', token);
    return true;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
