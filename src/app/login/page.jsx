'use client'

import React, { useState,useContext } from 'react';
import { MyContext } from "../components/mycontext"
const page = () => {
  const { updateContextVariable } = useContext(MyContext);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password, name };

    try {
      const response = await fetch(isLogin ? `/api/login` : '/api/auth', {
        // next:{revalidate:10},
        method:'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(userData),
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse response JSON
        console.log(responseData[0].studentId);
        updateContextVariable('studentId',responseData[0].studentId)
        updateContextVariable('userName',responseData[0].name)
        // window.location.href = '/';
      }
    } catch (error) {
      // Handle other errors
      console.error('Error:', error);
      // You can display an error message to the user
    }
    setEmail('');
    setPassword('');
    setName('');
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 w-full">
      <form className="w-64 p-4 bg-gray-100 rounded shadow" onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p className="mt-2 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? ' Sign up' : ' Log in'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default page;
