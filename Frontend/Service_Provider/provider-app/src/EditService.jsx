import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import SERVER from './Server'
const EditService = () => {
      const [service, setService]=useState("")
      const [service_name, setService_name]=useState("")
      const [description, setDescription]=useState("")
      const [address, setAddress]=useState("")
      const [city, setCity]=useState("")
      const [district, setDistrict]=useState("")
      const [opening_time, setOpening_time]=useState("")
      const [closing_time, setClosing_time]=useState("")
      
      const getServiceDetail = async (id) => {
          const response = await fetch(`http://localhost:3000/services/getServiceByID/${id}`)
          const data = await response.json();
          setService(data._id)
          setService_name(data.service_name)
          setDescription(data.description)
          setAddress(data.address)
          setCity(data.city)
          setDistrict(data.district)
          setOpening_time(data.opening_time)
          setClosing_time(data.closing_time)
        }
        useEffect(() =>{
          const id = localStorage.getItem("serviceid")
          getServiceDetail(id)
        },[])

       const updateService = async () => {
            const service_data={
                  "service_name":service_name,
                  "description":description,
                  "address":address,
                  "city":city,
                  "district":district,
                  "opening_time":opening_time,
                  "closing_time":closing_time
            }
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(service_data)
            };
            const response = await fetch(`${SERVER}/services/updateService/${service}`, requestOptions);
            const data = await response.json();

            if(data._id!=null){
                    Swal.fire({
                        position: "middle-center",
                        icon: "success",
                        title: "Service Updated seccessfully",
                        showConfirmButton: false,
                        timer: 1500
                      }).then((result) => {
                     window.location.href = "/manage"
                      });
                      
                    }else{
                      // alert("Something went wrong..!!! Try again")
                      Swal.fire({
                        position: "middle-center",
                        icon: "error",
                        title: "Something went wrong..!!! Try again",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
        }
      const handlecancel = ()=>{
        window.location.href="/manage"
      }
  return (
    <>
    <div className="main-panel" style={{marginTop:"-10%",marginLeft:"23%"}}>
  <div className="content-wrapper">
    <div className="page-header">
    </div>
    <div className="row">
      <div className="col-md-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title"style={{color:"#5DADE2"}}>Edit Your Service</h4>
            <div className="forms-sample">
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Service Name</label>
                <input type="text" className="form-control" id="exampleInputUsername1" placeholder="Enter your service name" onChange={(e)=>setService_name(e.target.value)} value={service_name}/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Description</label>
                <input type="text" className="form-control" id="exampleInputDescription1" placeholder="Enter your description" onChange={(e)=>setDescription(e.target.value)} value={description}/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Address</label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Your address" onChange={(e)=>setAddress(e.target.value)} value={address}/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputConfirmPassword1">City</label>
                <input type="text" className="form-control" id="exampleInputConfirmPassword1" placeholder="Enter your city" onChange={(e)=>setCity(e.target.value)} value={city}/>
              </div>  
              <div className="form-group">
                <label htmlFor="exampleInputConfirmPassword1">District</label>
                <input type="text" className="form-control" id="exampleInputConfirmPassword1" placeholder="Enter your state" onChange={(e)=>setDistrict(e.target.value)} value={district}/>
              </div>  
              <div className="form-group">
                <label htmlFor="exampleInputConfirmPassword1">Opening Time</label>
                <input type="time" className="form-control" id="exampleInputConfirmPassword1" placeholder="Enter your opening time" onChange={(e)=>setOpening_time(e.target.value)} value={opening_time}/>
              </div>  
              <div className="form-group">
                <label htmlFor="exampleInputConfirmPassword1">Closing Time</label>
                <input type="time" className="form-control" id="exampleInputConfirmPassword1" placeholder="Enter your closing time" onChange={(e)=>setClosing_time(e.target.value)} value={closing_time}/>
              </div>  
              <button type="submit" className="btn btn-primary mr-2" onClick={updateService}>Edit</button>
              <button className="btn btn-dark" onClick={handlecancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div></div></div>
    </>
  )
}

export default EditService
