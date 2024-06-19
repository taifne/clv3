import Link from 'next/link';
import React from 'react';

interface PostProps {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const PostCard: React.FC<PostProps> = ({ id, title, content, createdAt }) => {
  return (
    <Link href={`/rest-api/posts/${id}`} passHref>
      <div className="bg-white rounded shadow-md p-6 mb-4 cursor-pointer hover:bg-gray-100">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{content}</p>
        <p className="text-gray-500">Created at: {new Date(createdAt).toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default PostCard;
