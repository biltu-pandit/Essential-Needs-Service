import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import Carousel from './Carousel'
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <>
      <div>
  {/* Carousel Start */}
    {/* <center><h4>This is Home Page</h4></center> */}
<div>
  {/* Carousel Start */}
  <Carousel></Carousel>
  {/* Carousel End */}
  {/* Feature Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5">
        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center justify-content-center bg-light" style={{width: 60, height: 60}}>
              <i className="fa fa-user-check fa-2x text-primary" />
            </div>
            <h1 className="display-1 text-light mb-0">01</h1>
          </div>
          <h5>Best Employees</h5>
        </div>
        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center justify-content-center bg-light" style={{width: 60, height: 60}}>
              <i className="fa fa-check fa-2x text-primary" />
            </div>
            <h1 className="display-1 text-light mb-0">02</h1>
          </div>
          <h5>Best Services</h5>
        </div>
        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center justify-content-center bg-light" style={{width: 60, height: 60}}>
              <i className="fa fa-drafting-compass fa-2x text-primary" />
            </div>
            <h1 className="display-1 text-light mb-0">03</h1>
          </div>
          <h5>Free Consultation</h5>
        </div>
        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center justify-content-center bg-light" style={{width: 60, height: 60}}>
              <i className="fa fa-headphones fa-2x text-primary" />
            </div>
            <h1 className="display-1 text-light mb-0">04</h1>
          </div>
          <h5>Customer Support</h5>
        </div>
      </div>
    </div>
  </div>
  {/* Feature Start */}
  {/* About Start */}
  {/* <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
    <div className="container about px-lg-0">
      <div className="row g-0 mx-lg-0">
        <div className="col-lg-6 ps-lg-0" style={{minHeight: 400}}>
          <div className="position-relative h-100">
            <img className="position-absolute img-fluid w-100 h-100" src="img/about.jpg" style={{objectFit: 'cover'}} alt />
          </div>
        </div>
        <div className="col-lg-6 about-text py-5 wow fadeIn" data-wow-delay="0.5s">
          <div className="p-lg-5 pe-lg-0">
            <div className="section-title text-start">
              <h1 className="display-5 mb-4">About Us</h1>
            </div>
            <p className="mb-4 pb-2">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo erat amet</p>
            <div className="row g-4 mb-4 pb-2">
              <div className="col-sm-6 wow fadeIn" data-wow-delay="0.1s">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{width: 60, height: 60}}>
                    <i className="fa fa-users fa-2x text-primary" />
                  </div>
                  <div className="ms-3">
                    <h2 className="text-primary mb-1" data-toggle="counter-up">1234</h2>
                    <p className="fw-medium mb-0">Happy Clients</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{width: 60, height: 60}}>
                    <i className="fa fa-check fa-2x text-primary" />
                  </div>
                  <div className="ms-3">
                    <h2 className="text-primary mb-1" data-toggle="counter-up">1234</h2>
                    <p className="fw-medium mb-0">Projects Done</p>
                  </div>
                </div>
              </div>
            </div>
            <a href className="btn btn-primary py-3 px-5">Explore More</a>
          </div>
        </div>
      </div>
    </div>
  </div> */}
  {/* About End */}
  {/* Service Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="section-title text-center">
        <h1 className="display-5 mb-5">Our Services</h1>
      </div>
      <div className="row g-4">
        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
          <div className="service-item">
            <div className="overflow-hidden">
              <img className="img-fluid" src="img/electrician.jpg" alt />
            </div>
            <div className="p-4 text-center border border-5 border-light border-top-0">
              <h4 className="mb-3">Electrician</h4>
              <p>Get the well trained electricians according to your needs.</p>
              <Link to="/services/electrician" className="fw-medium">Book Now<i className="fa fa-arrow-right ms-2" /></Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
          <div className="service-item">
            <div className="overflow-hidden">
              <img className="img-fluid" src="img/doctor.jpg" alt />
            </div>
            <div className="p-4 text-center border border-5 border-light border-top-0">
              <h4 className="mb-3">Doctor</h4>
              <p>Get the best doctors from your surroundings for trusted health care.</p>
              
              <Link to="/services/doctor" className="fw-medium" >Book Now<i className="fa fa-arrow-right ms-2" /></Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
          <div className="service-item">
            <div className="overflow-hidden">
              <img className="img-fluid" src="img/plumber.jpg" alt />
            </div>
            <div className="p-4 text-center border border-5 border-light border-top-0">
              <h4 className="mb-3">Plumber</h4>
              <p>Get the best plumbing services from wel trained plumbers.</p>
              <Link to="/services/plumber" className="fw-medium">Book Now<i className="fa fa-arrow-right ms-2" /></Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
          <div className="service-item">
            <div className="overflow-hidden">
              <img className="img-fluid" src="img/accleaning.jpg" alt />
            </div>
            <div className="p-4 text-center border border-5 border-light border-top-0">
              <h4 className="mb-3">Ac Cleaning and service</h4>
              <p>Get the best Ac Cleaning services (using jet spray).</p>
              <Link to="/services/ac" className="fw-medium">Book Now<i className="fa fa-arrow-right ms-2" /></Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
          <div className="service-item">
            <div className="overflow-hidden">
              <img className="img-fluid" src="img/carpenter.jpg" alt />
            </div>
            <div className="p-4 text-center border border-5 border-light border-top-0">
              <h4 className="mb-3">General Carpentry</h4>
              <p>Repair and make your wooden furnitures by our best carpenters.</p>
              <Link to="/services/carpenter" className="fw-medium">Book Now<i className="fa fa-arrow-right ms-2" /></Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
          <div className="service-item">
            <div className="overflow-hidden">
              <img className="img-fluid" src="img/interior.jpg" alt />
            </div>
            <div className="p-4 text-center border border-5 border-light border-top-0">
              <h4 className="mb-3">Interior Designing</h4>
              <p>Get best interior designing ideas from our designers.</p>
              <Link to="/services/interior designer" className="fw-medium">Book Now<i className="fa fa-arrow-right ms-2" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Service End */}
  {/* Feature Start */}
  <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
    <div className="container feature px-lg-0">
      <div className="row g-0 mx-lg-0">
        <div className="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.5s">
          <div className="p-lg-5 ps-lg-0">
            <div className="section-title text-start">
              <h1 className="display-5 mb-4">Why Choose Us</h1>
            </div>
            <p className="mb-4 pb-2">Essential Needs and Services offers dependable, affordable, and wide-ranging support, driven by a strong commitment to community and delivered by a compassionate, trustworthy team.</p>
            <div className="row g-4">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{width: 60, height: 60}}>
                    <i className="fa fa-check fa-2x text-primary" />
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Quality</p>
                    <h5 className="mb-0">Services</h5>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{width: 60, height: 60}}>
                    <i className="fa fa-user-check fa-2x text-primary" />
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Creative</p>
                    <h5 className="mb-0">Designers</h5>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{width: 60, height: 60}}>
                    <i className="fa fa-drafting-compass fa-2x text-primary" />
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Free</p>
                    <h5 className="mb-0">Consultation</h5>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{width: 60, height: 60}}>
                    <i className="fa fa-headphones fa-2x text-primary" />
                  </div>
                  <div className="ms-4">
                    <p className="mb-2">Customer</p>
                    <h5 className="mb-0">Support</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 pe-lg-0" style={{minHeight: 400}}>
          <div className="position-relative h-100">
            <img className="position-absolute img-fluid w-100 h-100" src="img/choose.jpg" style={{objectFit: 'cover'}} alt />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Feature End */}
