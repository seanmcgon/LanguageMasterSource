import React, { useState } from 'react';
import Login from './components/login';
import Banner from './components/banner';
import CreateClassPopup from './components/createClassPopup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

const App = () => {
  // State to manage the visibility of the Login component
  const [showLogin, setShowLogin] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div>
        <h1>Language Master</h1>
        {/* <button className="login-button" onClick={() => setShowLogin(true)}>Login Page</button> */}
        {showLogin && <Login />}
        {/* if show login is true, then we show the Login button */}
      </div>
      <Banner handleClick={() => setShowLogin(true)} />

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