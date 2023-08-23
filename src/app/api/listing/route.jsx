import { connectDB } from "@/utils/mongodb";
import mongoose from 'mongoose';
export async function POST(request) {
  const { default: Listing } = await import('@/model/Lsiting');
  
  await dbConnect(); // Connect to the database


    try {
      const { listingId, studentId, bookId } = request.body;

      const newListing = new Listing({
        listingId,
        studentId,
        bookId,
      });

      await newListing.save(); // Save the new listing to the database

      return res.status(201).json({ message: 'Listing created successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while creating the listing' });
    }
  }

 




   
