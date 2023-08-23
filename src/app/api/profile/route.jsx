import { connectDB } from "@/utils/mongodb";
import mongoose from 'mongoose';



export async function PUT(request) {
  const { default: Profile } = await import('@/model/Profile');
  
  const creatorObjectId = new mongoose.Types.ObjectId();
  const {newUsername,newProfilePhoto,studentId,name} = await request.json();

  try {
    await connectDB();
    console.log('Image:', newUsername,studentId,name); // Make sure image is defined



      
      const profile = await Profile.findOne({ studentId });

      if (!profile) {
        return new Response(JSON.stringify("profile NOT FIND"), { status: 404 })
      }

      // Update the specific fields
      profile.userName = newUsername || profile.userName; // Update only if newUsername is provided
      profile.image = newProfilePhoto || profile.image; // Update only if newProfilePhoto is provided

      // Save the changes
      await profile.save();


         
          return new Response(JSON.stringify("profile update successfully"), { status: 200 })
      
    

    // ... your existing code ...
  } catch (error) {
    console.error('Error:', error);
    return new Response('Failed to update successfully', { status: 500 });
  }
}




   
   

export async function GET(request) {
  const { default: Profile } = await import('@/model/Profile');
  const { searchParams } = new URL(request.url)
 const id = searchParams.get('studentId')
 

    try {
      await connectDB();
   
      // Retrieve all products from the Book collection
      const allProducts = await Profile.find({studentId:id});

 
      return new Response(JSON.stringify(allProducts), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      console.error('Error:', error);
      return new Response('Failed to retrieve products', { status: 500 });
    }
}