import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export const connectSocket = () => {
  socket.on("connect", () => {
    console.log("You connected with id", socket.id);
  });
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const verifyStudent = (studentName, studentPassword, callback) => {
  socket.emit('studentInfo', studentName, studentPassword);
  socket.on("studentVerification", callback);
};