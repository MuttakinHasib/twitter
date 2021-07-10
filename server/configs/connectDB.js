import mongoose from 'mongoose';

const connectDB = async () => {
  const MONGO_URI =
    process.env.MONGO_URI || 'mongodb://localhost:27017/twitter';

  try {
    const connect = await mongoose.connect(MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.error(`Error ${err}`);
    process.exit(1);
  }
};

export default connectDB;
