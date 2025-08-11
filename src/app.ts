import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import router from './router';

const { FRONTEND_URL, FRONTEND_AMPLIFY_URL } = process.env;

const app = express();

const allowedOrigins = [FRONTEND_URL, FRONTEND_AMPLIFY_URL].filter(
  (u): u is string => Boolean(u)
);

const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
};

// CORS first
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// Parse body BEFORE router, and be lenient on types
app.use(express.json({ type: ['application/json', 'text/plain'] }));
app.use(express.urlencoded({ extended: true }));

//app.use(express.text({ type: '*/*' }));

// Safety net: if something still arrives as a string, try to JSON-parse it
app.use((req, _res, next) => {
  if (typeof req.body === 'string') {
    try {
      req.body = JSON.parse(req.body);
    } catch { /* leave as string if it's not JSON */ }
  }
  next();
});

app.use(compression());
app.use(cookieParser());

app.use('/', router());

// health
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

export default app;