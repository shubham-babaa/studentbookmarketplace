import { connectDB } from "@/utils/mongodb";
import mongoose from 'mongoose';




export async function POST(request) {
  const { default: Student } = await import('@/model/student');
  
  const creatorObjectId = new mongoose.Types.ObjectId();
  const { name,email,password } = await request.json();

  try {
    await connectDB();
          const newStudent = new Student({
            studentId:creatorObjectId,
            name,
            email,
            password
          });

          await newStudent.save();
          const responseData = {
            message: 'User sign up successful', // You can customize this message
          };
          createProfileIfNotExists(creatorObjectId,name)
      
          return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
    

    // ... your existing code ...
  } catch (error) {
    console.error('Error:', error);
    return new Response('Failed to create a nnew user', { status: 500 });
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