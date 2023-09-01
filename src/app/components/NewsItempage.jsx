// import { useRouter } from 'next/router';
// import Layout from '../../components/Layout'; // You can create a Layout component to provide consistent styling
'use client'
import React,{useContext,useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import { MyContext } from "./mycontext";
const NewsItemPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
const{ contextData,updateContextVariable}=useContext(MyContext)
const storedToken = localStorage.getItem('token');

  useEffect(() => {
    
    fetchProductsAndUpdateContext2(storedToken, updateContextVariable);
    console.log(contextData.profileUserIdentitydata)
  }, []);

  const newsItem = {
    // id: id,
    title: 'Breaking News',
    content: 'Lorem ipsum dolor sit amet... Lorem ipsum dolor sit amet... Lorem ipsum dolor sit amet... Lorem ipsum dolor sit amet... Lorem ipsum dolor sit amet...',
  };

  return (

    <div className=" text-center xl:px-4  bg-white xl:py-8 sticky bottom-0 xl:sticky xl:top-0 xl:min-h-screen">
    <div className="mb-1  w-full  h-auto py-10 ">
      <Link href="/profile">
        <div className="text-black relative flex flex-col sm:flex-row justify-start items-center text-xl sm:text-2xl gap-1 sm:px-10">
          <Image
            src={contextData.profileUserIdentitydata[0]?.image || ''}
            alt="Placeholder Image"
            width={300}
            height={200}
            className="xl:w-28 xl:h-28  h-16 w-16 rounded-full shadow-gray-500 shadow-md sm:mr-6"
          />
          <span className="mt-2 sm:mt-0 text-blue-700 ">{contextData.profileUserIdentitydata[0]?.userName || ''}</span>
       
        </div>
      </Link>
    </div>
    <div className="my-4">
      <h1 className="text-2xl font-semibold mb-4">{newsItem.title}</h1>
      <p>{newsItem.content}</p>
    </div>
    <footer className="bg-gray-300 py-4 mt-8 w-full ">
      <div className=" text-center">
        <ul className="flex flex-wrap justify-center space-y-2 sm:space-y-0 sm:space-x-6">
          <li><a href="#">About</a></li>
   
          <li><a href="#">Press</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
       
        </ul>
        <div className="mt-4">
          <span>Language:</span>
          <select className="ml-2 px-2 py-1 rounded border">
            <option>English (UK)</option>
          </select>
        </div>
      </div>
    </footer>
  </div>
  
  )
};

export default NewsItemPage;


async function fetchProductsAndUpdateContext2(studentId, updateContextVariable) {
  try {
    const response = await fetch(`/api/profile?studentId=${studentId}`, {
      method: 'GET',
    });

    if (response.ok) {
      const products = await response.json();
      updateContextVariable('profileUserIdentitydata', products);
    } else {
      console.error('Failed to retrieve products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}