import React from 'react'

const Footer = () => {
  return (
    <>
    <div className="container-fluid bg-dark text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              {/* <h4 className="text-light mb-4">Address</h4>
              <p className="mb-2"><i className="fa fa-map-marker-alt me-3" />123 Street, New York, USA</p>
              <p className="mb-2"><i className="fa fa-phone-alt me-3" />+012 345 67890</p>
              <p className="mb-2"><i className="fa fa-envelope me-3" />info@example.com</p> */}
              <div className="d-flex pt-2">
                <a className="btn btn-outline-light btn-social" href><i className="fab fa-twitter" /></a>
                <a className="btn btn-outline-light btn-social" href><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-outline-light btn-social" href><i className="fab fa-youtube" /></a>
                <a className="btn btn-outline-light btn-social" href><i className="fab fa-linkedin-in" /></a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Services</h4>
              <a className="btn btn-link" href="/services/electrician">Electrician</a>
              <a className="btn btn-link" href="/services/doctor">Doctor</a>
              <a className="btn btn-link" href="/services/plumber">Plumber</a>
              <a className="btn btn-link" href="/services/ac">AC</a>
              <a className="btn btn-link" href="/services/carpenter">Carpentry</a>
              <a className="btn btn-link" href="/services/interior designer">Interior Designing</a>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">Quick Links</h4>
              <a className="btn btn-link" href="/about">About Us</a>
              <a className="btn btn-link" href="/contact">Contact Us</a>
              <a className="btn btn-link" href="/">Our Services</a>
              <a className="btn btn-link" href>Terms &amp; Condition</a>
              <a className="btn btn-link" href>Support</a>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="logo-container flex items-center px-4">
          <img src="img/ENS-logo.jpg" height="210" width="210" alt="Logo" className="h-10 w-auto" />
            </div>
              {/* <h4 className="text-light mb-4">Newsletter</h4>
              <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
              <div className="position-relative mx-auto" style={{maxWidth: 400}}>
                <input 
                  className={`form-control border-0 w-100 py-3 ps-4 pe-5${isDarkMode ? ' bg-secondary text-light' : ''}`} 
                  type="text" 
                  placeholder="Your email" 
                />
                <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                © <a className="border-bottom" href="">ESSENTIX</a>, All Right Reserved.
              </div>
              <div className="col-md-6 text-center text-md-end">
                Designed By <a className="border-bottom" href="">Essentix Team</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
