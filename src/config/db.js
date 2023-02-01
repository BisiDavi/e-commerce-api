import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from './logger';

dotenv.config();
/**
 * Connect To Database
 */
const connectDB = async () => {
  mongoose.set('autoIndex', true);
  mongoose.set('strictQuery', false);
  const con = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
  });

  logger.info(`MongoDB Connected: ${con.connection.host}.`);

  mongoose.connection.on('connecting', () => {
    logger.info('Connecting to Database');
  });

  mongoose.connection.on('connected', () => {
    logger.info('Mongoose Connected to Database');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose Connection is Disconnected.');
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

export default connectDB;
