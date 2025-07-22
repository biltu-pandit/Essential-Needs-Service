  import React, { useEffect, useState } from 'react'
  import Swal from 'sweetalert2';
  import SERVER from './Server';
  const Manage = () => {
    const [services, setServices] = useState([]);

    const getAllServices = async(id) => {
      try {
        const response = await fetch(`${SERVER}/services/getAllServiceByProvider/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        // Handle case where data might be nested or null
        const servicesArray = Array.isArray(data) ? data : 
                            (data?.data && Array.isArray(data.data) ? data.data : []);
        
        setServices(servicesArray);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      }
    }
      
    useEffect(() => {
      const id = localStorage.getItem("providerid");
      if (id) getAllServices(id);
    }, []);

    const edit=(services)=>{
      localStorage.setItem("serviceid", services._id)
      window.location.href="/edit_service"
    }

    const deleteService = async (services) => {
          Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
            }).then(async(result) => {
              if (result.isConfirmed) {
                  const response = await fetch(`${SERVER}/services/deleteService/${services._id}`, {
                      method: 'DELETE',
                  })
                  if(response.ok){
                      Swal.fire({
                          position: "middle-center",
                          icon: "success",
                          title: "Deleted Successfully",
                          showConfirmButton: false,
                          timer: 1500
                        });
                        const id= localStorage.getItem("providerid")
                      getAllServices(id)
                  }
              }      
            });
      }
      const viewBooking=(services)=>{
        localStorage.setItem("serviceid",services._id)
        window.location.href="/bookingRequestByService"
    }
    return (
       <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title" style={{color:"#5DADE2"}}>Manage Your Service</h4>
          <div className="table-responsive">
            <table className="table table-striped" style={{ tableLayout: 'fixed', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ width: '12%' }}>Service Name</th>
                  <th style={{ width: '20%' }}>Description</th>
                  <th style={{ width: '15%' }}>Address</th>
                  <th style={{ width: '10%' }}>City</th>
                  <th style={{ width: '10%' }}>District</th>
                  <th style={{ width: '10%', textAlign: 'center'}}>Timing</th>
                  <th style={{ width: '10%', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((service) => (
                    <tr key={service._id}>
                      <td style={{ verticalAlign: 'middle' }}>{service.service_name}</td>
                      <td style={{ 
                        wordWrap: 'break-word',
                        whiteSpace: 'normal',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '200px'
                      }}>
                        {service.description}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>{service.address}</td>
                      <td style={{ verticalAlign: 'middle' }}>{service.city}</td>
                      <td style={{ verticalAlign: 'middle' }}>{service.district}</td>
                      <td style={{ verticalAlign: 'middle' }}>{service.opening_time} - {service.closing_time}</td>
                      <td style={{ verticalAlign: 'middle', whiteSpace: 'nowrap', textAlign: 'center' }}>
                        <button className="btn btn-sm" onClick={() => edit(service)}>
                          <i className="fa-solid fa-pen-to-square" style={{color:"#74C0FC"}}></i>
                        </button>
                        <button className="btn btn-sm" onClick={() => deleteService(service)}>
                          <i className="fa-solid fa-trash" style={{color: "#ed0707"}}></i>
                        </button>
                        <button className="btn btn-sm" onClick={() => viewBooking(service)}>
                          <i className="fa-solid fa-eye" style={{color: "#74C0FC"}}></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">No services found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    );
  }

  export default Manage;