'use client'
import Image from 'next/image';
import Link from 'next/link';
import React,{useEffect,useContext} from 'react';
import { MyContext } from './mycontext';

const ProductDetail = ({product}) => {
  const { contextData, updateContextVariable } = useContext(MyContext);
 
return (
    <div className=" mx-auto py-8  mb-5 mt-10 rounded-md xl:w-[500px] w-auto h-[600px]">
      <div className="">
     
          <div className='justify-center flex border-2 border-gray-600 w-auto rounded-xl'>
  <div className='bg-slate-500 bg-opacity-50  h-full w-full rounded-sm text-center '>
    <Image
      src={product.image}// Path to the image in the public folder
      alt="Placeholder Image"
      width={300}
      height={600}
      className="h-[300px] w-[300px] shadow-gray-200 mx-auto my-5 rounded-md shadow-md"
    />
    <h1 className="text-2xl font-semibold text-sky-600 mb-4">{product.title}</h1>
    <p className="text-cyan-700 mb-2">{product.description}</p>
    <p className="text-cyan-700 mb-2">Author: {product.author}</p>
    <p className="text-cyan-700  mb-2">Price: ${product.price}</p>
    <p className="text-cyan-700  mb-2">Subject: {product.subject}</p>
    <p className="text-cyan-700  mb-2">Condition: {product.condition}</p>
    <p className="text-cyan-700 mb-2">Class of Book: {product.classOfBook}</p>
    {/* <p className="text-gray-500 mb-4">Section: {product.section}</p> */}
   
    <div className=" shadow-xl bg-pink-800 rounded-b-xl">
            <Link href={{ pathname: `/profile/${product.sellerId}`, query: { keyword:product.sellerId  } }}>
              <div className="text-black relative flex justify-start items-center text-[20px]  gap-1">
              <Image
        src={product.sellerInfo.image}
        alt="Placeholder Image"
        width={300}
        height={200}
        className="w-10 h-10 rounded-full shadow-gray-500 shadow-md"
      />
                <span className="text-blue-800 text-bold  ">@{product.sellerInfo.userName}</span></div>
            </Link>
          </div>
  </div>
  
</div>
      </div>
    </div>
  );
};

export default ProductDetail;
