import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Carousel from './Carousel';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import Bookings from './Bookings';
import ServicePage from './ServicePage';
import Footer from "./Footer";
import Navbar from "./Navbar";
import LogoIntro from './LogoIntro';
import { useState, useEffect } from "react";
import Profile from "./Profile";
import SERVER from './Server'

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('userid');
  });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro === 'true') setShowIntro(false);
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`${SERVER}/user/getUserByID/${userId}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const checkAuthStatus = () => {
      const userId = localStorage.getItem('userid');
      const userEmail = localStorage.getItem('email');
      if (userId && userEmail) {
        setIsLoggedIn(true);
        fetchUserData(userId);
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  return (
    <Router>
      {showIntro && <LogoIntro onComplete={handleIntroComplete} />}
      <div>
        <Navbar 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
          userData={userData} 
          fetchUserData={fetchUserData}
        />
        
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />} />
          <Route 
            path="/bookings" 
            element={
              <Bookings 
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn} 
                fetchUserData={fetchUserData}
              />} 
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/services/:serviceName" element={<ServicePage />} />
        </Routes>

        <Footer />
        <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-0 back-to-top">
          <i className="bi bi-arrow-up"></i>
        </a>
      </div>
    </Router>
  );
}

export default App;