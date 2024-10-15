import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
};

export default Profile;
