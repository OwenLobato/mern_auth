import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI_LOCAL, {});

  console.log('Mongo DB connected ');
};
