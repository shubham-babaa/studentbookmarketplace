'use client'
import React, { useState } from "react";

const VerificationMessage = (props) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleInputChange = (event) => {
    setVerificationCode(event.target.value);
  };

 
  async function handleSubmit(event) {
    event.preventDefault();
    const {email}=props.data;
 
    const data = {verificationCode:verificationCode,email:email };
    console.log(data);
    
    
      try {
        const response = await fetch('/api/verifyuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then((response) => response.json())
          .then((data) => {
            const token = data.token;
            console.log(token);
            if (token) {
              localStorage.setItem('token', token);
              window.location.href = '/';
            }
          });
      } catch (err) {
        console.error('Error in signup ', err);
        // Handle error, e.g., display an error message
      }
  }

  return (
    <div className=" flex items-center justify-center md:py-44 bg-gray-100">
      <div className="bg-white px-2 py-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-3xl font-semibold mb-6">Verification Email Sent</h2>
        <p className="text-gray-700">
          A verification code has been sent to your email address. Please check your inbox and follow the link to verify your account.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={verificationCode}
            onChange={handleInputChange}
            placeholder="Enter Verification Code"
            className="border border-gray-400 rounded px-3 py-2 mt-4 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationMessage;
