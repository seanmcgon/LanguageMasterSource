import React, { useState, useEffect } from 'react';
import bannerImg from './TestBannerImage.jpg'

const App = () => {
  // State for storing the received message from the server
  const [message, setMessage] = useState('');
  // State for storing the WebSocket connection
  const [ws, setWs] = useState(null);
  // State for storing the input from the user
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Establish a WebSocket connection to the specified URL
    const socket = new WebSocket('ws://localhost:3001');

    // Event handler for successful connection establishment
    socket.onopen = () => {
      console.log('Connected to the server');
    };

    // Event handler for receiving messages from the server
    socket.onmessage = (event) => {
      // Update the 'message' state with the received message
      const receivedMessage = event.data;
      setMessage(receivedMessage);
    };

    // Update the WebSocket connection state
    setWs(socket);

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      // Send the user input instead of a hardcoded message
      console.log("Send message", inputMessage);
      ws.send(inputMessage);
      // Optionally, clear the input field after sending the message
      setInputMessage('');
    }
  };

  return (
    <div>
      <h1>Language Master</h1>
      <p>Received Message: {message}</p>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <p></p>
      <Banner/>
    </div>
  );
};

function Banner({handleClick}) {
  return (
    <div className="banner">
      <img src={bannerImg} alt="Example banner image" className='banner-image'/>
      <div className="banner-gradient-overlay"></div>
      <button className="btn" onClick={handleClick}>Start learning</button>
    </div>
  );
}

export default App;