</div>

    {/* <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
    <div className="container about px-lg-0">
      <div className="row g-0 mx-lg-0">
        <div className="col-lg-6 ps-lg-0" style={{minHeight: 400}}>
          <div className="position-relative h-100">
            <img className="position-absolute img-fluid w-100 h-100" src="img/4.jpg" style={{objectFit: 'cover'}} alt />
          </div>
        </div>
        <div className="col-lg-6 about-text py-5 wow fadeIn" data-wow-delay="0.5s">
          <div className="p-lg-5 pe-lg-0">
            <div className="section-title text-start">
              <h1 className="display-5 mb-4">About Us</h1>
            </div>
            <p className="mb-4 pb-2">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo erat amet</p>
            <div className="row g-4 mb-4 pb-2">
              <div className="col-sm-6 wow fadeIn" data-wow-delay="0.1s">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{width: 60, height: 60}}>
                    <i className="fa fa-users fa-2x text-primary" />
                  </div>
                  <div className="ms-3">
                    <h2 className="text-primary mb-1" data-toggle="counter-up">1234</h2>
                    <p className="fw-medium mb-0">Happy Clients</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{width: 60, height: 60}}>
                    <i className="fa fa-check fa-2x text-primary" />
                  </div>
                  <div className="ms-3">
                    <h2 className="text-primary mb-1" data-toggle="counter-up">1234</h2>
                    <p className="fw-medium mb-0">Projects Done</p>
                  </div>
                </div>
              </div>
            </div>
            <a href className="btn btn-primary py-3 px-5">Explore More</a>
          </div> */}
        {/* </div> */}
      {/* </div> */}
    {/* </div> */}
  {/* </div> */}
  {/* About End */}
  
  {/* Footer End */}
  {/* Back to Top */}
  {/* <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-0 back-to-top"><i className="bi bi-arrow-up" /></a> */}
</div>
    </>
  )
}

export default Home
