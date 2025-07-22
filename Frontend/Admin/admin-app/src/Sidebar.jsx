import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Sidebar = () => {
  const [isServiceCollapsed, setIsServiceCollapsed] = useState(false);

  const toggleServiceMenu = (e) => {
    e.preventDefault();
    setIsServiceCollapsed(!isServiceCollapsed);
  };

  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        <div className="logo-header" data-background-color="dark">
          <Link to="/" className="logo" style={{ marginTop: "20px" }}>
            <img 
              src="assets/img/kaiadmin/logo_light.svg.png" 
              alt="navbar brand" 
              className="navbar-brand" 
              height={120} 
            />
          </Link>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="gg-menu-right" />
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="gg-menu-left" />
            </button>
          </div>
          <button className="topbar-toggler more">
            <i className="gg-more-vertical-alt" />
          </button>
        </div>
      </div>

      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                <i className="fas fa-home" />
                <p>Dashboard</p>
              </NavLink>
            </li>

            <li className="nav-section">
              <span className="sidebar-mini-icon">
                <i className="fa fa-ellipsis-h" />
              </span>
              <h4 className="text-section">Components</h4>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/user" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                 <i className="fas fa-calendar-check" />
                <p>Users</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/provider" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                 <i className="fas fa-calendar-check" />
                <p>Providers</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;