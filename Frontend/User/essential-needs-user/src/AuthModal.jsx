import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import './AuthModal.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SERVER from './Server';

const AuthModal = ({ show, onClose, initialMode = 'login', onLoginSuccess }) => {
  const [mode, setMode] = useState(initialMode);
  const [otpMode, setOtpMode] = useState(false); // New state for OTP verification
  const modalRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(""); // New state for OTP input
  const [pendingEmail, setPendingEmail] = useState(""); // Store email during OTP verification

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    if (show) {
      setMode('login');
      setOtpMode(false);
      setName("");
      setEmail("");
      setPassword("");
      setContact("");
      setAddress("");
      setCity("");
      setDistrict("");
      setShowPassword(false);
      setOtp("");
      setPendingEmail("");
    }
  }, [show]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto'; 
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [show, onClose]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signin = async () => {
    if (isLoading) return;
    
    // Validation
    if (!email || !password || !name) {
      await Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill all required fields',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    if (password.length < 8) {
      await Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'Password must be at least 8 characters',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    setIsLoading(true);
    
    const user_data = {
      email: email,
      name: name,
      password: password,
      contact: contact,
      address: address,
      city: city,
      district: district
    };
    
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user_data)
    };

    try {
      console.log('Sending registration request...');
      const response = await fetch(`${SERVER}/user/registerUser`, requestOptions);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const data = await response.json();
      console.log('Registration response:', data);

      if (data.requiresOTP) {
        setPendingEmail(email);
        setOtpMode(true);
        await Swal.fire({
          position: "center",
          icon: "info",
          title: "OTP Sent",
          text: `An OTP has been sent to ${email}. Please check your email.`,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        throw new Error("OTP not received from server");
      }
    } catch (error) {
      console.error('Registration error:', error);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Please try again.",
        showConfirmButton: false,
        timer: 1500
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (isLoading) return;
    
    if (!otp || otp.length !== 6) {
      await Swal.fire({
        icon: 'error',
        title: 'Invalid OTP',
        text: 'Please enter a valid 6-digit OTP',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    setIsLoading(true);
    
    const otp_data = {
      email: pendingEmail,
      otp: otp
    };
    
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(otp_data)
    };

    try {
      const response = await fetch(`${SERVER}/user/verifyOTP`, requestOptions);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'OTP verification failed');
      }
      
      const data = await response.json();
      console.log('OTP verification response:', data);

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration Successful!",
        text: "Your account has been created successfully.",
        showConfirmButton: false,
        timer: 1500
      });
      
      setOtpMode(false);
      setMode('login');
    } catch (error) {
      console.error('OTP verification error:', error);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Verification Failed",
        text: error.message || "Please try again.",
        showConfirmButton: false,
        timer: 1500
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email: pendingEmail })
    };

    try {
      const response = await fetch(`${SERVER}/user/resendOTP`, requestOptions);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to resend OTP');
      }
      
      const data = await response.json();
      console.log('Resend OTP response:', data);

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "OTP Resent",
        text: "A new OTP has been sent to your email.",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Resend OTP error:', error);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Resend Failed",
        text: error.message || "Please try again.",
        showConfirmButton: false,
        timer: 1500
      });
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    if (isLoading) return;
    
    if (!email || !password) {
      await Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please enter both email and password',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    setIsLoading(true);
    
    const login_data = {
      email: email,
      password: password
    };
    
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(login_data)
    };

    try {
      const response = await fetch(`${SERVER}/user/loginUser`, requestOptions);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const data = await response.json();

      if (data.length > 0) {
        await Swal.fire({
          position: "middle-center",
          icon: "success",
          title: "Login Successful!!",
          showConfirmButton: false,
          timer: 1500
        });
        
        localStorage.setItem("userid", data[0]._id);
        localStorage.setItem("email", data[0].email);
        onLoginSuccess();
        onClose();
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      await Swal.fire({
        position: "middle-center",
        icon: "error",
        title: "Login Failed",
        text: error.message || "Something went wrong..!!! Try again",
        showConfirmButton: false,
        timer: 1500
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {show && (
        <div className="modal-backdrop">
          <div ref={modalRef} className="auth-modal">
            <button className="close-btn" onClick={onClose}>
              &times;
            </button>
            
            {otpMode ? (
              <>
                <h2 className="text-center mb-4">Verify Your Email</h2>
                <div>
                  <p className="text-center mb-3">
                    We've sent a 6-digit OTP to {pendingEmail}
                  </p>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Enter OTP"
                      maxLength="6"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-primary w-100 mb-3" 
                    onClick={verifyOTP}
                  >
                    Verify OTP
                  </button>
                  <div className="text-center">
                    Didn't receive OTP?{' '}
                    <button 
                      type="button" 
                      className="btn btn-link p-0 text-primary"
                      onClick={resendOTP}
                    >
                      Resend OTP
                    </button>
                  </div>
                  <div className="text-center mt-2">
                    <button 
                      type="button" 
                      className="btn btn-link p-0 text-secondary"
                      onClick={() => {
                        setOtpMode(false);
                        setMode('signup');
                      }}
                    >
                      Back to Registration
                    </button>
                  </div>
                </div>
              </>
            ) : mode === 'login' ? (
              <>
                <h2 className="text-center mb-4">Login to Your Account</h2>
                <div>
                  <div className="mb-3">
                    <input 
                      type="email" 
                      className="form-control"
                      placeholder="Enter your email"
                      required
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 position-relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-control"
                      placeholder="Enter your password"
                      required
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y password-toggle-btn"
                      onClick={togglePasswordVisibility}
                      style={{right: "10px","marginRight":"15px"}}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="text-right mb-3">
                    <a href="#forgot-password" className="text-primary">Forgot Password?</a>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3" onClick={login}>Login</button>
                  <div className="text-center">
                    Don't have an account?{' '}
                    <button 
                      type="button" 
                      className="btn btn-link p-0 text-primary"
                      onClick={() => setMode('signup')}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-center mb-4">Create Your Account</h2>
                <div>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Name" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 position-relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-control" 
                      placeholder="Password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y password-toggle-btn"
                      onClick={togglePasswordVisibility}
                      style={{right: "10px","marginRight":"15px"}}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="mb-3">
                    <input 
                      type="tel" 
                      className="form-control" 
                      placeholder="Contact" 
                      required 
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Address" 
                      required 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="row" style={{marginBottom:"-10px"}}>
                    <div className="col-md-6 mb-3">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="City" 
                        required 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="District" 
                        required 
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 mb-3" 
                    onClick={signin}
                  >
                    Register
                  </button>
                  <div className="text-center">
                    Already have an account?{' '}
                    <button 
                      type="button" 
                      className="btn btn-link p-0 text-primary"
                      onClick={() => setMode('login')}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;