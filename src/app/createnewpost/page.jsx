'use client'
import { useState,useContext,useEffect} from 'react';
import{MyContext} from "../components/mycontext"
const page = () => {
  const{ contextData,updateContextVariable}=useContext(MyContext)
  const[post,setPost]=useState('');
  const[img,setImg]=useState('');
 const[storedToken,setStoredToken]=useState('')

  useEffect(()=>{
    const token = localStorage.getItem('token');
 setStoredToken(token);
  },[storedToken])
  const [formData, setFormData] = useState({
   
    title: '',
    author: '',
    subject: '',
    price: '',
    condition: '',
    sellerId:'',
    image: '',
  
    classOfBook: '',
  });

  const emptyFormData = {
  
    title: '',
    author: '',
    subject: '',
    price: '',
    condition: '',
  
    image: '',
 
    classOfBook: '',
  };
  const handleClassOfBookChange = (e) => {
    const newFormData = {
      ...formData,
      classOfBook: e.target.value,
    };
    setFormData(newFormData);

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };
  const handlefile = async (e) => {
    try {
      const file = e.target.files[0];
      
      if (file) {
        const base64 = await convert_to(file);
   
        setPost(base64)
      
      }
    } catch (error) {
      console.error('Error handling file:', error);
    }
  };
  
  const handleSubmit =async (e) => {
    e.preventDefault();
  
  
   const daa={title: formData.title,
   author: formData.author,
   subject: formData.subject,
   price: formData.price,
   condition: formData.condition,
   sellerId:storedToken,
   image: post,
 
   classOfBook: formData.classOfBook,}
    try {
        const response = await fetch('/api/create-product', {
          method: 'POST',
        
          body: JSON.stringify(daa),
        });
  
        if (response.ok) {
          alert('Product created successfully');
          
        } else {
          console.error('Failed to create product');
        }
      } catch (error) {
        console.error('Error creating product:', error);
      }
   
  };

  return (
    

      
  
     
    <form
  onSubmit={handleSubmit}
  className="text-center flex-grow-3 p-4  bg-white border-gray-300 rounded-md shadow-md h-auto  xl:w-[100%]  md:mx-auto"
  encType="multipart/form-data"
>
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
    <div className="w-full md:w-[48%]">
    <label htmlFor="title" className="block font-semibold mb-2">Title:</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4" />

      <label htmlFor="author" className="block font-semibold mb-2">Author:</label>
      <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4" />
      <label htmlFor="subject" className="block font-semibold mb-2">Subject:</label>
      <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4" />
      <label htmlFor="classOfBook" className="block text-gray-700 font-medium mb-2">
    Class of Book
  </label>
  <select
    id="classOfBook"
    name="classOfBook"
    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
    value={formData.classOfBook}
    onChange={handleClassOfBookChange}
  >
 
    {Array.from({ length: 12 }, (_, index) => index + 1).map((classNumber) => (
      <option key={classNumber} value={classNumber}>
        Class {classNumber}
      </option>
    ))}
  </select>
    </div>
    <div className="w-full md:w-[48%]">

    <label htmlFor="price" className="block font-semibold mb-2">Price:</label>
      <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4" />
      <label htmlFor="condition" className="block font-semibold mb-2">Condition:</label>
<select
  id="condition"
  name="condition"
  value={formData.condition}
  onChange={handleChange}
  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
>
  <option value="new">Excellent</option>
  <option value="used">Good</option>
  <option value="worn">Fair</option>
</select>
 <label htmlFor="image" className="block font-semibold mb-2">Image:</label>
<input
  type="file"
  id="image"
  name="image"
  accept="image/*"
  onChange={(e)=>handlefile(e)}
  className="w-full border border-gray-300 rounded-md mb-4"
/>
    </div>
  </div>
  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-8 w-full"
  >
    Submit
  </button>
</form>

  );
};

export default page;


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