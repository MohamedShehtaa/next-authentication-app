import mongoose from 'mongoose';

export async function connectDb() {
  try {
    mongoose.connect(process.env.mongo_url!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDb connected successfully');
    });
    connection.on('error', () => {
      console.log('MongoDb connection error');
    });
  } catch (e: any) {
    console.log(e);
  }
}
