import { connectDB } from "@/utils/mongodb";
import mongoose from 'mongoose';

export async function GET(request) {
    const { default: Book } = await import('@/model/Book');
    const { searchParams } = new URL(request.url)
   const id = searchParams.get('studentId')
   
 
      try {
        await connectDB();
     
        // Retrieve all products from the Book collection
        const allProducts = await Book.find({ sellerId: id });

   
        return new Response(JSON.stringify(allProducts), { status: 200, headers: { 'Content-Type': 'application/json' } });
      } catch (error) {
        console.error('Error:', error);
        return new Response('Failed to retrieve products', { status: 500 });
      }
}
