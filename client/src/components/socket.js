import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export const connectSocket = () => {
  socket.on("connect", () => {
    //we listen for the back-end confirmation message
    console.log("You connected with id", socket.id);
  });
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const verifyStudent = (studentName, studentPassword, studentVerified) => {
  //we send the studentName and password and get back the boolean

  socket.emit('studentInfo', studentName, studentPassword);
  socket.on("studentVerification", studentVerified);
};