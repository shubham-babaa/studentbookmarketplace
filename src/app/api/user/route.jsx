import { connectDB } from "@/utils/mongodb";
// import UserModel from "@/model/user";
import mongoose from 'mongoose';

export async function POST(request) {
    const { default: AccountModel } = await import('@/model/ml');

  const creatorObjectId = new mongoose.Types.ObjectId();
  const { prompt, tag } = await request.json();

  try {
    await connectDB();
    console.log('Connected to database');

    const newAccountModel = new AccountModel({ creator: creatorObjectId, prompt, tag });
    console.log('New Account Model:', newAccountModel);

    await newAccountModel.save();
    console.log('Saved newAccountModel');

    return new Response(JSON.stringify(newAccountModel), { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Failed to create a new prompt', { status: 500 });
  }
}










   
   

export async function GET(request) {
    const { default: AccountModel } = await import('@/model/ml');
    try {
        await connectDB();

        // Assuming you want to find a user with the name "shubham"
        const user = await AccountModel.find({
tag:"Tag 2"});

        console.log(user);

        if (user.length === 0) {
            return new Response("User not found", { status: 404 });
        }

        // If you want to return the user data as JSON response
        return new Response(JSON.stringify(user), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (error) {
        console.error("Error fetching user:", error);
        return new Response("Failed to fetch user data", { status: 500 });
    }
}
