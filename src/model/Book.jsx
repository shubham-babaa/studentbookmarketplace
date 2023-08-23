import { Schema, model, models } from 'mongoose';


const bookSchema = new Schema({
  bookId: {
    type: String, // You can use ObjectId or String as the type, depending on your needs
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
 
  },
  sellerId: {
    type: String, // You can use ObjectId or String as the type, depending on your needs
    required: true,
  },
  image: {
    type: String, // Store the URL or file path of the image
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  classOfBook: {
    type: String,
    required: true,
  },
});

const Book = models.Book || model('Book', bookSchema);

module.exports = Book;
