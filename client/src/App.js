import React, { useState } from 'react';
import Login from './components/login';
import Banner from './components/banner';
import './App.css'; // Import the CSS file

const App = () => {
  // State to manage the visibility of the Login component
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div>
        <h1>Language Master</h1>
        <button className="login-button" onClick={() => setShowLogin(true)}>Login Page</button>
        {showLogin && <Login />}
      </div>
      <Banner handleClick={() => setShowLogin(true)} />
    </>
  );
};
export default App;