import { connectDB } from "@/utils/mongodb";
import mongoose from 'mongoose';



export async function POST(request) {
  const { default: Book } = await import('@/model/Book');
  
  const creatorObjectId = new mongoose.Types.ObjectId();
  const { title, author, subject, price, condition, sellerId,image, classOfBook } = await request.json();
console.log(title)
  try {
    await connectDB();
     // Make sure image is defined

   
          const newBook = new Book({
            bookId: creatorObjectId,
            title,
            author,
            subject,
            price,
            condition,
            sellerId,
            image,
            section: "infant",
            classOfBook
          });
console.log(newBook)
          await newBook.save();
          console.log('Saved Book with image URL');
        
      
          return new Response('Failed to create a new book', { status: 200 });

    // ... your existing code ...
  } catch (error) {
    console.error('Error:', error);
    return new Response('Failed to create a new book', { status: 500 });
  }
}




   
   

export async function GET(request) {
  

    try {
      await connectDB();
   
      // Retrieve all products from the Book collection
      const booksWithUserDetails = await getAllBooksAndUserDetails();
     
    
 
      return new Response(JSON.stringify(booksWithUserDetails), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      console.error('Error:', error);
      return new Response('Failed to retrieve products', { status: 500 });
    }
}



// Assuming you are using an async function to fetch the data
async function getAllBooksAndUserDetails() {
  const { default: Book } = await import('@/model/Book');
  const {default:Profile}=await import ('@/model/Profile')
  try {
    const booksWithUserDetails = await Book.aggregate([
      {
        $lookup: {
          from: 'profiles', // Collection name for Profile model
          localField: 'sellerId',
          foreignField: 'studentId',
          as: 'sellerInfo',
        },
      },
      {
        $unwind: '$sellerInfo',
      },
      {
        $project: {
          _id: 1,
          title: 1,
          author: 1,
          subject: 1,
          price: 1,
          condition: 1,
          sellerId: 1,
          image: 1,
          section: 1,
          classOfBook: 1,
          'sellerInfo.userName': 1,
          'sellerInfo.image': 1,
        },
      },
    ]);

    return booksWithUserDetails;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}



