import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdExit, IoIosPaper } from 'react-icons/io';
import { IoListCircleSharp } from 'react-icons/io5';
import { MdManageAccounts, MdSupervisorAccount } from 'react-icons/md';
import { FaTruckPlane } from 'react-icons/fa6';
import { BsDatabaseFillAdd, BsTrash3 } from 'react-icons/bs';
import logoImg from '../assets/Logo.png';
import { logout, reset } from '../redux/auth/authSlice';
import '../css/custom.css';

function Sidebar() {
  const navigate = useNavigate();
  const storedValue = localStorage.getItem('activeNavLink');
  const initialActiveNavLink = storedValue;
  const [activeNavLink, setActiveNavLink] = useState(initialActiveNavLink);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNavLinkClick = (navLink) => {
    setActiveNavLink(navLink);
    localStorage.setItem('activeNavLink', navLink);
    navigate(`/${navLink}`);
    handleClose();
  };

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const localUser = JSON.parse(localStorage.getItem('user'));
  const userRole = localUser && localUser.user && localUser.user.role;

  useEffect(() => {
    localStorage.removeItem('activeNavLink');
  }, []);

  return (
    <>
      <section className="desktop-navlinks">
        <Navbar expand="lg" className="text-start nav-body d-flex flex-column">
          <Container className="d-flex flex-column">
            <Nav className="me-auto d-flex flex-column ">
              <Navbar.Brand href="/">
                <img
                  src={logoImg}
                  alt="MVRVA Transport Logo"
                  className="logo-img"
                />
              </Navbar.Brand>
              {(!userRole) && (
                <>
                  <Nav.Link
                    onClick={() => handleNavLinkClick('register')}
                    className={activeNavLink === 'register' ? 'active' : ''}
                  >
                    <span className="navlink-text">
                      <MdManageAccounts className="register-icon" />
                      {' '}
                      Register
                    </span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => handleNavLinkClick('login')}
                    className={activeNavLink === 'login' ? 'active' : ''}
                  >
                    <span className="navlink-text">
                      <MdSupervisorAccount className="login-icon" />
                      {' '}
                      Login
                    </span>
                  </Nav.Link>
                </>
              )}
              <Nav.Link
                onClick={() => handleNavLinkClick('services')}
                className={activeNavLink === 'services' ? 'active' : ''}
              >
                <span className="navlink-text">
                  <FaTruckPlane className="services-icon" />
                  {' '}
                  Services
                </span>
              </Nav.Link>
              {(userRole === 'user' || userRole === 'admin') && (
                <>
                  <Nav.Link
                    onClick={() => handleNavLinkClick('reserve-form')}
                    className={activeNavLink === 'reserve-form' ? 'active' : ''}
                  >
                    <span className="navlink-text">
                      <IoIosPaper />
                      {' '}
                      Reserve Form
                    </span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => handleNavLinkClick('my-reservations')}
                    className={activeNavLink === 'my-reservations' ? 'active' : ''}
                  >
                    <span className="navlink-text">
                      <IoListCircleSharp />
                      {' '}
                      My Reservations
                    </span>
                  </Nav.Link>
                </>
              )}
              {userRole === 'admin' && (
                <>
                  <Nav.Link
                    onClick={() => handleNavLinkClick('add-reservation')}
                    className={activeNavLink === 'add-reservation' ? 'active' : ''}
                  >
                    <span className="navlink-text">
                      <BsDatabaseFillAdd />
                      {' '}
                      Add Services
                    </span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => handleNavLinkClick('delete-reservation')}
                    className={activeNavLink === 'delete-reservation' ? 'active' : ''}
                  >
                    <span className="navlink-text">
                      <BsTrash3 />
                      {' '}
                      Delete Services
                    </span>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Container>
          <Container className="mt-1 py-3 sc-container d-flex flex-column">
            {(userRole === 'user' || userRole === 'admin') && (

            <>
              <IoMdExit className="logout-icon" onClick={onLogout} />
              <span>EXIT</span>
            </>

            )}
            <em className="mb-1" style={{ fontSize: '1em' }}>{localUser && `Logged-in user: ${localUser.user.name}`}</em>
            <div className="text-center icons">
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
            <div className="text-center mt-4 copy-right-text">
              © 2024 MVRVA Transport.
              <br />
              All rights reserved.
            </div>
          </Container>
        </Navbar>
      </section>
      <div className="sidebar">
        <GiHamburgerMenu className="burger-mobile" onClick={handleShow} />
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Navbar.Brand
                onClick={() => handleNavLinkClick('')}
              >
                <img
                  src={logoImg}
                  alt="MVRVA Transport Logo"
                  className="logo-img"
                />
              </Navbar.Brand>
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="me-auto d-flex flex-column">
              {(!userRole) && (
                <>
                  <Nav.Link
                    onClick={() => handleNavLinkClick('register')}
                    className={activeNavLink === 'register' ? 'active' : ''}
                  >
                    <span className="navlink-text">
                      <MdManageAccounts className="register-icon" />
                      {' '}
                      Register
                    </span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => handleNavLinkClick('login')}
                    className={activeNavLink === 'login' ? 'active' : ''}
                  >
                    <span className="navlink-text">
                      <MdSupervisorAccount className="login-icon" />
                      {' '}
                      Login
                    </span>
                  </Nav.Link>
                </>
              )}
              <Nav.Link
                onClick={() => {
                  handleNavLinkClick('services');
                }}
                className={activeNavLink === 'services' ? 'active' : ''}
              >
                <span className="navlink-text">
                  <FaTruckPlane className="services-icon" />
                  {' '}
                  Services
                </span>
              </Nav.Link>
              {(userRole === 'user' || userRole === 'admin') && (
                <>
                  <Nav.Link
                    onClick={() => {
                      handleNavLinkClick('reserve-form');
                    }}
                    className={activeNavLink === 'reserve-form' ? 'active' : ''}
                  >
                    <span className="navlink-text">
                      <IoIosPaper />
                      {' '}
                      Reserve Form
                    </span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      handleNavLinkClick('my-reservations');
                    }}
                    className={activeNavLink === 'my-reservations' ? 'active' : ''}
                  >
                    <span className="navlink-text">
                      <IoListCircleSharp />
                      {' '}
                      My Reservations
                    </span>
                  </Nav.Link>
                </>
              )}
              {userRole === 'admin' && (
                <>
                  <Nav.Link
                    onClick={() => {
                      handleNavLinkClick('add-service');
                    }}
                    className={activeNavLink === 'add-service' ? 'active' : ''}
                  >
                    <span className="navlink-text">
                      <BsDatabaseFillAdd />
                      {' '}
                      Add Services
                    </span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      handleNavLinkClick('delete-service');
                    }}
                    className={activeNavLink === 'delete-service' ? 'active' : ''}
                  >
                    <span className="navlink-text">
                      <BsTrash3 />
                      {' '}
                      Delete Services
                    </span>
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Container className="mt-4 py-3 sc-container d-flex flex-column">
              {(userRole === 'user' || userRole === 'admin') && (

              <>
                <IoMdExit className="logout-icon" onClick={onLogout} />
                <span>EXIT</span>
              </>

              )}
              <em className="mb-1" style={{ fontSize: '1em' }}>{localUser && `Logged-in user: ${localUser.user.name}`}</em>
              <div className="text-center icons">
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
              <div className="text-center mt-4 copy-right-text">
                © 2024 MVRVA Transport.
                <br />
                All rights reserved.
              </div>
            </Container>

          </Offcanvas.Body>
        </Offcanvas>

      </div>
    </>
  );
}

export default Sidebar;
