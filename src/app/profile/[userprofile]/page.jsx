'use client'
import React,{useEffect,useState} from 'react'

import { useRouter } from 'next/router';
import Profile from '../compo/profile';
export default function page() {
  const [shouldReload, setShouldReload] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const keyword = queryParams.get('keyword');
useEffect(()=>{

  if (!shouldReload) {
    setShouldReload(true);
  }
console.log(keyword)
},[keyword])
  return (
    <div className='w-full px-44'>
      <Profile studentId={keyword}/>
    </div>
  )
}
