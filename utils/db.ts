import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/moviesList';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;
