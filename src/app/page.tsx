import UserCard from '@/components/userCard/UserCard';

const getData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return await res.json();
};

export default async function Home() {
  const data = await getData();
  return (
    <div>
      {data.map((user: any) => (
        <UserCard
          user={user}
          key={user.id}
        />
      ))}
    </div>
  );
}
