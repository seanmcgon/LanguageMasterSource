import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Login from './components/login';
import { emitStudentInfo } from './components/socket';



const App = () => {
  return (
    <div>
      <h1>Language Master</h1>
      <Login />
    </div>
  );
};

export default App;