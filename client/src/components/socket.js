import { io } from 'socket.io-client';

const socket = io('https://lmbeta-server.onrender.com');

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
  socket.emit('createStudent', studentFirstName, studentLastName, studentEmail, studentPassword);
  socket.on("createStudentStatus", studentCreated);
};

export const verifyTeacher = (teacherEmail, teacherPassword, teacherVerified) => {
  // Emit teacher credentials and listen for verification status
  socket.emit('teacherInfo', teacherEmail, teacherPassword);
  socket.on("teacherVerification", teacherVerified);
};

export const createTeacher = (teacherFirstName, teacherLastName, teacherEmail, teacherPassword, teacherCreated) => {
  // Emit teacher details and listen for creation status
  socket.emit('createTeacher', teacherFirstName, teacherLastName, teacherEmail, teacherPassword);
  socket.on("createTeacherStatus", teacherCreated);
};
