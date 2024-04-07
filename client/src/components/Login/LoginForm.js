import React, { useState } from "react";
import { Modal } from 'bootstrap';
import "./Login.css";
import { verifyStudent, verifyTeacher } from '../socket';

function LoginForm() {
  const [isTeach, setTeach] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCloseClick = () => {
    window.location.reload();
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const loginModalElement = document.getElementById('LoginForm');
    const loginModal = Modal.getInstance(loginModalElement);
    if (loginModal) {
      loginModal.hide();
    }

    const signUpModalElement = document.getElementById('SignUpForm');
    let signUpModal = Modal.getInstance(signUpModalElement);
    if (!signUpModal) {
        signUpModal = new Modal(signUpModalElement);
    }
    signUpModal.show();

    signUpModalElement.querySelector('input')?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("clicked button")
    const verificationFunction = isTeach ? verifyTeacher : verifyStudent;
    console.log(verificationFunction)
    verificationFunction(email, password, (verificationStatus) => {
      console.log("Verification status:", verificationStatus);
      // Handle login success or failure here
    });
  };

  return (
    <div className="myform" id="LoginForm">
      <div className="modal-header">
        <button type="button" className="btn-close" onClick={handleCloseClick} aria-label="Close"></button>
      </div>
      <h1 className="text-center">Login for {isTeach ? "Teacher" : "Student"}</h1>
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          className="btn btn-role bg-transparent"
          onClick={() => setTeach(!isTeach)}
        >
          I'm a {isTeach ? "Student" : "Teacher"}
        </button>
        <div className="mb-3 mt-4">
          <label htmlFor="InputEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control grey-background"
            id="InputEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control grey-background"
            id="InputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-light mt-3">
          Login
        </button>
        <p>
          Not a member? <a href="#" onClick={handleSignUpClick}>Signup now</a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
