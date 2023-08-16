import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const validateTokenAndGetUser = async (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    // here the token = '' cuze we request api in server in home page so there's no cookies in server only in the browser all we need to send token to server component
    // console.log(token);
    // after i send cookies to server as a cookie in the header i got the token
    const decodeToken: any = jwt.verify(token, process.env.jwt_secret!);
    return decodeToken._id;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
