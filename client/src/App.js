import React from 'react';
import Login from "./components/Login/Login.js";
import SignUp from "./components/SignUp/signUp.js";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Banner from "./components/banner";
import ClassMenu from "./components/Class/ClassMenu.js";
import "./App.css";
//import NavigationBar from "./components/navigationBar.js"     might need to render the nav bar component here 


const App = () => {

  const refreshPage = () => {
    window.location.reload();
  };

  // Function to show the SignUp modal


  return (
    <>
      <button className="title-button" onClick={refreshPage}>
        <h1>LanguageMaster Beta Release</h1>
      </button>
      <div>
        <Login />
        <SignUp />
      </div>
      <Banner
        handleClick={refreshPage} // Pass the function to show the SignUp modal
      />

      <ClassMenu />
    </>
  );
};

export default App;
