import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import "./Profile.css"
import { useState } from 'react'
import { useEffect } from 'react'
import SERVER from './Server'
const Profile = () => {
    const [provider, setProvider] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [imageid, setImageid] = useState("")

    const getCompanyProfile = async (id) => {
      const response = await fetch(`${SERVER}/provider/getProviderByID/${id}`)
      const data = await response.json();
      setProvider(data._id)
      setEmail(data.email)
      setName(data.name)
      setContact(data.contact)
      setDescription(data.description)
      setImage(data.image)
    }
    useEffect(() =>{
      const id = localStorage.getItem("providerid")
      getCompanyProfile(id)
    },[]) 
    const providerUpdate = async () => {
      const provider_data ={
        "email": email,
        "name": name,
        "contact": contact,
        "description": description
        
      }
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(provider_data)
      };
      const response = await fetch(`${SERVER}/provider/updateProvider/${provider}`, requestOptions);
      const data = await response.json();

      if(data._id!=null){
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Provider Profile Updated seccessfully",
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
         window.location.href = "/profile"
          });
          
        }else{
          // alert("Something went wrong..!!! Try again")
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something went wrong..!!! Try again",
            showConfirmButton: false,
            timer: 1500
          });
    }
  }
   const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'serviceproviderpreset'); // Replace 'your_upload_preset' with your actual upload preset

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dusfca515/image/upload',
        formData
      );

      console.log("44 response: ", res.data)

      setImage(res.data.secure_url);
      setImage(res.data.public_id);

      updateProviderProfile(res.data.secure_url, res.data.public_id)

    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  }
  const updateProviderProfile = async (x,y) => {
    const provider_data ={
      "image": x,
      "imageid": y,
      
    }
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(provider_data)
    };
    const response = await fetch(`${SERVER}/provider/updateProvider/${provider}`, requestOptions);
    const data = await response.json();

    if(data._id!=null){
      Swal.fire({
          position: "middle-center",
          icon: "success",
          title: "Provider Profile Image Updated seccessfully",
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
       window.location.href = "/profile"
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
  return (
    <>
   <div className="container py-5"style={{marginTop:"3%"}}>
  <div className="row">
    <div className="col-lg-4">
      <div className="card profile-card mb-4">
        <div className="card-body text-center">
          <img src={image} alt="Provider Image" className="rounded-circle img-fluid profile-image mb-3" id="profileImage" />
          <div className="mb-3">
            <input type="file" id="imageUpload" accept="image/*" className="d-none" onChange={handleImageUpload} />
            <label htmlFor="imageUpload" className="btn btn-outline-primary">Choose Profile Image</label>
          </div>
          <h3 className="mb-2">{name}</h3>
          <p className="text-muted mb-1">Service Provider</p>
        </div>
      </div>
    </div>
    <div className="col-lg-8">
      <div className="card mb-4">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-sm-3">
              <h6 className="mb-0">Full Name</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input type="text" className="form-control" defaultValue="Provider Name" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-sm-3">
              <h6 className="mb-0">Email</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input type="email" className="form-control" defaultValue="provider@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-sm-3">
              <h6 className="mb-0">Contact Number</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input type="tel" className="form-control" defaultValue="+1 234 567 890" value={contact} onChange={(e)=>setContact(e.target.value)}/>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-sm-3">
              <h6 className="mb-0">About</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <textarea className="form-control" rows={4} defaultValue={"This is a detailed description about the service provider. It includes information about their expertise, experience, and the services they offer. The provider is committed to delivering high-quality services to all clients."} value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-9 offset-sm-3">
              <button className="btn btn-primary" onClick={providerUpdate}>Update Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Profile
