import React from 'react';
import logo from './logo.png';

export default function Logo({handleClick}) {
    return (
      <div className="logo">
        <img src={logo} alt="LM logo" className='logo-image'/>
        <div className="banner-gradient-overlay"></div>
        <button className="btn" onClick={handleClick}>Go to Homepage</button>
      </div>
    );
}