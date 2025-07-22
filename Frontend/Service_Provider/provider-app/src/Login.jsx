import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import Swal from 'sweetalert2'
import SERVER from './Server'
const Login = () => {
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('')

  const signin=()=>{
    window.location.href="/register"
  }

  const [flag , setFlag] = useState(0)
  useEffect(()=>{
     if(localStorage.getItem("email"))
      setFlag(1)
  },[])

  const login = async()=>{
    const login_data ={
      "email": email,
      "password": password
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(login_data)
    };
    const response = await fetch(`${SERVER}/provider/loginProvider`, requestOptions);

    const data = await response.json();

    if(data.length>0){
      Swal.fire({
          position: "middle-center",
          icon: "success",
          title: "Login Successful!!",
          text: "You have successfully logged in to your account.",
          showConfirmButton: false,
          timer: 1500
        })
        .then((result) => {
                localStorage.setItem("providerid", data[0]._id)
                localStorage.setItem("email", data[0].email)
                window.location.href = "/dashboard"
      });
    }else{
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
   {
    flag==0 ?
    <div className="container-scroller" style={{marginTop:"-8%"}}>
  <div className="container-fluid page-body-wrapper full-page-wrapper">
    <div className="row w-100 m-0">
      <div className="content-wrapper full-page-wrapper d-flex align-items-center auth ">
        <div className="card col-lg-4 mx-auto">
          <div className="card-body px-5 py-5">
            <h3 className="card-title text-left mb-3">Login</h3>
            <div>
              <div className="form-group">
                <label>email</label>
                <input type="email" className="form-control p_input" onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control p_input" onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <div className="form-group d-flex align-items-center justify-content-between">
              
                <a href="#" className="forgot-pass">Forgot password</a>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-block enter-btn" onClick={login}>Login</button>
              </div>
             
              <p className="sign-up">Don't have an Account?<a onClick={signin}> Sign Up</a></p>
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
:
<Dashboard></Dashboard>
   }

    </>
  )
}

export default Login
