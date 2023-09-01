'use client'
import React, { useState, useContext, useEffect } from 'react';
import Post from './post'; // Create a Post component
import Image from 'next/image';
import Link from 'next/link';
import { MyContext } from '../../components/mycontext'
const Profile = ({ studentId }) => {
  const [newUsername, setNewUsername] = useState('');
  const { contextData, updateContextVariable } = useContext(MyContext);
  const [newProfilePhoto, setNewProfilePhoto] = useState('');
  const [reload, setReload] = useState(true)
  const[post,setPost]=useState(true);
  const [data,setData]=useState([]);
  const[update,setUpdate]=useState(false)
  const storedToken = localStorage.getItem('token');
  useEffect(() => {
 
    fetchProductsAndUpdateContext3(storedToken, updateContextVariable);
  
  }, []);
  useEffect(() => {

    console.log(studentId)
    const fetchDataAndUpdateContext = async () => {
      await fetchProductsAndUpdateContext((studentId !== undefined) ? studentId :storedToken, updateContextVariable);
      await fetchProductsAndUpdateContext2(studentId, updateContextVariable);
      const userdata=(studentId !== undefined) ? contextData.profileXUserIdentitydata : contextData.profileUserpostdata;
      console.log(userdata,contextData.profileXUserIdentitydata)
    
      setReload(true)
      setData(userdata)
      
      console.log(contextData.profileXUserIdentitydata)
    };

    fetchDataAndUpdateContext();
  }, [studentId, contextData.studentId, reload]);




  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleProfilePhotoChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const base64 = await convert_to(file);
      
        setNewProfilePhoto(base64)

      }
    } catch (error) {
      console.error('Error handling file:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const studentId = contextData.profileUserIdentitydata[0].studentId
    const name = contextData.profileUserIdentitydata[0].userName
    console.log(studentId,name)
    const data = { newUsername, newProfilePhoto, studentId, name }

    try {
      const response = await fetch(`/api/profile`, {
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
    <div className="  mx-auto flex md:mt-10 w-full  ">
      <div className="mb-4 w-full "> 
        <div className="text-center  md:p-4  bg-white border-gray-300 rounded-md shadow-md h-auto  xl:w-[100%] mb-16  md:mx-auto md:w-full w-[400px]">

          <div className="text-black    text-xl px-4 items-center md:flex w-full">
            <Image
              src={studentId ? contextData.profileXUserIdentitydata[0] ?.image : contextData.profileUserIdentitydata[0]?.image || '/kl.jpg'}
              alt="Placeholder Image"
              width={300}
              height={200}
              className="w-28 h-28 rounded-full shadow-gray-500 shadow-md"
            />
            <div>
            <div className="md:ml-10 mb-2 font-semibold text-violet-800 border-b-2 border-gray-600"><span className='text-gray-900 hidden md:block'>USERNAME:</span>{studentId ?contextData.profileXUserIdentitydata[0]?.userName :(contextData.profileUserIdentitydata[0]?.userName|| 'sdfg')}</div> 
            <div className="md:ml-10  mb-2 font-semibold text-violet-800 border-b-2 border-gray-600"><span className='text-gray-900 hidden md:block'>ACCOUNT_HOLDER:</span>{studentId ?contextData.profileXUserIdentitydata[0]?.name :(contextData.profileUserIdentitydata[0]?.name || 'sdfg')}</div>
            </div>
          </div>
      <div className='flex items-center justify-between md:justify-center '>
          <div className=''>
            {studentId==undefined && <button className="md:ml-10  mt-3 text-blue-900 font-semibold px-1 py-2 rounded-md" onClick={()=>{setUpdate(true),setPost(false)}}>update_profile</button>}
            </div>
            <div className=''>
              <button className="md:ml-10  mt-3 text-blue-900 font-semibold px-1 py-2 rounded-md" onClick={()=>{setPost(true),setUpdate(false)}}>post</button>
            </div>
            </div>  
        </div>
        {update&&(
     <form onSubmit={handleSubmit} className="p-4 auto bg-white rounded shadow">
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
    )}
{post && (<div className="flex justify-center flex-row-3 gap-10 mt-16 ">
          {contextData.profileUserpostdata.map((pot) => (
            <Post key={pot._id} post={pot} />
          ))}
        </div>)}
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
async function fetchProductsAndUpdateContext(studentId,updateContextVariable) {
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
      next: { revalidate: 0 },
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

async function fetchProductsAndUpdateContext3(studentId, updateContextVariable) {
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