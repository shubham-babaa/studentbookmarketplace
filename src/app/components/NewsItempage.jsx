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
  //
  useEffect(() => {
  
    console.log(contextData.studentId)
    fetchProductsAndUpdateContext2(contextData.studentId, updateContextVariable);
    console.log(contextData.profileUserIdentitydata)
  }, []);

  const newsItem = {
    // id: id,
    title: 'Breaking News',
    content: 'Lorem ipsum dolor sit amet... Lorem ipsum dolor sit amet... Lorem ipsum dolor sit amet... Lorem ipsum dolor sit amet... Lorem ipsum dolor sit amet...',
  };

  return (

      <div className="container mx-auto py-8 w-[30vw] fixed min-h-screen">
          <div className="mb-1 bg-gray-100 w-auto h-auto py-10 ">
          <Link href="/profile">
            <div className="text-black relative flex justify-start items-center text-[20px]  gap-1 px-10 ">
              <Image
                 src={contextData.profileUserIdentitydata[0]?.image || ''}// Path to the image in the public folder
                alt="Placeholder Image"
                width={300}
                height={200}
                className="w-28 h-28 rounded-full shadow-gray-500 shadow-md"
              />
               <span className="ml-10 ">{contextData.profileUserIdentitydata[0]?.userName || ''}</span> <br />
              <span className="ml-10 ">{contextData.userName}</span>
            </div>
          </Link>
          <button></button>

        </div>
        <div >
        <h1 className="text-2xl font-semibold mb-4">{newsItem.title}</h1>
        <p>{newsItem.content}</p>
        </div>


        <footer className="bg-gray-200 py-4 mt-44">
      <div className="container mx-auto flex items-center justify-center">
        <ul className="flex space-x-6">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <li>
            <a href="#">Press</a>
          </li>
          <li>
            <a href="#">API</a>
          </li>
          <li>
            <a href="#">Jobs</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Locations</a>
          </li>
        </ul>
      </div>
      <div className="container mx-auto text-center mt-4">
        <span>Language:</span>
        <select className="ml-2">
          <option>English (UK)</option>
        </select>
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