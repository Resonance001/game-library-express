import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import gameRoutes from './routes/game.js';
import passport from 'passport';
import './middlewares/passport.js';
import errorHandler from './middlewares/errorHandler.js';
import logger from './middlewares/logger.js';
import { rateLimit } from 'express-rate-limit';

const app = express();

// Limit auth routes to 5 requests every 5 minutes
const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
});

// Limits game routes to 60 requests every minute
const gameLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60,
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB: ', error);
    });

// Parse incoming requests with JSON payload
app.use(express.json());

// Logs every request and response
app.use(logger);

// Initializes passport for authentication
app.use(passport.initialize());

// Define authentication routes with rate limiter
app.use('/auth', authLimiter, authRoutes);

// Protects the succeeding routes (game routes) using JWT
app.use(passport.authenticate('jwt', { session: false }));

// Define game routes with rate limiter
app.use('/game', gameLimiter, gameRoutes);

// Handle errors
app.use(errorHandler);

// Starts up server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log('Server running on port: ', PORT);
});
