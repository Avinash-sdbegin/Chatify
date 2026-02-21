import express from 'express';

import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5174'],
    }
});
const userSocket = {};

export const getReceiverSocketId = (userId) => {
    return userSocket[userId];
};

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocket[userId] = socket.id;
        
    }
    io.emit('getOnlineUsers', Object.keys(userSocket));

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
        delete userSocket[userId];
        io.emit('getOnlineUsers', Object.keys(userSocket));
    });
});


export { io, server,app };
