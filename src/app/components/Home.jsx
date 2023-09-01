'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState,useContext} from 'react'; // Import React, useEffect, and useState
import Navbar from './Navbar'
import NewsItempage from './NewsItempage'
import ProductDetails from './ProductDetails'
import { MyContext } from './mycontext';
export default  function Home() {
 const{  contextData, updateContextVariable}=useContext(MyContext);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/create-product', {
          method: 'GET',
        });
        
        if (response.ok) {
          const products = await response.json();
        updateContextVariable('data',products);
         
   
        } else {
          console.error('Failed to retrieve products');
         
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts(); 

  }, []); 





  return (
    <main className='lg:flex justify-between  block  ' >
     
       <div className="bg-gray-100 min-h-screen   ">
      <header className="bg-blue-500 text-white text-center py-16">
        <h1 className="text-3xl font-semibold">Welcome to Student Book Marketplace</h1>
        <p>Buy and sell your old books directly with other students</p>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-200 rounded-lg p-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Find the Books You Need</h2>
            <p className="text-gray-700">Explore our listings to find the perfect books for your studies.</p>
           
          </div>
          <div className="md:w-1/2 text-center">
            <img src="/kl.jpg" alt="Books Illustration" className="max-w-full h-auto" />
          </div>
        </div>
        <div>
        {contextData.data.map((item) => (
        <ProductDetails key={item.name}  product={item} />
      ))}

        
        </div>
      </div>
     
    </div>
<div className=''>
<NewsItempage/>
</div>



</main >

);
}
