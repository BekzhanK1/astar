import React from "react";
import logo from "../images/juzenglogo.png";
const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              <div className="dashboard_bar">Projects</div>
            </div>
            <ul className="navbar-nav header-right">
              <li className="nav-item">
                <div className="input-group search-area d-lg-inline-flex d-none">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <a href="#!">
                        <i className="flaticon-381-search-2"></i>
                      </a>
                    </span>
                  </div>
                  <input type="text" className="form-control" placeholder="Search here..." />
                </div>
              </li>
              <li className="nav-item dropdown notification_dropdown">
                <a className="nav-link bell bell-link" href="#!">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Notification bell SVG paths */}
                    <path d="M2.23779 10.2492L4.66679 11.7064V8.30554L2.23779 10.2492Z" fill="#67636D"></path>
                    {/* Additional SVG paths */}
                  </svg>
                  <span className="badge badge-primary rounded-circle">6</span>
                </a>
              </li>
              <li className="nav-item dropdown notification_dropdown">
                <a className="nav-link ai-icon" href="#!" role="button" data-bs-toggle="dropdown">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Notification dropdown SVG paths */}
                    <path d="M23.3333 19.8333H23.1187..." fill="#67636D"></path>
                  </svg>
                  <span className="badge badge-primary rounded-circle">4</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <div id="dlab_W_Notification1" className="widget-media dlab-scroll p-3 height380 ps">
                    <ul className="timeline">
                      <li>
                        <div className="timeline-panel">
                          <div className="media me-2">
                            <img alt="avatar" width="50" src="images/avatar/1.jpg" />
                          </div>
                          <div className="media-body">
                            <h6 className="mb-1">Dr sultads Send you Photo</h6>
                            <small className="d-block">29 July 2020 - 02:26 PM</small>
                          </div>
                        </div>
                      </li>
                      {/* Additional timeline items */}
                    </ul>
                  </div>
                  <a className="all-notification" href="#!">
                    See all notifications <i className="ti-arrow-right"></i>
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown header-profile">
                <a className="nav-link" href="#!" role="button" data-bs-toggle="dropdown">
                  <img src="images/profile/17.jpg" width="20" alt="profile" />
                  <div className="header-info">
                    <span className="text-black">Peter Parkur</span>
                    <p className="fs-12 mb-0">Super Admin</p>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a href="./app-profile.html" className="dropdown-item ai-icon">
                    <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span className="ms-2">Profile</span>
                  </a>
                  <a href="./email-inbox.html" className="dropdown-item ai-icon">
                    <svg id="icon-inbox" xmlns="http://www.w3.org/2000/svg" className="text-success" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="ms-2">Inbox</span>
                  </a>
                  <a href="./page-login.html" className="dropdown-item ai-icon">
                    <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span className="ms-2">Logout</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
