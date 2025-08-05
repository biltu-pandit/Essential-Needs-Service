import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import AuthModal from './AuthModal';
import SERVER from './Server';

const ServicePage = () => {
  const { serviceName } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState(null);

  // Fetch default services when component mounts or serviceName changes
  const fetchDefaultServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${SERVER}/services/${serviceName.toLowerCase()}`
      );
      
      if (!response.data || response.data.length === 0) {
        setError(`No ${serviceName} services found`);
      } else {
        setServices(response.data);
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load services');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultServices();
  }, [serviceName]);

  // Handle search functionality - MODIFIED TO FIX ADDRESS SEARCHING
  const handleSearch = async () => {
  try {
    setSearchError(null);
    
    if (searchTerm.trim() === "") {
      await fetchDefaultServices();
      return;
    }

    // Trim and clean the search term
    const cleanedSearchTerm = searchTerm.trim().replace(/\s+/g, ' ');
    const encodedSearchTerm = encodeURIComponent(cleanedSearchTerm);
    
    const response = await axios.get(
      `${SERVER}/services/${serviceName.toLowerCase()}/search/location/${encodedSearchTerm}`
    );
    
    if (response.data.success) {
      if (response.data.results.length === 0) {
        setSearchError(`No ${serviceName} services found in "${searchTerm}"`);
      } else {
        setSearchError(null);
      }
      setServices(response.data.results);
    }
  } catch (err) {
    console.error('Search error:', err);
    setSearchError(err.response?.data?.message || 'No services found matching the exact location. Try a more general search.');
  }
};

  // Automatically reset to default when search is cleared
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      fetchDefaultServices();
      setSearchError(null);
    }
  };

  // Handle booking click
  const handleBookClick = (providerid, serviceid) => {
    const userid = localStorage.getItem('userid');
    
    if (!userid) {
      setSelectedService({ providerid, serviceid });
      setShowAuthModal(true);
    } else {
      bookService(providerid, serviceid);
    }
  };

  // Handle successful login
  const handleLoginSuccess = () => {
    if (selectedService) {
      bookService(selectedService.providerid, selectedService.serviceid);
      setSelectedService(null);
    }
  };

  // Book service function
  const bookService = async (providerid, serviceid) => {
    const userid = localStorage.getItem('userid');
    const apply_date = new Date().toISOString().split('T')[0];  
    
    try {
      const response = await axios.post(`${SERVER}/bookedService/applyNewService`, {
        providerid,
        userid,
        serviceid,
        apply_date
      });

      if (response.data._id) {
        Swal.fire({
          position: "middle-center",
          icon: "success",
          title: "Service Booked Successfully",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.href = "/bookings";
        });
      }
    } catch (error) {
      Swal.fire({
        position: "middle-center",
        icon: "error",
        title: "Booking failed. Please try again.",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-5" style={{marginTop:"5%"}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading {serviceName} services...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          {error}
        </div>
      </div>
    );
  }

  // Capitalize first letter of service name
  const displayName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
 
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 text-primary">
        {displayName} Services
      </h1>

      {/* Search Bar - Responsive for mobile and desktop */}
<div className="d-flex mb-4 justify-content-center">
  <div className="input-group" style={{ width: '90%', maxWidth: '500px', marginTop: "-2%" }}>
    <input 
      className="form-control" 
      type="text" 
      placeholder="Search by location..." 
      value={searchTerm}
      onChange={handleSearchChange}
      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
    />
    <button 
      className="btn btn-primary"
      onClick={handleSearch}
    >
      Search
    </button>
  </div>
</div>

      {/* Search Error Message */}
      {searchError && (
        <div className="alert alert-warning text-center mb-4">
          {searchError}
        </div>
      )}

      {/* Services Grid */}
      <div className="row g-4">
        {services.map((service) => (
          <div key={service._id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                {service.providerid && (
                  <>
                    <div className="d-flex align-items-center mb-3">
                      {service.providerid.image && (
                        <img 
                          src={service.providerid.image} 
                          alt={service.providerid.name}
                          className="rounded-circle me-3"
                          width="75"
                          height="75"
                        />
                      )}
                      <div>
                        <h4 className="card-title mb-0">Provider: {service.providerid.name}</h4>
                      </div>
                    </div>
                  </>
                )}  
                
                <h5 className="card-subtitle mb-2 text-muted">
                  {service.service_name}
                </h5>
                <p className="card-text">{service.description}</p>
                
                <div className="mb-2">
                  <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                  {service.address}, {service.city}, {service.district}
                </div>
                
                <div className="mb-3">
                  <i className="fas fa-clock me-2 text-primary"></i>
                  {service.opening_time} AM - {service.closing_time} PM
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleBookClick(service.providerid._id, service._id)}
                  >
                    <i className="fas fa-calendar-check me-2"></i>
                    Book Now
                  </button>
                  {service.providerid?.contact && (
                    <a 
                      href={`tel:${service.providerid.contact}`}
                      className="btn btn-outline-secondary"
                    >
                      <i className="fas fa-phone me-2"></i>
                      Call
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default ServicePage;
