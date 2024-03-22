import React, { useState } from 'react';
import { emitStudentInfo } from './socket';

const Login = () => {
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
    emitStudentInfo(studentName, studentPassword, (verificationStatus) => {
      console.log(verificationStatus);
      setStudentVerified(verificationStatus);
    });
  };

  return (
    <div>
      <label>
        Enter Name:
        <input type="text" value={studentName} onChange={handleNameChange} />
      </label>
      <label>
        Enter Password:
        <input type="password" value={studentPassword} onChange={handlePasswordChange} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
      <h2>{studentVerified ? 'Student Verified' : 'Student Not Verified'}</h2>
    </div>
  );
};

export default Login