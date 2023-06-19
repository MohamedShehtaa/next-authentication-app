import React from "react";

function UserProfile({ params }: any) {
  console.log(params);
  return <div>UserProfile of {params.id}</div>;
}

export default UserProfile;
