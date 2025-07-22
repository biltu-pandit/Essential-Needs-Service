import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = ({ setShowLayout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
      allowOutsideClick: false
    });

    if (result.isConfirmed) {
      // Show logout success message first
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Logged out successfully!',
        showConfirmButton: false,
        timer: 1500
      });

      // Only hide layout and navigate AFTER SweetAlert completes
      setShowLayout(false);
      localStorage.removeItem('adminEmail');
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    }
  };

  return (
    <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
      <div className="container-fluid d-flex justify-content-end">
        <button 
          onClick={handleLogout}
          className="btn btn-danger"
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            fontWeight: '500'
          }}
        >
          <i className="fas fa-sign-out-alt me-2"></i>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;