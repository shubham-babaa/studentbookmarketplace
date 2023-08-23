import { Schema, model, models } from 'mongoose';

const listingSchema = new Schema({
  listingId: {
    type: String, // You can use ObjectId or String as the type, depending on your needs
    required: true,
    unique: true,
  },
  studentId: {
    type: String, // You can use ObjectId or String as the type, depending on your needs
    required: true,
  },
  bookId: {
    type: String, // You can use ObjectId or String as the type, depending on your needs
    required: true,
  },
});

const Listing = models.Listing || model('Listing', listingSchema);

module.exports = Listing;
