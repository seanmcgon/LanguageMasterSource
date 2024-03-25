import React, { useState } from 'react';
import { verifyStudent } from './socket';


const Login = () => {
  //states to handle the student status
  const [studentVerified, setStudentVerified] = useState('');
  const [studentName, setStudentName] = useState(''); 
  const [studentPassword, setStudentPassword] = useState('');

  const handleNameChange = (e) => {
    setStudentName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setStudentPassword(e.target.value);
  };

  const handleSubmit = () => {
    //handleSubmit is called when a student clicks the login button
    //we call verify student and pass in the student's information to get a response from the backend
    //verificationStatus is the response from the back-end
    verifyStudent(studentName, studentPassword, (verificationStatus) => {
      console.log(verificationStatus);
      setStudentVerified(verificationStatus);
    });
  };

  return (
    <div>
      <div>
        <label>
          Enter Name:
          <input type="text" value={studentName} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          Enter Password:
          <input type="password" value={studentPassword} onChange={handlePasswordChange} />
        </label>
      </div>
      <button className = "submit-button" onClick={handleSubmit}>Login</button>
      <h2>{studentVerified ? 'Student Verified' : 'Student Not Verified'}</h2>
    </div>
  );
};

export default Login;

