import React, { useState } from 'react';
import "./NavBar.css";
import CreateClassPopup from './createClassPopup';

function NavBar({ isLoggedIn }) {
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/" style={{ color: 'maroon' }}>LanguageMaster</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {!isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <a className="nav-link login-button" href="#" onClick={() => setShowLoginModal(true)}>Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link signup-button" href="#" onClick={() => setShowSignUpModal(true)}>Sign Up</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item-loginAfter">
                                <a className="nav-link-special" href="/#">Sign Out</a>
                            </li>
                            <li className="nav-item-loginAfter">
                                <a className="nav-link-special" href="/join-class">Join Class</a>
                            </li>
                            <li className="nav-item-loginAfter">
                                <a className="nav-link-special" href="/#">View Profile</a>
                            </li>
                            <li className="nav-item-loginAfter">
                                <a className="nav-link-color" href="/#" onClick={() => setShowSignUpModal(true)}>Create Class</a>
                            </li>
                            <li className="nav-item-loginAfter">
                                <a className="nav-link-special" href="/#">Help</a>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Modals */}
            <CreateClassPopup show={showSignUpModal} onHide={() => setShowSignUpModal(false)} />
        </nav>
    );
}

export default NavBar;
