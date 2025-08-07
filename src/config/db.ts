import mongoose from 'mongoose';


require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;


export const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.Promise = Promise;

        await mongoose.connect(`${MONGO_URI}/tsc-testing3`);
        mongoose.connection.on('error', (error: Error) => console.log(error));

        const {host, port, name, readyState } = mongoose.connection;
        console.log(`Host: ${host}`);
        console.log(`Port: ${port}`);
        console.log(`Name: ${name}`);
        console.log(`ReadyState: ${readyState}`);
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }

};







