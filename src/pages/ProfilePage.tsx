import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import Profile from '../components/Profile';

interface ProfilePageProps {
  user: {
    uid: string;
    name: string;
    bio: string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `profile_pictures/${user.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setImageUrl(url);
  };

  return (
    <div className="p-4">
      <Profile user={user} />
      <div className="mt-4">
        <input type="file" onChange={handleImageUpload} />
        {imageUrl && <img src={imageUrl} alt="Profile" className="mt-4 rounded-full w-32 h-32" />}
      </div>
    </div>
  );
};

export default ProfilePage;
