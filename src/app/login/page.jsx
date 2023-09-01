'use client'

import React, { useState,useContext ,useEffect} from 'react';
import { MyContext } from "../components/mycontext"
import VerificationMessage from '../components/VerificationMessage'
import Cookies from 'js-cookie';
const page = () => {
  const { updateContextVariable } = useContext(MyContext);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [data,setData]=useState({});
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const userData = { email, password, name };

  //   try {
  //     const response = await fetch(isLogin ? `/api/login` : '/api/auth', {
  //       // next:{revalidate:10},
  //       method:'Post',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body:JSON.stringify(userData),
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json(); // Parse response JSON
  //       console.log(responseData[0].studentId);
  //       updateContextVariable('studentId',responseData[0].studentId)
  //       updateContextVariable('userName',responseData[0].name)
    
  //     }
  //   } catch (error) {
  //     // Handle other errors
  //     console.error('Error:', error);
  //     // You can display an error message to the user
  //   }
  //   setEmail('');
  //   setPassword('');
  //   setName('');
  // };




 






 


  async function handleSubmit(event) {
    event.preventDefault();
    const data = { name: name, email: email, password: password };
    setData(data);
    setIsSignedUp(true);
console.log("k")
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data saved successfully');
        const responseData = await response.json();
  
        updateContextVariable('studentId',responseData[0].studentId)
        updateContextVariable('userName',responseData[0].name)
            window.location.href = '/';
      } else {
        console.error('Error saving data');
        // Handle error, e.g., display an error message
      }
    } catch (err) {
      console.error('Error saving data', err);
      // Handle error, e.g., display an error message
    }
  }

  async function handleSubmite(event) {
    event.preventDefault();
    const data = { name: name, email: email, password: password };
    

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => response.json())
        .then((data) => {
          console.log(data);
          updateContextVariable('studentId',data.studentId)
          updateContextVariable('userName',data.name)
          const token = data.token;
          console.log(token);
          if (token) {
            Cookies.set('token', token, { expires: 365 });
            localStorage.setItem('token', data.studentId);

            window.location.href = '/';
          }
        });
    } catch (err) {
      console.error('Error logging data data', err);
      // Handle error, e.g., display an error message
    }
  }

  useEffect(() => {
    if (isSignedUp) {
 
    }
  }, [isSignedUp]);

  return (
    
    <div className="h-full  md:flex md:items-center  md:justify-center w-full xl:mx-[10vw] md:my-10 md:py-28 lg:mx-[5vw] ">
      <div className="bg-white md:p-8 px-2 py-8 rounded shadow-md  px-auto w-auto h-full">
        {isSignedUp ? (
          <VerificationMessage data={data} />
        ) : (
          <>
            <h2 className="text-3xl font-semibold mb-6">Sign {isSignUp ? "Up" : "In"}</h2>
            <form onSubmit={isSignUp ? handleSubmit : handleSubmite}>
              {isSignUp && (
                <div className="mb-4">
                
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>
            <p className="text-gray-600 mt-4 text-center">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                className="text-blue-500 font-semibold"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default page;