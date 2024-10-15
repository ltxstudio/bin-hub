import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Post from '../components/Post';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface PostType {
  title: string;
  content: string;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [newPost, setNewPost] = useState<PostType>({ title: '', content: '' });

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      setPosts(querySnapshot.docs.map(doc => doc.data() as PostType));
    };
    fetchPosts();
  }, []);

  const handleAddPost = async () => {
    await addDoc(collection(db, 'posts'), newPost);
    setPosts([...posts, newPost]);
    setNewPost({ title: '', content: '' });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Bin Hub</h1>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
      <div className="bg-white p-6 rounded shadow mt-6">
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="w-full p-2 mb-4 border-b border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <ReactQuill
          value={newPost.content}
          onChange={(content) => setNewPost({ ...newPost, content })}
          className="mb-4"
        />
        <button
          onClick={handleAddPost}
          className="w-full bg-blue-500 text-white py-2 rounded shadow hover:bg-blue-600 transition duration-200"
        >
          Add Post
        </button>
      </div>
    </div>
  );
};

export default HomePage;
