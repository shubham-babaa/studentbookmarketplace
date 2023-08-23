'use client'
import Image from 'next/image';
import Link from 'next/link';
import React,{useContext} from 'react';
import Profile from './compo/profile';

const user = {
  username: 'userame',
  profileImage: '/i1.jpeg',
};

const posts = [
  { id: 1, imageUrl: '/i1.jpeg' },
  { id: 2, imageUrl: '/i1.jpeg' },
  { id: 3, imageUrl: '/i1.jpeg' },
  // ... other posts
];


const page = () => {
  return <Profile user={user} posts={posts} />;
};

export default page;
