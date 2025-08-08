console.log("Hello TypeScript! This is Jaturaput (Mac) Jongsubcharoen.");
require('dotenv').config();

import express from 'express';
import http from 'http';
import bodyParse from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import { connectDB } from './db/db'
import router from './router';

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();

const corsOptions = {
    origin: FRONTEND_URL,
    credentials: true,
};
app.use(cors(corsOptions));

app.use(compression());

app.use(cookieParser());

//app.use(bodyParse.json()); I dpn't use

app.use(express.json());


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

app.use('/', router());




