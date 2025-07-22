import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import SERVER from './Server';

const User = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const getAllUsers = async() => {
    try {
      setLoading(true);
      const response = await fetch(`${SERVER}/user/getAllUser`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      const usersArray = Array.isArray(data) ? data : 
                        (data?.data && Array.isArray(data.data) ? data.data : []);
      
      setUser(usersArray);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUser([]);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load users',
        confirmButtonColor: '#3085d6',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteService = async (user) => {
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
        setDeletingId(user._id);
        const response = await fetch(`${SERVER}/user/deleteUser/${user._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "User has been deleted successfully",
            showConfirmButton: false,
            timer: 1500
          });
          await getAllUsers();
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete user',
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
          <h4 className="card-title" style={{ color: "#5DADE2" }}>All Users</h4>
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading users...</p>
            </div>
          ) : (
            <div className="table-responsive mt-2">
              <table className="table table-striped" style={{ tableLayout: 'fixed', width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ width: '120px' }}>Name</th>
                    <th style={{ width: '180px' }}>Address</th>
                    <th style={{ width: '80px' }}>City</th>
                    <th style={{ width: '80px' }}>District</th>
                    <th style={{ width: '180px' }}>Email</th>
                    <th style={{ width: '100px' }}>Contact</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user.length > 0 ? (
                    user.map((user) => (
                      <tr key={user._id}>
                        <td style={{ whiteSpace: 'nowrap' }}>{user.name}</td>
                        <td>{user.address}</td>
                        <td>{user.city}</td>
                        <td>{user.district}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>{user.email}</td>
                        <td>{user.contact}</td>
                        <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                          <button 
                            className="btn btn-sm" 
                            onClick={() => deleteService(user)} 
                            title="Delete"
                            disabled={deletingId === user._id}
                          >
                            {deletingId === user._id ? (
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
                      <td colSpan="7" className="text-center">No User found</td>
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

export default User;