import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import User from './User';
import Provider from './Provider';
import Login from './Login';

function App() {
  const [showLayout, setShowLayout] = useState(!!localStorage.getItem('adminEmail'));

  useEffect(() => {
    const checkAuth = () => {
      setShowLayout(!!localStorage.getItem('adminEmail'));
    };
    
    checkAuth();
    
    const handleStorageChange = () => {
      checkAuth();
      window.dispatchEvent(new Event('resize'));
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div className="wrapper">
        {showLayout && <Sidebar />}
        
        <div className="main-panel">
          {showLayout && (
            <div className="main-header">
              <div className="main-header-logo">
                {/* Logo Header */}
              </div>
              <Navbar setShowLayout={setShowLayout} />
            </div>
          )}

          <Routes>
            <Route path='/' element={<Login setShowLayout={setShowLayout} />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/user' element={<User />} />
            <Route path='/provider' element={<Provider />} />
          </Routes>

          {showLayout && <Footer />}
        </div>
      </div>
    </Router>
  );
}

export default App;