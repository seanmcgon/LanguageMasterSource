import Login from "./components/Login/Login.js";
import SignUp from "./components/SignUp/signUp.js";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Banner from "./components/banner";
import ClassMenu from "./components/Class/ClassMenu.js";
import "./App.css";
import React, { useState } from 'react';

// Ala quizlet: place buttons on navbar
// navbar has components whose visibility is controlled
const App = () => {

  const refreshPage = () => {
    window.location.reload();
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logoff
  const handleLogoff = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <button className="title-button" onClick={handleLogoff}>
          <h1>Logoff</h1>
        </button>
      ) : (
        <button className="title-button" onClick={refreshPage}>
          <h1>LanguageMaster Beta Release</h1>
        </button>
      )}

      <div>
        {!isLoggedIn && <Login onLoginSuccess={handleLoginSuccess} />}
        {!isLoggedIn && <SignUp />}
      </div>
      {!isLoggedIn && <Banner handleClick={refreshPage} />}
      {isLoggedIn && <ClassMenu />}
    </>
  );
};


export default App;
