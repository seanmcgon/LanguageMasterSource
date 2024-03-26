import React, { useState } from "react";
import Login from "./components/Login/Login.js";
import "./App.css"; // Import the CSS file

const App = () => {
  // State to manage the visibility of the Login component
  const [showLogin, setShowLogin] = useState(false);

  return (
    // <div>
    //   <h1>Language Master</h1>
    //   <button className="login-button" onClick={() => setShowLogin(true)}>Login Page</button>
    //   {showLogin && <Login />}
    // </div>
    <>
      <h1>Welcome to Language Master</h1>
      <Login />
    </>
  );
};
export default App;
