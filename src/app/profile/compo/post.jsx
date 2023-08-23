'use client'
import React from 'react';
import Image from 'next/image';
const Post = ({ post }) => {
  return (
    <div className="relative">
    
      
              <Image
        src={post.image} // Path to the image in the public folder
        alt="Placeholder Image"
        width={300}
        height={200}
        className="h-[300px] w-[400px] rounded-md shadow-gray-500 shadow-md"
      />
               
               
    </div>
  );
};

export default Post;
