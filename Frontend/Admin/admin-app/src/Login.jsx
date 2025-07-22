import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AdminLogin.css';
import Dashboard from './Dashboard';

const Login = ({ setShowLayout }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [flag, setFlag] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('adminEmail')) {
      setFlag(1);
      setShowLayout(true);
      navigate('/dashboard');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (email === 'admin@ens.com' && password === 'admin123') {
        // Store authentication data
        localStorage.setItem('adminEmail', email);
        
        // Update states
        setFlag(1);
        setShowLayout(true);
        
        // Trigger storage event to ensure App component updates
        window.dispatchEvent(new Event('storage'));
        
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 1500
        });
        
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
      await Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.message,
        confirmButtonColor: '#3085d6',
      });
    }
  };

  if (flag === 1) {
    return <Dashboard />;
  }

  return (
    <div className="admin-login-container" style={{marginLeft:"-20%"}}>
      <div className="login-card">
        <div className="login-header">
          <h1>ENS</h1>
          <h2>Admin Dashboard</h2>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;