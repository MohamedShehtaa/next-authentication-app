import React from 'react';

function UserProfile({ params }: { params: { id: string } }) {
  console.log(params);
  return <div>UserProfile of {params.id}</div>;
}

export default UserProfile;
