import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import SERVER from './Server'

const Contact = () => {
      const [name, setName]= useState("")
      const [email, setEmail]= useState("")
      const [subject, setSubject]= useState("")
      const [message, setMessage]= useState("")

      const sendContact= async()=>{
            const send_data={
                  "name":name,
                  "email":email,
                  "subject":subject,
                  "message":message
            }
            const requestOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(send_data)
                  };
                  const response = await fetch(`${SERVER}/contact/sendContact`, requestOptions);
                  const data = await response.json();

                  if(data._id !=null){
                  // alert("Registration seccessfull")
                  Swal.fire({
                  position: "middle-center",
                  icon: "success",
                  title: "Message submitted seccessfully",
                  showConfirmButton: false,
                  timer: 1500
                  }).then((result) => {
                  window.location.href = "/contact"
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
      <div>
  {/* Page Header Start */}
  {/* <div className="container-fluid page-header py-5 mb-5">
    <div className="container py-5">
      <h1 className="display-3 text-white mb-3 animated slideInDown">Contact</h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a className="text-white" href="#">Home</a></li>
          <li className="breadcrumb-item"><a className="text-white" href="#">Pages</a></li>
          <li className="breadcrumb-item text-white active" aria-current="page">Contact</li>
        </ol>
      </nav>
    </div>
  </div> */}
  {/* Page Header End */}
  {/* Contact Start */}
  <div className="container-fluid bg-light overflow-hidden px-lg-0" >{/* style={{margin: '6rem 0'}} */}
    <div className="container contact px-lg-0">
      <div className="row g-0 mx-lg-0">
        <div className="col-lg-6 contact-text py-5 wow fadeIn" data-wow-delay="0.5s">
          <div className="p-lg-5 ps-lg-0">
            <div className="section-title text-start">
              <h1 className="display-5 mb-4">Contact Us</h1>
            </div>
            <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done.</p>
            <div>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="text" className="form-control" id="name" placeholder="Your Name" onChange={(e)=>setName(e.target.value)}/>
                    <label htmlFor="name">Your Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input type="email" className="form-control" id="email" placeholder="Your Email" onChange={(e)=>setEmail(e.target.value)}/>
                    <label htmlFor="email">Your Email</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <input type="text" className="form-control" id="subject" placeholder="Subject" onChange={(e)=>setSubject(e.target.value)}/>
                    <label htmlFor="subject">Subject</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <textarea className="form-control" placeholder="Leave a message here" id="message" style={{height: 100}} defaultValue={""} onChange={(e)=>setMessage(e.target.value)}/>
                    <label htmlFor="message">Message</label>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary w-100 py-3" type="submit" onClick={sendContact}>Send Message</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 pe-lg-0" style={{minHeight: 400}}>
          <div className="position-relative h-100">
            <iframe
  className="position-absolute w-100 h-100"
  style={{ objectFit: 'cover' }}
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.329534989499!2d88.43103627417612!3d22.58102993115027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277ae0d5e4d89%3A0x84e49b39a553e865!2sSector%20V%2C%20Salt%20Lake%20City%2C%20Kolkata%2C%20West%20Bengal%20700091!5e0!3m2!1sen!2sin!4v1716546312785!5m2!1sen!2sin"
  frameBorder={0}
  allowFullScreen
  aria-hidden="false"
  tabIndex={0}
/>

          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Contact End */}
</div>
    </>
  )
}

export default Contact
