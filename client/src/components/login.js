import React, { useState } from 'react';
import { verifyStudent } from './socket';

const Login = () => {
  const [studentName, setStudentName] = useState(''); 
  const [studentPassword, setStudentPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState(''); // State for login message

  const handleNameChange = (e) => {
    setStudentName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setStudentPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    verifyStudent(studentName, studentPassword, (verificationStatus) => {
      if (verificationStatus) {
        setLoginMessage('Sign in successful');
      } else {
        setLoginMessage('Invalid username/password');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Enter Email:
          <input type="text" value={studentName} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          Enter Password:
          <input type="password" value={studentPassword} onChange={handlePasswordChange} />
        </label>
      </div>
      <button type="submit" className="submit-button">Login as Teacher</button>
      <div>{loginMessage}</div> {/* Display the login message */}
    </form>
  );
};

export default Login;
