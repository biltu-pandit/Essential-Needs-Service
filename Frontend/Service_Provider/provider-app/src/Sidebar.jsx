import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SERVER from './Server'
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [isServiceExpanded, setIsServiceExpanded] = useState(false)
  const location = useLocation()

  // Get current path to determine active item
  useEffect(() => {
    const path = location.pathname
    
    if (path === '/' || path.includes('dashboard')) {
      setActiveItem('dashboard')
      // Don't collapse service menu if it was expanded
    } else if (path === '/add' || path.includes('add-service')) {
      setActiveItem('add-service')
      setIsServiceExpanded(true)
    } else if (path === '/manage' || path.includes('manage-service')) {
      setActiveItem('manage-service')
      setIsServiceExpanded(true)
    } else if (path === '/bookingRequest' || path.includes('booking')) {
      setActiveItem('booking')
      // Don't collapse service menu if it was expanded
    } else if (path === '/profile' || path.includes('profile')) {
      setActiveItem('profile')
      // Don't collapse service menu if it was expanded
    }
  }, [location.pathname]) // React to location changes

  const handleNavClick = (item) => {
    setActiveItem(item)
    if (item === 'add-service' || item === 'manage-service') {
      setIsServiceExpanded(true)
    } else if (item !== 'service') {
      // Only collapse service menu when clicking non-service items
      // Keep it expanded if user is navigating within service items
      const isServiceRoute = location.pathname === '/add' || location.pathname === '/manage'
      if (!isServiceRoute) {
        setIsServiceExpanded(false)
      }
    }
  }
//   const toggleService = (e) => {
//     e.preventDefault()
//     setIsServiceExpanded(!isServiceExpanded)
//   }

//   // Check if any service route is active
//   const isServiceActive = activeItem === 'add-service' || activeItem === 'manage-service'
const [provider, setProvider] = useState("")
const [name, setName] = useState("")
const [image, setImage] = useState("")
const getCompanyProfile = async (id) => {
      const response = await fetch(`${SERVER}/provider/getProviderByID/${id}`)
      const data = await response.json();
      setProvider(data._id)
      setName(data.name)
      setImage(data.image)
    }
    useEffect(() =>{
      const id = localStorage.getItem("providerid")
      getCompanyProfile(id)
    },[])
  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="">
            <img src="../../assets/images/logo_light.svg.png" alt="logo" style={{height:"100px"}}/>
          </a>
          <a className="sidebar-brand brand-logo-mini" href="../../index.html">
            <img src={image} alt="logo" />
          </a>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img className="img-xs rounded-circle " src={image} alt="" />
                  <span className="count bg-success" />
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal">{name}</h5>
                  <span>Service Provider</span>
                </div>
              </div>
              <a href="#" id="profile-dropdown" data-toggle="dropdown">
                <i className="mdi mdi-dots-vertical" />
              </a>
              <div className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
                <a href="#" className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-primary" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">Account settings</p>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-onepassword text-info" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">Change Password</p>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-calendar-today text-success" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">To-do list</p>
                  </div>
                </a>
              </div>
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">Navigation</span>
          </li>
          <li className={`nav-item menu-items ${activeItem === 'dashboard' ? 'active' : ''}`}>
            <Link 
              className="nav-link" 
              to="/dashboard"
              onClick={() => handleNavClick('dashboard')}
            >
              <span className="menu-icon">
                <i className="mdi mdi-home" />
              </span>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>
          <li className={'nav-item menu-items'}>
            <a 
              className="nav-link" 
              data-toggle="collapse" 
              href="#ui-basic" 
              aria-expanded={isServiceExpanded} 
              aria-controls="ui-basic"
             
            >
              <span className="menu-icon">
                <i className="mdi mdi-briefcase" />
              </span>
              <span className="menu-title">Service</span>
              <i className="menu-arrow" />
            </a>
            <div className={`collapse ${isServiceExpanded ? 'show' : ''}`} id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className={`nav-item ${activeItem === 'add-service' ? 'active' : ''}`}>
                  <Link 
                    className="nav-link" 
                    to="/add"
                    onClick={() => handleNavClick('add-service')}
                  >
                    <span className="menu-icon">
                      <i className="mdi mdi-plus-box" />
                    </span>
                    Add Service
                  </Link>
                </li>
                <li className={`nav-item ${activeItem === 'manage-service' ? 'active' : ''}`}>
                  <Link 
                    className="nav-link" 
                    to="/manage"
                    onClick={() => handleNavClick('manage-service')}
                  >
                    <span className="menu-icon">
                      <i className="mdi mdi-briefcase-edit" />
                    </span>
                    Manage Service
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className={`nav-item menu-items ${activeItem === 'booking' ? 'active' : ''}`}>
            <Link 
              className="nav-link" 
              to="/bookingRequest"
              onClick={() => handleNavClick('booking')}
            >
              <span className="menu-icon">
                <i className="mdi mdi-calendar-check" />
              </span>
              <span className="menu-title">booking Request</span>
            </Link>
          </li>
          <li className={`nav-item menu-items ${activeItem === 'profile' ? 'active' : ''}`}>
            <Link 
              className="nav-link" 
              to="/profile"
              onClick={() => handleNavClick('profile')}
            >
              <span className="menu-icon">
                <i className="mdi mdi-account" />
              </span>
              <span className="menu-title">Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Sidebar