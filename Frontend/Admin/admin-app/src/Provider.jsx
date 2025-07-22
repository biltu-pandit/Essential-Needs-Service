import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SERVER from './Server';

const Provider = () => {
  const [provider, setProvider] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const getAllProviders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${SERVER}/provider/getAllProvider`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      const providersArray = Array.isArray(data) ? data : 
                          (data?.data && Array.isArray(data.data) ? data.data : []);
      
      setProvider(providersArray);
    } catch (error) {
      console.error("Error fetching services:", error);
      setProvider([]);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load providers',
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProviders();
  }, []);

  const deleteService = async (provider) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        setDeletingId(provider._id);
        const response = await fetch(`http://localhost:3000/provider/deleteProvider/${provider._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Provider has been deleted successfully",
            showConfirmButton: false,
            timer: 1500
          });
          await getAllProviders();
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete provider',
          confirmButtonColor: '#3085d6',
        });
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="col-lg-12 grid-margin stretch-card" style={{marginTop:"6%"}}>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title" style={{ color: "#5DADE2" }}>All Providers</h4>
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading providers...</p>
            </div>
          ) : (
            <div className="table-responsive mt-2">
              <table className="table table-striped" style={{ tableLayout: 'fixed', width: '100%' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Description</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {provider.length > 0 ? (
                    provider.map((provider) => (
                      <tr key={provider._id}>
                        <td style={{ whiteSpace: 'nowrap' }}>{provider.name}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>{provider.email}</td>
                        <td>{provider.contact}</td>
                        <td>{provider.description}</td>
                        <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                          <button 
                            className="btn btn-sm" 
                            onClick={() => deleteService(provider)} 
                            title="Delete"
                            disabled={deletingId === provider._id}
                          >
                            {deletingId === provider._id ? (
                              <span className="spinner-border spinner-border-sm text-danger" role="status">
                                <span className="visually-hidden">Deleting...</span>
                              </span>
                            ) : (
                              <i className="fa-solid fa-trash" style={{ color: "#ed0707" }}></i>
                            )}
                          </button> 
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No Provider found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Provider;