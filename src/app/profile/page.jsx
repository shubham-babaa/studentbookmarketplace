'use client'
import Image from 'next/image';
import Link from 'next/link';
import React,{useContext} from 'react';
import Profile from './compo/profile';


const page = () => {
  return <div className=' mx-auto  md:px-44 w-full min-h-screen   '><Profile   /></div>;
};

export default page;
