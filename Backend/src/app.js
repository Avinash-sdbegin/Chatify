import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { server, app } from './lib/socket.js';
import authRoute from './routes/authRoute.js';
import messageRoute from './routes/messageRoute.js';

const corsOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://localhost:5174',
].filter(Boolean);

app.use(cors({
    origin: corsOrigins,
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

mongoose.connect(process.env.MONGODB_URI)
.then((res) => {
    console.log('Connected to MongoDB: '+res.connection.host);
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
