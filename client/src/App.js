// App.js
import React, { useState } from 'react';
import NavBar from "./components/NavBar/NavBar.js";
import Login from "./components/Login/Login.js";
import SignUp from "./components/SignUp/signUp.js";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Banner from "./components/banner";
import ClassMenu from "./components/Class/ClassMenu.js";
import "./App.css";
import { Modal } from 'bootstrap';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const showSignUp = () => {
      const signUpModal = new Modal(document.getElementById('SignUpForm'));
      signUpModal.show();
  };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };



    return (
        <>
            <NavBar isLoggedIn={isLoggedIn} onLoginSuccess={handleLoginSuccess} />
            <div>
                {isLoggedIn ? (
                    <>
                        <ClassMenu />
                    </>
                ) : (
                    <>
                        <Login onLoginSuccess={handleLoginSuccess} />
                        <SignUp />
                        <Banner handleClick={() => {showSignUp()}} />
                    </>
                )}
            </div>
        </>
    );
};

export default App;
