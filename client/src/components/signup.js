import React, { useState } from 'react';
import { createStudent } from './socket';

const Login = () => {
  const [studentVerified, setStudentVerified] = useState(false);
  const [studentEmail, setStudentEmail] = useState(''); 
  const [studentPassword, setStudentPassword] = useState('');
  const [studentConfirmPassword, setStudentConfirmPassword] = useState('');
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [message, setMessage] = useState(''); // Add a state variable for the message

  const handleChange = (setter) => (e) => setter(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentPassword !== studentConfirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    createStudent(studentFirstName, studentLastName, studentEmail, studentPassword, (createStatus) => {
      if (createStatus) {
        setStudentVerified(true);
        setMessage("Teacher created successfully!");
      } else {
        setMessage("Teacher creation failed!");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Enter First Name:
          <input type="text" value={studentFirstName} onChange={handleChange(setStudentFirstName)} />
        </label>
      </div>
      <div>
        <label>
          Enter Last Name:
          <input type="text" value={studentLastName} onChange={handleChange(setStudentLastName)} />
        </label>
      </div>
      <div>
        <label>
          Enter Email:
          <input type="email" value={studentEmail} onChange={handleChange(setStudentEmail)} />
        </label>
      </div>
      <div>
        <label>
          Create Password:
          <input type="password" value={studentPassword} onChange={handleChange(setStudentPassword)} />
        </label>
      </div>
      <div>
        <label>
          Re-enter Password:
          <input type="password" value={studentConfirmPassword} onChange={handleChange(setStudentConfirmPassword)} />
        </label>
      </div>
      <button type="submit" className="submit-button">Sign up as Teacher</button>
      <div>{message}</div> {/* Display the message here */}
    </form>
  );
};

export default Login;
