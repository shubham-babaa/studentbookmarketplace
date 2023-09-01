
import { connectDB } from "@/utils/mongodb";
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import randomstring from 'randomstring';

export async function POST(request) {
    const { default: Student } = await import('@/model/student');
    try {
      const { verificationCode, email } = await request.json();
      console.log(email, verificationCode); // Log values for debugging
  
      const user = await Student.findOne({ email }).exec();
      console.log(user)
      if (!user) {
       return new Response(JSON.stringify("user not found"), { status: 404 })
      }
  
      let storedVerificationCode = user.code;
      storedVerificationCode = storedVerificationCode + '';
  
      if (verificationCode !== storedVerificationCode) {
        return new Response(JSON.stringify("invalid varification code"), { status: 404 })
      }
  
      user.verified = true;
      await user.save();
      const token = jwt.sign({ userId: user.studentId }, "your-secret-key");
      console.log(token); // Log the generated token for debugging
  
      return new Response(JSON.stringify({ token }), { status: 200 });
    } catch (error) {
      console.error('Error handling verification code:', error);
      return new Response(JSON.stringify("user not find"), { status: 404 })
    }
  }
  