// MyContext.js
'use client'
import React, { useState,createContext} from 'react';

// Create a context
const MyContext = createContext();

// Create a provider component
function MyContextProvider({ children }) {
  const [contextData, setContextData] = useState({
   studentId: "",
    bookId: "",
    userName:"",
    data:[],
    profileUserpostdata:[],
    profileUserIdentitydata:[],
    profileXUserIdentitydata:[],

  });
  const updateContextVariable = (variableName, value) => {
    setContextData(prevData => ({
      ...prevData,
      [variableName]: value,
    }));
  };
const data={
    contextData, 
    updateContextVariable,
    
}
  return (
    <MyContext.Provider value={data}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyContextProvider };
