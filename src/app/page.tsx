import axios from 'axios';
import { cookies } from 'next/dist/client/components/headers';

export async function getUser() {
  try {
    // here we need to write the full url cuze is running in the server side and pass the cookies in the request
    const response = await axios.get(`${process.env.domain!}/api/users/me`, {
      headers: {
        cookie: `token=${cookies().get('token')?.value}`,
      },
    });
    return response.data.data;
  } catch (e) {
    console.log(e);
  }
}

export default async function Home() {
  const user: any = await getUser();
  return <>{user && <div>hello {user.userName}</div>}</>;
}
