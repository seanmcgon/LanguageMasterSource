import { io } from 'socket.io-client';

const socket = io.connect('https://languagemastersource-server.onrender.com');

export const connectSocket = () => {
  socket.on("connect", () => {
    //we listen for the back-end confirmation message
    console.log("You connected with id", socket.id);
  });
};

export const disconnectSocket = () => {
  socket.disconnect();
};

//change to student email
export const verifyStudent = (studentEmail, studentPassword, studentVerified) => {
  //we send the studentName and password and get back the boolean
  //function that checks before emitting
  //if good then send else don't
  socket.emit('studentInfo', studentEmail, studentPassword);
  socket.on("studentVerification", studentVerified);
};

export const createStudent = (studentFirstName, studentLastName, studentEmail, studentPassword, studentCreated) => {
  //we send the studentName and password and get back the boolean
  //function that checks before emitting
  //if good then send else don't
  socket.emit('createTeacher', studentFirstName, studentLastName, studentEmail, studentPassword);
  socket.on("createTeacherStatus", studentCreated);
};