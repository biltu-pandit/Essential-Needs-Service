import React from 'react'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import "./profile.css"
import SERVER from './Server'

const Profile = () => {
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")

    const getUserProfile = async (id) => {
      const response = await fetch(`${SERVER}/user/getUserByID/${id}`)
      const data = await response.json();
      setUser(data._id)
      setEmail(data.email)
      setName(data.name)
      setContact(data.contact)
      setAddress(data.address)
      setCity(data.city)
      setDistrict(data.district)
    }
    
    useEffect(() => {
      const id = localStorage.getItem("userid")
      getUserProfile(id)
    }, []) 

    const userUpdate = async () => {
      const user_data = {
        "email": email,
        "name": name,
        "contact": contact,
        "address": address,
        "city": city,
        "district": district
      }
      
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user_data)
      };
      
      const response = await fetch(`${SERVER}/user/updateUser/${user}`, requestOptions);
      const data = await response.json();

      if(data._id != null) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Profile Updated successfully",
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            window.location.href = "/profile"
          });
      } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Something went wrong. Please try again",
            showConfirmButton: false,
            timer: 1500
          });
      }
    }

  return (
    <div className="profile-container">       
        <main className="profile-content">
          <div className="profile-card">
            <div className="profile-header">
              <h2>{name || "User Name"}</h2>
              <p>User Account</p>
            </div>
            
            <div className="profile-details">
              <div className="detail-item">
                <label>Full Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
              </div>
              
              <div className="detail-item">
                <label>Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
              
              <div className="detail-item">
                <label>Contact Number</label>
                <input type="tel" value={contact} onChange={(e)=>setContact(e.target.value)}/>
              </div>
              
              <div className="detail-item">
                <label>Address</label>
                <textarea rows={3} value={address} onChange={(e)=>setAddress(e.target.value)}/>
              </div>
              
              <div className="detail-row">
                <div className="detail-item">
                  <label>City</label>
                  <input type="text" value={city} onChange={(e)=>setCity(e.target.value)}/>
                </div>
                
                <div className="detail-item">
                  <label>District</label>
                  <input type="text" value={district} onChange={(e)=>setDistrict(e.target.value)}/>
                </div>
              </div>
              
              <button className="update-btn" onClick={userUpdate}>Update Profile</button>
            </div>
          </div>
        </main>
      </div>
  )
}

export default Profile