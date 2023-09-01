import { connectDB } from "@/utils/mongodb";
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import randomstring from 'randomstring';

const nodemailer = require('nodemailer');
let randomInt = Math.floor(Math.random() * 10000); 

const sendVerificationEmail = async ({studentId , email }) => {
console.log(studentId,email)
const { default: UserEmail} = await import('@/model/usermail');
  const uniqueString = uuidv4() + studentId;
  
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'manshipatel.deep@gmail.com', // Replace with your email address
      pass: 'fwkezupbwupoogje', // Replace with your email password
    },
  // Add this line to enable logging
  });
  console.log(email,"helloj")
  transporter.verify((error, success) => {
    if (error) {
      console.log('Error occurred while verifying transporter:', error.message);
    } else {
      console.log('Transporter is ready to send emails!');
    }
  });

const mailOptions = {
  from: 'manshipatel.deep@gmail.com', // Replace with your email address
  to: email, // Use the user's email from the user object
  subject: `Email Verification`,
  html: `<p>Hello,</p><p>your verification code is    ${randomInt}</p>`,
};

const salt = 10;
try {
  const hsd = await bcrypt.hash(uniqueString, salt);
  const verify = new UserEmail({
    userId: studentId,
    uniqueString: hsd,
    createdAt: Date.now(),
    expiresAt: Date.now() + 21600000, // Expire link after 6 hours
  });

  await verify.save();
  console.log(email,"hojdkkk")
  await transporter.sendMail(mailOptions);
console.log(email,"heelojdkkk")
  // Return the success result
  return {
    status: "pending",
    message: "A verification email has been sent successfully",
  };
} catch (error) {
  console.log(error);
  // Return the failure result
  return {
    status: "failed",
    message: "Verification email failed to send",
  };
}
};

export async function POST(request) {
  const { default: Student } = await import('@/model/student');
  console.log('hello')
  const creatorObjectId = new mongoose.Types.ObjectId();
  let { name,email,password } = await request.json();
  name = name.trim();
  email = email.trim();
  password = password.trim();
 
  try {
    await connectDB();
    console.log((!name || !email || !password))
    if (!name || !email || !password) {
      return new Response({
        status: 'Failed',
        error: 'Name, email, and password are required',
      },{
        status: 500,

      });
    }

    const existingUser = await Student.findOne({ email });
    console.log(existingUser)
    if (existingUser) {
      return new Response({ error: 'An error occurred while sending the verification email' } , {
        status: 500,

      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

console.log("FKfk")
  
          const newStudent = new Student({
            studentId:creatorObjectId,
            name,
            email,
            password,
            code:randomInt,
          });
          
          const emailResult = await sendVerificationEmail(newStudent);
          console.log(emailResult.message)
          await newStudent.save();
          const responseData = {
            message: 'User sign up successful', // You can customize this message
          };
          if (emailResult.status === "pending") {
            createProfileIfNotExists(creatorObjectId,name)
            return new Response(JSON.stringify(responseData), {
              status: 201,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          else {
            return new Response({ error: 'An error occurred while sending the verification email' } , {
              status: 500,
      
            });    }
  // ... your existing code ...
  } catch (error) {
    console.error('Error:', error);
    return new Response('Failed to create a new user', { status: 500 });
  }
}





















































async function createProfileIfNotExists(studentId, name) {
  const{default: Profile} =await import('@/model/Profile');
  try {
    const existingProfile = await Profile.findOne({ studentId });

    if (!existingProfile) {
      const dummyImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEhUSExI…"; // Replace with actual path
      const dummyUsername = 'user123'; // Replace with desired dummy username
      
      const newProfile = new Profile({
        studentId,
        image: dummyImage,
        userName: dummyUsername,
        name, // Assuming name is the name of the student
      });

      await newProfile.save();
      console.log('Profile created successfully.');
    } else {
      console.log('Profile already exists.');
    }
  } catch (error) {
    console.error('Error creating profile:', error);
  }
}