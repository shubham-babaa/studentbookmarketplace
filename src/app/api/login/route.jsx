import { connectDB } from "@/utils/mongodb";
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import randomstring from 'randomstring';
const { default: Student } = await import('@/model/student');

export async function POST(req) {
 

  
    await connectDB();
    
    try {
      const { email, password } = await req.json();
      console.log(email,password)
      const user = await Student.findOne({ email });
      console.log(user);
      if (!user) {
        return  new Response(JSON.stringify({ error: 'User not found' }),{ status: 404 })
      }
  
      
      
      if (password!=user.password) {
        return  new Response(JSON.stringify({ error: 'invalid passward' }),{ status: 402 })
      }
  
      // if (!user.verified) {
      //   return  new Response(JSON.stringify({ error: 'User not verified' }),{ status: 403 })
      // }
  
      const token = jwt.sign({ userId: user.studentId },"abc123nadsfnjdfncidjkvkfdvijkfmvirfjcmokfdjcmvkfdjcvmoiklerjdvcokl");
      console.log(token);
      return  new Response(JSON.stringify({token: token,studentId:user.studentId,name:user.name}),{ status: 200 });
    } catch (error) {
      console.error('Failed to log in:', error);
      return  new Response(JSON.stringify({message:'failed to login'}),{ status: 500 });
    }
}



