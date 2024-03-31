import React, { useState } from 'react';
import Login from './components/login';
import Banner from './components/banner';
import SignUpForm from './components/signup';
import CreateClassPopup from './components/createClassPopup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false); // Hide the signup form when showing the login form
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false); // Hide the login form when showing the signup form
  };

  const refreshPage = () => {
    window.location.reload();
  };
  
  return (
    <>
      <button className="title-button" onClick={refreshPage}>
        <h1>LanguageMaster Alpha Release</h1>
      </button>
      <div>
        <button className="login-button" onClick={handleLoginClick}>Login</button>
        <button className="login-button" onClick={handleSignupClick}>Sign up</button>
      </div>
      {showLogin && <Login />}
      {showSignup && <SignUpForm />}
      <Banner handleClick={() => {
        setShowSignup(true);
        setShowLogin(false);
      }} />    

      <button id="createClassBtn" onClick={() => setModalShow(true)}>
        Create New Class
      </button>

      {/* Use the handleSubmission prop to provide the function with which to communicate with server */}
      {/* It takes the className string submitted by the user and should send that to the server(?) */}
      {/* Right now I have it set up to handle a return of true (success) or false (failure) */}
      {/* On success, exit the popup and show updated classes page/menu */}
      {/* On failure (invalid class name / already exists), display a message prompting user to try a different name */}
      <CreateClassPopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleSubmission={(className) => false}
      />
    </>
  );
};

export default App;
