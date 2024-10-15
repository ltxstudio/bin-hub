import React from 'react';

interface PostProps {
  post: {
    title: string;
    content: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="p-4 border rounded my-2">
      <h3 className="text-lg font-bold">{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
