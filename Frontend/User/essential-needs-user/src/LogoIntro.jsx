import { useEffect } from 'react';
import './LogoIntro.css';
import logoImage from './assets/ENS-logo.jpg'; // Clean file name, stored in src/assets/

const LogoIntro = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="logo-intro-container">
      <div className="logo-animation">
        <img 
          src={logoImage} 
          alt="Essential Needs and Services" 
          className="logo-image" 
        />
      </div>
    </div>
  );
};

export default LogoIntro;