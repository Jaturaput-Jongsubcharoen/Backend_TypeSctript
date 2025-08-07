console.log("Hello TypeScript!");
require('dotenv').config();

import express from 'express';
import http from 'http';
import bodyParse from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import { connectDB } from './config/db'


const PORT = process.env.PORT;

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());

app.use(cookieParser());

app.use(bodyParse.json());


async function startServer() {
    try {
        await connectDB();

        const server = http.createServer(app);

        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }
}
startServer();




