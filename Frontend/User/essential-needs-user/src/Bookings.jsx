import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaClock, FaTimesCircle, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaBookmark, FaSearch, FaPlusCircle , FaCheckDouble} from 'react-icons/fa';
import { FaTrash, FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import SERVER from './Server';

const Bookings = ({ isLoggedIn, setIsLoggedIn, fetchUserData  }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const BookedServiceDetails = async (id) => {
    setLoading(true);
    if (!id) {
      setServices([]);
      setLoading(false);
      setIsLoggedIn(false);
      return;
    }

    try {
      const response = await fetch(`${SERVER}/bookedService/getAllBookedServicesByUser/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setServices(Array.isArray(data) ? data : []);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setServices([]);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${SERVER}/bookedService/deleteService/${bookingId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          const userId = localStorage.getItem("userid");
          BookedServiceDetails(userId);
          
          Swal.fire({
            title: 'Cancelled!',
            text: 'Your booking has been cancelled.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          throw new Error('Failed to cancel booking');
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem cancelling your booking.',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("userid");
    BookedServiceDetails(id);
  }, [navigate]);

  const handleLoginSuccess = () => {
    const userId = localStorage.getItem("userid");
    BookedServiceDetails(userId);
    setIsLoggedIn(true);
    fetchUserData(userId);
    setShowAuthModal(false);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Confirmed':
        return <FaCheckCircle className="text-primary" />;
      case 'Pending':
        return <FaClock className="text-warning" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-danger" />;
      case 'Service Done':
        return <FaCheckDouble className="text-success" />;
      default:
        return <FaClock className="text-secondary" />;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5" style={{marginTop:"5%"}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading your booking...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="container py-5" style={{marginBottom:"-5%"}}>
        <div className="text-center py-5 my-5">
          <div className="empty-bookings-illustration mb-4" style={{"marginTop":"-5%"}}>
            <FaSearch className="text-muted" size={64}/>
          </div>
          <h4 className="mb-3">Please Log In</h4>
          <p className="text-muted mb-4">
            You need to be logged in to view your bookings.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button 
              onClick={() => setShowAuthModal(true)} 
              className="btn btn-primary"
            >
              Log In
            </button>
          </div>
        </div>

        <AuthModal 
          show={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
          initialMode={showAuthModal ? 'login' : 'login'}
        />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Your Bookings</h2>
      
      {services.length === 0 ? (
        <div className="text-center py-5 my-5">
          <div className="empty-bookings-illustration mb-4" style={{"marginTop":"-5%"}}>
            <FaSearch className="text-muted" size={64}/>
          </div>
          <h4 className="mb-3">No Bookings Found</h4>
          <p className="text-muted mb-4">
            You haven't booked any services yet. Explore our wide range of professional services 
            and book your first appointment today!
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/contact" className="btn btn-outline-primary">
              Need Help?
            </Link>
          </div>
          
          <div className="mt-5 pt-4 border-top" style={{"marginBottom":"-10%"}}>
            <h5 className="mb-3">Why Book With Us?</h5>
            <div className="row justify-content-center">
              <div className="col-md-4 mb-3">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="bg-light rounded-circle p-3 mb-3 mx-auto" style={{width: '60px'}}>
                      <FaCheckCircle size={24} className="text-success" />
                    </div>
                    <h6>Verified Professionals</h6>
                    <p className="small text-muted">All our service providers are background-checked and certified</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="bg-light rounded-circle p-3 mb-3 mx-auto" style={{width: '60px'}}>
                      <FaClock size={24} className="text-primary" />
                    </div>
                    <h6>Quick Service</h6>
                    <p className="small text-muted">Get same-day or next-day service for most urgent needs</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="bg-light rounded-circle p-3 mb-3 mx-auto" style={{width: '60px'}}>
                      <FaPlusCircle size={24} className="text-info" />
                    </div>
                    <h6>Easy Booking</h6>
                    <p className="small text-muted">Simple 2-step booking process with instant confirmation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {services.map((service) => (
            <div key={service._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FaBookmark className="text-primary me-2" />
                    <h5 className="mb-0">{service.serviceid?.service_name}</h5>
                  </div>
                  <div className="d-flex align-items-center">
                    {getStatusIcon(service.status)}
                    <span className="ms-2 text-capitalize">{service.status}</span>
                  </div>
                </div>
                
                <div className="card-body">
                  <h6 className="card-title text-primary">{service.providerid?.name}</h6>
                  
                  <div className="d-flex align-items-center mb-2">
                    <FaCalendarAlt className="me-2 text-secondary" />
                    <div>
                      <small className="text d-block">Booked on: {service.apply_date}</small>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items mb-2">
                    <FaMapMarkerAlt className="me-2 text-secondary mt-1" />
                    {service.userid?.address}, {service.userid?.city}, {service.userid?.district}
                  </div>
                  
                  <div className="d-flex align-items-center mb-2">
                    <FaPhone className="me-2 text-secondary" />
                    <span>{service.providerid?.contact}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaClock className="me-2 text-secondary" />
                    <span>{service.serviceid?.opening_time} AM - {service.serviceid?.closing_time} PM</span>
                  </div>

                  {service.status === 'Pending' && (
                    <button 
                      onClick={() => handleCancel(service._id)}
                      className="btn btn-sm btn-danger mt-3 w-100"
                    >
                      <FaTrash className="me-1" /> Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;