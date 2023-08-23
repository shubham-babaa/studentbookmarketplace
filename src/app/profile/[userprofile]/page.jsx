'use client'
import React,{useEffect,useState} from 'react'

import { useRouter } from 'next/router';
import Profile from '../compo/profile';
export default function page() {
  const queryParams = new URLSearchParams(window.location.search);
  const keyword = queryParams.get('keyword');
useEffect(()=>{
console.log(keyword)
},[keyword])
  return (
    <div>
      <Profile studentId={keyword}/>
    </div>
  )
}
