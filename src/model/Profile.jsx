import { Schema, model, models } from 'mongoose';

const profileSchema = new Schema({
  studentId: {
    type: String, // You can use ObjectId or String as the type, depending on your needs
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    
  },
 
});

const Profile = models.Profile || model('Profile', profileSchema);

module.exports = Profile;
