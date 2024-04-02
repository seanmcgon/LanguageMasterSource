import React, { useState } from "react";
import Login from "./components/Login/Login.js";
// import Login from "./components/login";
import Banner from "./components/banner";
import SignUpForm from "./components/signup";
import ClassMenu from "./components/Class/ClassMenu.js";
import "./App.css";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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
        {/* <button className="login-button" onClick={handleLoginClick}>
          Login
        </button> */}
        <Login />
        <button className="login-button" onClick={handleSignupClick}>
          Sign up
        </button>
      </div>
      {/* {showLogin && <Login />} */}
      {showSignup && <SignUpForm />}
      <Banner
        handleClick={() => {
          setShowSignup(true);
          setShowLogin(false);
        }}
      />

      <ClassMenu />
    </>
  );
};

export default App;
