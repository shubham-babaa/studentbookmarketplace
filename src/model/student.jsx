import { Schema, model, models } from 'mongoose';

const studentSchema = new Schema({
  studentId: {
    type: String, // You can use ObjectId or String as the type, depending on your needs
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const Student = models.Student || model('Student', studentSchema);

module.exports = Student;