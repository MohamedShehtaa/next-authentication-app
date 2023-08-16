import axios from 'axios';

export async function getUser() {
  try {
    // here we need to write the full url cuze is running in the server side
    const response = await axios.get('http://localhost:3000/api/users/me');
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export default async function Home() {
  const user = getUser();
  return <div>home</div>;
}
