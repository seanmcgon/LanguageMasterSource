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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [classList, setClassList] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState(""); // Add a state for the user's name
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);
    const [currentClass, setCurrentClass] = useState(""); // Renamed state variable


    function getClassesHelper(userEmail) {
        const classesTest = [
            {
                title: "Spanish100",
                link: null,
            },
            {
                title: "Arabic for Business",
                link: null,
            },
            {
                title: "Classical Chinese",
                link: null,
            },
        ];
        return () => classesTest;
    }
    
    const getClassesForUser = (userEmail) => {
        const testClass = getClassesHelper(userEmail);
        try {
            setClassList(testClass()); 
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const handleLoginSuccess = (email, name) => {
        setIsLoggedIn(true);
        setUserEmail(email);
        setUserName(name); // Assume 'name' is passed along with 'email' after successful login
        getClassesForUser(email);
    };

   
    const handleSignOut = () => {
        setShowLogoutMessage(true);
        setTimeout(() => {
            setIsLoggedIn(false);
            setUserEmail("");
            setUserName("");
            setClassList([]);
            setShowLogoutMessage(false);
        }, 1500); 
    };

    return (
        <>
            <NavBar isLoggedIn={isLoggedIn} userName={userEmail} onSignOut={handleSignOut} />
            <div>
                {isLoggedIn ? (
                    <ClassMenu classes={classList} />
                ) : (
                    <>
                        <Login onLoginSuccess={handleLoginSuccess} />
                        <SignUp onLoginSuccess={handleLoginSuccess} />
                        <Banner handleClick={() => {
                            const signUpModal = new Modal(document.getElementById('SignUpForm'));
                            signUpModal.show();
                        }} />
                    </>
                )}
            </div>
            {showLogoutMessage && (
                <div className="logout-message">
                    Logging out...
                </div>
            )}
        </>
    );
};

export default App;