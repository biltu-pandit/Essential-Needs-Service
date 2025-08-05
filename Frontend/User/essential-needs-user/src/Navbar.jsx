import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import AuthModal from './AuthModal';
import { FaUserCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Navbar = ({ isLoggedIn, setIsLoggedIn, userData, fetchUserData }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const collapseRef = useRef(null);

  const openLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userid');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
        setShowProfileDropdown(false);
        
        Swal.fire({
          title: 'Logged out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          willClose: () => {
            window.location.href = '/';
          }
        });
      }
    });
  };

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    if (window.innerWidth < 992) { // Bootstrap's lg breakpoint
      const bsCollapse = new window.bootstrap.Collapse(collapseRef.current, {
        toggle: false
      });
      bsCollapse.hide();
    }
    setShowProfileDropdown(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
        <a href="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
          <h2 className="m-0 text-primary d-none d-sm-block">ESSENTIAL NEEDS AND SERVICES</h2>
          <h2 className="m-0 text-primary d-block d-sm-none">E.N.S.</h2>
        </a>
        <button 
          type="button" 
          className="navbar-toggler me-4" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowProfileDropdown(false)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse" ref={collapseRef}>
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <NavLink
              to="/"
              end
              className={({ isActive }) => "nav-item nav-link" + (isActive ? " active text-primary" : "")}
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => "nav-item nav-link" + (isActive ? " active text-primary" : "")}
              onClick={closeMobileMenu}
            >
              About
            </NavLink>
            <div className="nav-item dropdown">
              <a 
                href="#" 
                className="nav-link dropdown-toggle" 
                data-bs-toggle="dropdown"
                onClick={closeMobileMenu}
              >
                Services
              </a>
              <div className="dropdown-menu fade-up m-0">
                <NavLink to="/services/electrician" className="dropdown-item" onClick={closeMobileMenu}>Electrician</NavLink>
                <NavLink to="/services/doctor" className="dropdown-item" onClick={closeMobileMenu}>Doctor</NavLink>
                <NavLink to="/services/plumber" className="dropdown-item" onClick={closeMobileMenu}>Plumber</NavLink>
                <NavLink to="/services/ac" className="dropdown-item" onClick={closeMobileMenu}>AC</NavLink>
                <NavLink to="/services/carpenter" className="dropdown-item" onClick={closeMobileMenu}>Carpenter</NavLink>
                <NavLink to="/services/interior designer" className="dropdown-item" onClick={closeMobileMenu}>Interior Designer</NavLink>
              </div>
            </div>
            <NavLink
              to="/bookings"
              className={({ isActive }) => "nav-item nav-link" + (isActive ? " active text-primary" : "")}
              onClick={closeMobileMenu}
            >
              Your Bookings
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => "nav-item nav-link" + (isActive ? " active text-primary" : "")}
              onClick={closeMobileMenu}
            >
              Contact
            </NavLink>
            
            {isLoggedIn ? (
              <div className="nav-item dropdown ms-lg-3">
                <div className="position-relative">
                  <button 
                    className="btn btn-outline-primary rounded-pill d-flex align-items-center mt-lg-3 mt-0"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    style={{ 
                      minWidth: '40px', 
                      height: '40px',
                      padding: '0 12px',
                      marginRight: "10px",
                      marginLeft: "-10px"
                    }}
                  >
                    <FaUserCircle size={20} className="me-lg-2" />
                    <span className="d-none d-lg-inline">{userData?.name.split(' ')[0] || 'Profile'}</span>
                  </button>
                  
                  {showProfileDropdown && (
                    <div 
                      className="dropdown-menu show" 
                      style={{ 
                        position: 'absolute', 
                        right: 0, 
                        left: 'auto',
                        marginTop: '10px',
                        minWidth: '200px'
                      }}
                    >
                      <div className="dropdown-header text-center">
                        <h6 className="mb-0">{userData?.name || 'User'}</h6>
                        <small className="text-muted">{userData?.email || ''}</small>
                      </div>
                      <div className="dropdown-divider"></div>
                      <NavLink 
                        to="/profile" 
                        className="dropdown-item"
                        onClick={closeMobileMenu}
                      >
                        My Profile
                      </NavLink>
                      <NavLink 
                        to="/bookings" 
                        className="dropdown-item"
                        onClick={closeMobileMenu}
                      >
                        My Bookings
                      </NavLink>
                      <div className="dropdown-divider"></div>
                      <button 
                        className="dropdown-item text-danger" 
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="nav-item ms-lg-3 d-flex align-items-center">
                <button 
                  className="btn btn-primary py-2 px-4"
                  onClick={() => {
                    closeMobileMenu();
                    openLogin();
                  }}
                  style={{
                    height: '40px',
                    whiteSpace: 'nowrap',
                    marginRight:"15px",
                    marginLeft:"-5px"
                  }}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      <AuthModal 
        show={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
        onLoginSuccess={() => {
          const userId = localStorage.getItem('userid');
          setIsLoggedIn(true);
          fetchUserData(userId);
        }}
      />
    </>
  );
};

export default Navbar;