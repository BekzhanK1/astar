import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="dlabnav">
      <div className="dlabnav-scroll">
        <ul className="metismenu" id="menu">
          <li>
            <a className="has-arrow ai-icon" href="#" aria-expanded="false">
              <i className="flaticon-381-networking"></i>
              <span className="nav-text">Dashboard</span>
            </a>
            <ul aria-expanded="false">
              <li>
                <a href="index.html">Dashboard</a>
              </li>
            </ul>
          </li>
          <li>
            <a className="has-arrow ai-icon" href="#" aria-expanded="false">
              <i className="flaticon-381-television"></i>
              <span className="nav-text">Apps</span>
            </a>
            <ul aria-expanded="false">
              <li>
                <a href="./app-profile.html">Profile</a>
              </li>
              <li>
                <a href="./app-calender.html">Calendar</a>
              </li>
            </ul>
          </li>
          <li>
            <a className="has-arrow ai-icon" href="#" aria-expanded="false">
              <i className="flaticon-381-controls-3"></i>
              <span className="nav-text">Charts</span>
            </a>
            <ul aria-expanded="false">
              <li>
                <a href="./chart-flot.html">Flot</a>
              </li>
            </ul>
          </li>
          <li>
            <a className="has-arrow ai-icon" href="#" aria-expanded="false">
              <i className="flaticon-381-heart"></i>
              <span className="nav-text">Plugins</span>
            </a>
            <ul aria-expanded="false">
              <li>
                <a href="./uc-sweetalert.html">Sweet Alert</a>
              </li>
            </ul>
          </li>
        </ul>
        <a
          className="add-menu-sidebar"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#addOrderModalside"
        >
          + New Project
        </a>
        <div className="copyright">
          <p>
            <strong>Vora Saas Admin Dashboard</strong> © 2022 All Rights
            Reserved
          </p>
          <p>
            Made with <span className="heart"></span> by DexignLab
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
