import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
const port=Number(process.env.PORT||5000);
if(!process.env.MONGODB_URI){console.error('MONGODB_URI is required.');process.exit(1);}

try {
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 8000
  });

  console.log('MongoDB connected successfully!');

  app.listen(port, () => {
    console.log(`AI Mystery Room API listening on ${port}`);
  });
} catch (error) {
  console.error(`Could not connect to MongoDB: ${error.message}`);
  process.exit(1);
}

