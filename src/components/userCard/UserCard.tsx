'use client';
import React from 'react';

function UserCard({ user }: any) {
  return (
    <div onClick={() => console.log(user.id)}>
      <h1>{user.title}</h1>
      <p>{user.body}</p>
    </div>
  );
}

export default UserCard;
