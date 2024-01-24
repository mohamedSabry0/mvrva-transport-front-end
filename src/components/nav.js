import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import logoImg from '../assets/Logo.png';
import '../css/custom.css';

function BasicExample() {
  // Initialize activeNavLink based on localStorage or default to 'services'
  const storedValue = localStorage.getItem('activeNavLink');
  const initialActiveNavLink = storedValue;
  const [activeNavLink, setActiveNavLink] = useState(initialActiveNavLink);

  // Function to handle NavLink click and update active state and localStorage
  const handleNavLinkClick = (navLink) => {
    setActiveNavLink(navLink);
    localStorage.setItem('activeNavLink', navLink);
  };

  // Clear localStorage when the component is unmounted
  useEffect(() => () => {
    localStorage.removeItem('activeNavLink');
  }, []);

  return (
    <>
      {/* Navbar Component */}
      <Navbar expand="lg" className="text-start nav-body">
        <Navbar.Brand
          href="/dashboard"
        >
          <img
            src={logoImg} // Replace with the actual path to your logo image
            alt="MVRVA Transport Logo"
            className="logo-img"
          />
        </Navbar.Brand>
        <Container className="d-flex flex-column">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex flex-column">
              <Nav.Link
                href="/api/v1/services"
                onClick={() => handleNavLinkClick('services')}
                className={activeNavLink === 'services' ? 'active' : ''}
              >
                <span className="navlink-text">
                  Services
                </span>
              </Nav.Link>
              <Nav.Link
                href="/reserve-form"
                onClick={() => handleNavLinkClick('reserve-form')}
                className={activeNavLink === 'reserve-form' ? 'active' : ''}
              >
                <span className="navlink-text">
                  Reserve Form
                </span>
              </Nav.Link>
              <Nav.Link
                href="/my-reservations"
                onClick={() => handleNavLinkClick('my-reservations')}
                className={activeNavLink === 'my-reservations' ? 'active' : ''}
              >
                <span className="navlink-text">
                  My Reservations
                </span>
              </Nav.Link>
              <Nav.Link
                href="/add-reservation"
                onClick={() => handleNavLinkClick('add-reservation')}
                className={activeNavLink === 'add-reservation' ? 'active' : ''}
              >
                <span className="navlink-text">
                  Add Reservation
                </span>
              </Nav.Link>
              <Nav.Link
                href="/register"
                onClick={() => handleNavLinkClick('register')}
                className={activeNavLink === 'register' ? 'active' : ''}
              >
                <span className="navlink-text">
                  register
                </span>
              </Nav.Link>
              <Nav.Link
                href="/login"
                onClick={() => handleNavLinkClick('login')}
                className={activeNavLink === 'login' ? 'active' : ''}
              >
                <span className="navlink-text">
                  Login
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Container className="mt-4 py-3 sc-container d-flex flex-column">
          <div className="text-center">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Visit Twitter profile"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Visit Facebook profile"
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Visit GitHub profile"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>

          </div>
          <div className="text-center mt-2 copy-right-text">
            © 2024 MVRVA Transport.
            <br />
            All rights reserved.
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default BasicExample;
