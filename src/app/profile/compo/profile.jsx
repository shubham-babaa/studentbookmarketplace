'use client'
import React, { useState, useContext, useEffect } from 'react';
import Post from './post'; // Create a Post component
import Image from 'next/image';
import Link from 'next/link';
import { MyContext } from '../../components/mycontext'
const Profile = ({studentId }) => {
  const [newUsername, setNewUsername] = useState('');
  const { contextData, updateContextVariable } = useContext(MyContext);
  const [newProfilePhoto, setNewProfilePhoto] = useState('');
    const [reload,setReload]=useState(true)

  useEffect(() => {
  
console.log(studentId)
    const fetchDataAndUpdateContext = async () => {
      await fetchProductsAndUpdateContext((studentId !== undefined) ? studentId : contextData.studentId, updateContextVariable);
      await fetchProductsAndUpdateContext2(studentId, updateContextVariable);
    setReload(true)
    };
   
    fetchDataAndUpdateContext();
  }, [studentId,contextData.studentId,reload]);

 


  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleProfilePhotoChange =async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const base64 = await convert_to(file);
        console.log(base64)
        setNewProfilePhoto(base64)
       
      }
    } catch (error) {
      console.error('Error handling file:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
 
    const studentId=contextData.studentId
    const name=contextData.userName
   const data={newUsername,newProfilePhoto,studentId,name}

    try {
      const response = await fetch( `/api/profile` , {
        // next:{revalidate:10},
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json(); 
        console.log(responseData[0].studentId);
       
     
      }
    } catch (error) {
      // Handle other errors
      console.error('Error:', error);
      // You can display an error message to the user
    }
    setNewProfilePhoto('')
    setNewUsername('')
    // onUpdate({ newUsername, newProfilePhoto });
  };

  return (
    <div className="flex  p-4 justify-center mx-auto  ">
      <div className="mb-4">
        <div className="mb-1 bg-gray-100 w-auto h-auto py-10 ">
          <Link href="/profile">
            <div className="text-black relative flex justify-start items-center text-[20px]  gap-1 px-10 ">
              <Image
src={ studentId?contextData.profileXUserIdentitydata[0]?.image:contextData.profileUserIdentitydata[0]?.image || ''}// Path to the image in the public folder
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
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={newUsername}
              onChange={handleUsernameChange}
              className="w-full p-2 border rounded"
              placeholder="New Username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profilePhoto" className="block font-semibold mb-1">
              Profile Photo
            </label>
            <input
  type="file"
  id="profilePhoto"
  accept="image/*"
  onChange={(e) => handleProfilePhotoChange(e)}
  className="w-full p-2 border rounded"
/>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Save Changes
          </button>
        </form>
        <div className="grid grid-cols-3 gap-10 mt-16">
          { contextData.profileUserpostdata.map((pot) => (
            <Post key={pot._id} post={pot} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Profile;
function convert_to(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
async function fetchProductsAndUpdateContext(studentId, updateContextVariable) {
  try {
    const response = await fetch(`/api/getProductsByStudentId?studentId=${studentId}`, {
      method: 'GET',
    });

    if (response.ok) {
      const products = await response.json();
      updateContextVariable('profileUserpostdata', products);
    } else {
      console.error('Failed to retrieve products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
async function fetchProductsAndUpdateContext2(studentId, updateContextVariable) {
  try {
    const response = await fetch(`/api/profile?studentId=${studentId}`, {
      method: 'GET',
       next: { revalidate: 0 } ,
    });

    if (response.ok) {
      const products = await response.json();
     
      updateContextVariable('profileXUserIdentitydata', products);
    } else {
      console.error('Failed to retrieve products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
