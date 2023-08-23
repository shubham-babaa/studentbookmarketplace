import { connectDB } from "@/utils/mongodb";
import mongoose from 'mongoose';
const { default: Student } = await import('@/model/student');

export async function POST(request, context) {
 

  try {
    await connectDB();
    

    const { name,email,password } = await request.json();
    // Retrieve student data based on email
    const student = await Student.find({ email });
    console.log(student)
    
 
   
    return new Response(JSON.stringify(student), { status: 200 })
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify( 'Failed to retrieve student data'), { status: 500 })
    
  }
}



