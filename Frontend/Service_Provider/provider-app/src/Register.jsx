import React, { useState } from 'react'
import Swal from 'sweetalert2'
import SERVER from './Server'
const Register = () => {
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[description,setDescription]=useState("")
  const[contact,setContact]=useState("")

  const login=()=>{
    window.location.href="/"
  }
  const signin = async () => {
    const provider_data = {
      "email": email,
      "name": name,
      "password": password,
      "contact": contact,
      "description": description
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(provider_data)
    };
    const response = await fetch(`${SERVER}/provider/registerProvider`, requestOptions);

    const data = await response.json();

    if(data._id!=null){
        // alert("Registration seccessfull")
        Swal.fire({
          position: "middle-center",
          icon: "success",
          title: "Registration Successful!!",
          text: "Your account has been created successfully.",
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
       window.location.href = "/"
        });
    }
    else{
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
    <div className="container-scroller" style={{marginTop:"-7%"}}>
  <div className="container-fluid page-body-wrapper full-page-wrapper">
    <div className="row w-100 m-0">
      <div className="content-wrapper full-page-wrapper d-flex align-items-center auth ">
        <div className="card col-lg-6 mx-auto">
          <div className="card-body px-5 py-5">
            <h3 className="card-title text-left mb-3">Provider Register</h3>
            <div>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control p_input" onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control p_input" onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control p_input" onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input type="text" className="form-control p_input" onChange={(e)=>setContact(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type="text" className="form-control p_input" onChange={(e)=>setDescription(e.target.value)}/>
              </div>
              <div className="form-group d-flex align-items-center justify-content-between">
                
                <a href="#" className="forgot-pass">Forgot password</a>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-block enter-btn"onClick={signin}>Register</button>
              </div>
              
              <p className="sign-up text-center">Already have an Account?<a onClick={login}> Login</a></p>
              
            </div>
          </div>
        </div>
      </div>
      {/* content-wrapper ends */}
    </div>
    {/* row ends */}
  </div>
  {/* page-body-wrapper ends */}
</div>

    </>
  )
}

export default Register
