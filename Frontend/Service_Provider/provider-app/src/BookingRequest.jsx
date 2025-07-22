import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import styles from './BookingRequest.module.css';
import SERVER from './Server';

const BookingRequest = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  const getAllServices = async (id) => {
    try {
      setError(null);
      const response = await fetch(`${SERVER}/bookedService/getAllBookedServicesByProvider/${id}`);

      if (response.status === 404) {
        setServices([]);
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to load bookings`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }

      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError(error.message);
      setServices([]);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("providerid");
    if (id) {
      getAllServices(id);
    } else {
      setError('Please login to view bookings');
    }
  }, []);

  const handleConfirm = async (bookingId) => {
    try {
      const confirmation = await Swal.fire({
        title: '<div style="margin-bottom: 0.5em;">Confirm Booking</div>',
        html: '<div style="text-align: center; margin-top: 0.5em;">Are you sure you want to confirm this booking?</div>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, confirm!',
        cancelButtonText: 'Cancel'
      });

      if (!confirmation.isConfirmed) return;

      Swal.fire({
        title: 'Processing...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await fetch(`${SERVER}/bookedService/updateStatusForConfirm/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Confirmed' })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to confirm booking');
      }

      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: '<div style="margin-bottom: 0.5em;">Booking Confirmed!</div>',
        html: '<div style="text-align: center; margin-top: 0.5em;">The booking has been confirmed successfully.</div>',
        showConfirmButton: false,
        timer: 1500
      });

      const providerId = localStorage.getItem("providerid");
      getAllServices(providerId);

    } catch (error) {
      console.error('Error confirming booking:', error);
      Swal.fire({
        icon: 'error',
        title: '<div style="margin-bottom: 0.5em;">Confirmation Failed</div>',
        html: `<div style="text-align: center; margin-top: 0.5em;">${error.message || 'Failed to confirm booking'}</div>`,
        confirmButtonColor: '#dc3545'
      });
    }
  };

  const handleServiceDone = async (bookingId) => {
    try {
      const confirmation = await Swal.fire({
        title: '<div style="margin-bottom: 0.5em;">Service Completed</div>',
        html: '<div style="text-align: center; margin-top: 0.5em;">Mark this service as completed?</div>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, completed!',
        cancelButtonText: 'Cancel'
      });

      if (!confirmation.isConfirmed) return;

      Swal.fire({
        title: 'Processing...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await fetch(`${SERVER}/bookedService/updateStatusForServiceDone/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Service Done' })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to mark service as done');
      }

      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: '<div style="margin-bottom: 0.5em;">Service Completed!</div>',
        html: '<div style="text-align: center; margin-top: 0.5em;">The service has been marked as completed.</div>',
        showConfirmButton: false,
        timer: 1500
      });

      const providerId = localStorage.getItem("providerid");
      getAllServices(providerId);

    } catch (error) {
      console.error('Error marking service as done:', error);
      Swal.fire({
        icon: 'error',
        title: '<div style="margin-bottom: 0.5em;">Operation Failed</div>',
        html: `<div style="text-align: center; margin-top: 0.5em;">${error.message || 'Failed to mark service as done'}</div>`,
        confirmButtonColor: '#dc3545'
      });
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      const confirmation = await Swal.fire({
        title: '<div style="margin-bottom: 0.5em;">Cancel Booking</div>',
        html: '<div style="text-align: center; margin-top: 0.5em;">Are you sure you want to cancel this booking?</div>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, cancel!',
        cancelButtonText: 'No, keep it'
      });

      if (!confirmation.isConfirmed) return;

      Swal.fire({
        title: 'Processing...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await fetch(`${SERVER}/bookedService/updateStatusForCancel/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Cancelled' })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to cancel booking');
      }

      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: '<div style="margin-bottom: 0.5em;">Booking Cancelled!</div>',
        html: '<div style="text-align: center; margin-top: 0.5em;">The booking has been cancelled successfully.</div>',
        showConfirmButton: false,
        timer: 1500
      });

      const providerId = localStorage.getItem("providerid");
      getAllServices(providerId);

    } catch (error) {
      console.error('Error cancelling booking:', error);
      Swal.fire({
        icon: 'error',
        title: '<div style="margin-bottom: 0.5em;">Cancellation Failed</div>',
        html: `<div style="text-align: center; margin-top: 0.5em;">${error.message || 'Failed to cancel booking'}</div>`,
        confirmButtonColor: '#dc3545'
      });
    }
  };

  if (error) {
    return (
      <div className="alert alert-warning mt-3">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
        <button 
          className="btn btn-sm btn-outline-primary ms-3"
          onClick={() => {
            const id = localStorage.getItem("providerid");
            getAllServices(id);
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Booking Requests</h4>
              
              {services.length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-3">
                    <i className="bi bi-calendar-x" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                  </div>
                  <h5 className="text-muted">No booking requests yet</h5>
                  <p className="text-muted">You don't have any booking requests at the moment.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className={`table table-hover ${styles.tableHover}`}>
                    <thead>
                      <tr>
                        <th >Customer</th>
                        <th >Service</th>
                        <th>Address</th> 
                        <th>Date</th>
                        <th>Phone No.</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...services].reverse().map((booking) => (
                        <tr key={booking._id}>
                          <td>{booking.userid?.name || 'N/A'}</td>
                          <td>{booking.serviceid?.service_name || booking.serviceid?.name || 'N/A'}</td>
                          <td>
                            {booking.userid ? 
                              `${booking.userid.address || ''}, ${booking.userid.city || ''}, ${booking.userid.district || ''}` : 
                              'N/A'
                            }
                          </td>
                          <td>{booking.apply_date || 'N/A'}</td>
                          <td>{booking.userid?.contact || 'N/A'}</td>
                          <td>
                            <span className={`badge text-white ${
                              booking.status === 'Pending' ? 'bg-warning' : 
                              booking.status === 'Confirmed' ? 'bg-primary' : 
                              booking.status === 'Service Done' ? 'bg-success' :
                              booking.status === 'Cancelled' ? 'bg-danger' : 
                              'bg-secondary'
                            }`}>
                              {booking.status || 'Unknown'}
                            </span>
                          </td>
                          <td>
                            {booking.status === 'Pending' && (
                              <>
                                <button 
                                  onClick={() => handleConfirm(booking._id)}
                                  className="btn btn-sm btn-success me-2"
                                >
                                  Confirm
                                </button>
                                <button 
                                  onClick={() => handleCancel(booking._id)}
                                  className="btn btn-sm btn-danger ml-1"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {booking.status === 'Confirmed' && (
                              <>
                                <button 
                                  onClick={() => handleServiceDone(booking._id)}
                                  className="btn btn-sm btn-success me-2"
                                >
                                  Service Done
                                </button>
                                <button 
                                  onClick={() => handleCancel(booking._id)}
                                  className="btn btn-sm btn-danger ml-1"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingRequest;