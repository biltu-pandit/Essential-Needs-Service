import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import './AuthModal.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SERVER from './Server'

const AuthModal = ({ show, onClose, initialMode = 'login', onLoginSuccess }) => {
  const [mode, setMode] = useState(initialMode);
  const modalRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  // Reset to login when modal is reopened
  useEffect(() => {
    if (show) {
      setMode('login');
      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");
      setContact("");
      setAddress("");
      setCity("");
      setDistrict("");
      setShowPassword(false); // Reset password visibility
    }
  }, [show]);

  // Close modal when clicking outside
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
    const user_data = {
      "email": email,
      "name": name,
      "password": password,
      "contact": contact,
      "address": address,
      "city": city,
      "district": district
    };
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user_data)
    };

    try {
      const response = await fetch(`${SERVER}/user/registerUser`, requestOptions);
      const data = await response.json();

      if (data._id) {
        // Hide modal temporarily while showing alert
        modalRef.current.style.visibility = 'hidden';
        
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Registration Successful!",
          text: "Your account has been created successfully.",
          showConfirmButton: false,
          timer: 1500,
          backdrop: 'rgba(0,0,0,0.8)',
          customClass: {
            container: 'swal2-container'
          }
        });
        
        // Restore modal visibility and switch to login
        modalRef.current.style.visibility = 'visible';
        setMode('login');
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      modalRef.current.style.visibility = 'hidden';
      
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong!",
        text: "Please try again.",
        showConfirmButton: false,
        timer: 1500,
        backdrop: 'rgba(0,0,0,0.8)',
        customClass: {
          container: 'swal2-container'
        }
      });
      
      modalRef.current.style.visibility = 'visible';
    }
  };
 const login = async()=>{
     const login_data ={
       "email": email,
       "password": password
     }
     const requestOptions = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(login_data)
     };
     const response = await fetch(`${SERVER}/user/loginUser`, requestOptions);
 
     const data = await response.json();
 
     if(data.length>0){
       Swal.fire({
           position: "middle-center",
           icon: "success",
           title: "Login Successful!!",
           text: "You have successfully logged in to your account.",
           showConfirmButton: false,
           timer: 1500
         })
         .then((result) => {
                 localStorage.setItem("userid", data[0]._id)
                 localStorage.setItem("email", data[0].email)
                 onLoginSuccess(); // Notify parent component
                 onClose(); // Close the modal
       });
     }else{
        Swal.fire({
           position: "middle-center",
           icon: "error",
           title: "Something went wrong..!!! Try again",
           showConfirmButton: false,
           timer: 1500
         });
     }
   }
  return (
    <>
      {show && (
        <div className="modal-backdrop">
          <div ref={modalRef} className="auth-modal">
            <button className="close-btn" onClick={onClose}>
              &times;
            </button>
            
            {mode === 'login' ? (
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