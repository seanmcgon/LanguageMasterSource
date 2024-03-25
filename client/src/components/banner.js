import React from 'react';
import bannerImg from './TestBannerImage.jpg';

export default function Banner({handleClick}) {
    return (
      <div className="banner">
        <img src={bannerImg} alt="Example banner image" className='banner-image'/>
        <div className="banner-gradient-overlay"></div>
        <button className="btn" onClick={handleClick}>Start learning</button>
      </div>
    );
}