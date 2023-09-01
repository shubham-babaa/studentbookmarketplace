import mongoose, { Schema, model, models } from 'mongoose'

const useremailSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  uniqueString: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const UserEmail = models.UserEmail || model('UserEmail', useremailSchema);

export default UserEmail;
