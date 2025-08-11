console.log("Hello TypeScript! This is Jaturaput (Mac) Jongsubcharoen.");
require('dotenv').config();

import http from 'http';
import { connectDB } from './db/db';
import app from './app';

//import bodyParse from 'body-parser';

//app.use(bodyParse.json()); I dpn't use

const PORT = process.env.PORT;

async function startServer() {
    try {
        await connectDB();
        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }
}

startServer();