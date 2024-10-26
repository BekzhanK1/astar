import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="dlabnav">
      <div className="dlabnav-scroll">
        <ul className="metismenu" id="menu">
          <li>
            <a
              href="#"
              onClick={() => toggleSection("dashboard")}
              className="has-arrow ai-icon"
            >
              <i className="flaticon-381-networking"></i>
              <span className="nav-text">Dashboard</span>
            </a>
            <ul
              className={`collapse ${openSections["dashboard"] ? "show" : ""}`}
            >
              <li>
                <a href="#">First</a>
              </li>
              <li>
                <a href="#">Second</a>
              </li>
              <li>
                <a href="#">Third</a>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#"
              onClick={() => toggleSection("analytics")}
              className="has-arrow ai-icon"
            >
              <i className="flaticon-381-heart"></i>
              <span className="nav-text">Staff</span>
            </a>
            <ul
              className={`collapse ${openSections["analytics"] ? "show" : ""}`}
            >
              <li>
                <a href="#">Overview</a>
              </li>
              <li>
                <a href="#">Reports</a>
          </li>
              <li>
                <a
                  href="#"
                  onClick={() => toggleSection("subReports")}
                  className="has-arrow"
                >
                  Sub Reports
                </a>
                <ul
                  className={`collapse ${
                    openSections["subReports"] ? "show" : ""
                  }`}
                >
                  <li>
                    <a href="#">Traffic Report</a>
                  </li>
                  <li>
                    <a href="#">Conversion Report</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#"
              onClick={() => toggleSection("applications")}
              className="has-arrow ai-icon"
            >
              <i className="flaticon-381-notepad"></i>
              <span className="nav-text">Documents</span>
            </a>
            <ul
              className={`collapse ${
                openSections["applications"] ? "show" : ""
              }`}
            >
              <li>
                <a href="#">Email</a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => toggleSection("projects")}
                  className="has-arrow"
                >
                  Projects
                </a>
                <ul
                  className={`collapse ${
                    openSections["projects"] ? "show" : ""
                  }`}
                >
                  <li>
                    <a href="#">Project A</a>
                  </li>
                  <li>
                    <a href="#">Project B</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Chat</a>
              </li>
              <li>
                <a href="#">E-Commerce</a>
              </li>
              
            </ul>
          </li>
          <li>
            <a
              href="#"
              onClick={() => toggleSection("applications")}
              className="has-arrow ai-icon"
            >
              <i className="flaticon-381-television"></i>
              <span className="nav-text">Lesson Links</span>
            </a>
            </li> 
          
        </ul>
        <li>
          <a class="add-menu-sidebar" href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#addOrderModalside">+ New Project</a>
          </li>
        
      </div>
    </div>
  );
};

export default Sidebar;
