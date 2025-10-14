import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import AuthService from "../services/AuthService";
import logo from "../assets/images/whiteLogo.png";

const Sidebar = () => {
  const logout = () => {
    if (window.confirm("Are you sure? you want to logout.")) {
      AuthService.logout();
    }
  };
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleDropdown = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId); // Toggle the dropdown
  };

  const toggleSidebarCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    initializeSidebar();

    return () => cleanupSidebar();
  });

  const initializeSidebar = () => {
    const button = document.getElementById("kt_app_sidebar_mobile_toggle");
    if (button) {
      button.addEventListener("click", toggleSidebar);
    }

    const menuLinks = document.querySelectorAll(".menu-link");
    menuLinks.forEach((link) => {
      link.addEventListener("click", hideSidebar);
    });
  };

  const toggleSidebar = () => {
    const sidebar = document.getElementById("kt_app_sidebar");
    console.log(sidebar);
    sidebar.style.display =
      sidebar.style.display === "block" ? "none" : "block";
  };

  const hideSidebar = () => {
    const sidebar = document.getElementById("kt_app_sidebar");
    if (window.innerWidth <= 990) {
      sidebar.style.display = "none";
    }
  };

  const cleanupSidebar = () => {
    const button = document.getElementById("kt_app_sidebar_mobile_toggle");
    if (button) {
      button.removeEventListener("click", toggleSidebar);
    }

    const menuLinks = document.querySelectorAll(".menu-link");
    menuLinks.forEach((link) => {
      link.removeEventListener("click", hideSidebar);
    });
  };

  return (
    <div
      id="kt_app_sidebar"
      className={`app-sidebar flex-column ${isCollapsed ? "collapsed" : ""}`}
      data-kt-drawer="true"
      data-kt-drawer-name="app-sidebar"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width={isCollapsed ? "130px" : "265px"}
      data-kt-drawer-direction="start"
      data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
      style={{
        width: isCollapsed ? "130px" : "265px",
        transition: "width 0.3s ease",
      }}
    >
      <div
        className="app-sidebar-logo px-6 d-flex justify-content-center align-items-center position-relative"
        style={{ backgroundColor: "black", height: "100px" }}
        id="kt_app_sidebar_logo"
      >
        <NavLink to="/dashboard">
          <img
            alt="Logo"
            src={logo}
            className={`text-center ${
              isCollapsed
                ? "app-sidebar-logo-minimize"
                : "app-sidebar-logo-default"
            }`}
            style={{
              maxWidth: isCollapsed ? "80px" : "270px",
              maxHeight: isCollapsed ? "40px" : "50px",
              transition: "all 0.3s ease",
              display: "block",
            }}
          />
        </NavLink>

        {/* Collapse/Expand Toggle Button */}
        {/* <button 
                    id="kt_app_sidebar_toggle" 
                    className="btn btn-icon btn-sm position-absolute top-50 end-0 translate-middle-y me-3"
                    onClick={toggleSidebarCollapse}
                    style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px'
                    }}
                >
                    <i className={`bi bi-chevron-left text-white transition-all ${isCollapsed ? 'rotate-180' : ''}`} style={{ fontSize: '10px' }}></i>
                </button> */}
      </div>

      <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
        <div
          id="kt_app_sidebar_menu_wrapper"
          className="app-sidebar-wrapper hover-scroll-overlay-y my-5"
        >
          <div
            className="menu menu-column menu-rounded menu-sub-indention px-3"
            id="#kt_app_sidebar_menu"
            data-kt-menu="true"
            data-kt-menu-expand="false"
          >
            <div className="menu-item">
              <NavLink to="/dashboard" className="menu-link">
                <span className="menu-icon">
                  <span className="svg-icon svg-icon-2">
                    <i className="bi bi-house-door-fill fs-5"></i>
                  </span>
                </span>
                <span className="menu-title fs-6">Dashboard</span>
              </NavLink>
            </div>

            <div className="menu-item">
              <NavLink to="/companies" className="menu-link">
                <span className="menu-icon">
                  <i class="bi bi-question-circle"></i>
                </span>
                <span className="menu-title fs-6">Ask Question</span>
              </NavLink>
            </div>

            <div className="menu-item">
              <NavLink to="/jobs" className="menu-link">
                <span className="menu-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="fs-5"
                  >
                    {/* Person silhouette */}
                    <circle cx="12" cy="7" r="2.5" fill="none" />
                    <path d="M12 9.5v4" />
                    <path d="M8 15l1 1" />
                    <path d="M16 15l-1 1" />
                    <path d="M9 16h6" />
                    <path d="M9 16l-1 1" />
                    <path d="M15 16l1 1" />
                    <path d="M8 17h8" />
                    {/* Scales of justice */}
                    <path d="M6 4l-1 1" />
                    <path d="M18 4l1 1" />
                    <path d="M5 5h14" />
                    <path d="M5 5l-1 1" />
                    <path d="M19 5l1 1" />
                    <path d="M4 6h2" />
                    <path d="M18 6h2" />
                    <path d="M5 7v1" />
                    <path d="M19 7v1" />
                    <path d="M4 8h2" />
                    <path d="M18 8h2" />
                  </svg>
                </span>
                <span className="menu-title fs-6">Lawyers</span>
              </NavLink>
            </div>

            <div className="menu-item">
              <NavLink to="/users" className="menu-link">
                <span className="menu-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="fs-5"
                  >
                    {/* Speech bubble with typing indicator */}
                    <path d="M8 4h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2z" />
                    <circle cx="9" cy="10" r="1" fill="currentColor" />
                    <circle cx="12" cy="10" r="1" fill="currentColor" />
                    <circle cx="15" cy="10" r="1" fill="currentColor" />
                  </svg>
                </span>
                <span className="menu-title fs-6">Chat</span>
              </NavLink>
            </div>

            {/* <div className="menu-item">
                            <NavLink  to="/posts" className="menu-link">
                                <span className="menu-icon">
                                    <i class="bi bi-file-post fs-5"></i>
                                </span>
                                <span className="menu-title fs-6">Posts Management</span>
                            </NavLink >
                        </div> */}

            {/* <div className="menu-item">
                            <NavLink  to="/transactions" className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-credit-card-fill fs-5"></i>
                                </span>
                                <span className="menu-title fs-6">Transactions Management</span>
                            </NavLink >
                        </div> */}

            <div className="menu-item menu-accordion ">
              <span
                className="menu-link"
                id="menuLink"
                onClick={() => toggleDropdown("dataManagement")}
              >
                <span className="menu-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="fs-5"
                  >
                    {/* Briefcase */}
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    <rect x="10" y="7" width="4" height="2" rx="1" />
                  </svg>
                </span>
                <span className="menu-title fs-6">My Cases</span>
                {/* <span className="menu-arrow"></span> */}
              </span>
              {/* <div  className={`menu-sub menu-sub-accordion ${openDropdown === 'dataManagement' ? 'show' : ''}`}  >
                              
                                <div className="menu-item">
                                    <NavLink  to="/business_types" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6"> Business Types</span>
                                    </NavLink >
                                </div>
                                <div className="menu-item">
                                    <NavLink  to="/services" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6"> Services</span>
                                    </NavLink >
                                </div>
                                <div className="menu-item">
                                    <NavLink  to="/skills" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6"> Skils</span>
                                    </NavLink >
                                </div>
                                <div className="menu-item">
                                    <NavLink  to="/settings" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6"> App Settings</span>
                                    </NavLink >
                                </div>
                              
                            </div> */}
            </div>

            <div className="menu-item menu-accordion ">
              <span
                className="menu-link"
                id="menuLink"
                onClick={() => toggleDropdown("accessControl")}
              >
                <span className="menu-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="fs-5"
                  >
                    {/* Professional person with tie */}
                    <circle cx="12" cy="7" r="2.5" />
                    <path d="M12 9.5v4" />
                    <path d="M8 15l1 1" />
                    <path d="M16 15l-1 1" />
                    <path d="M9 16h6" />
                    <path d="M10 13h4" />
                    <path d="M11 14h2" />
                  </svg>
                </span>
                <span className="menu-title fs-6">Employees</span>
                {/* <span className="menu-arrow"></span> */}
              </span>
              {/* <div  className={`menu-sub menu-sub-accordion ${openDropdown === 'accessControl' ? 'show' : ''}`}  >
                                <div className="menu-item">
                                    <NavLink  to="/system-users" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6"> System Users</span>
                                    </NavLink >
                                </div>
                                <div className="menu-item">
                                    <NavLink  to="/roles" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6"> Roles</span>
                                    </NavLink >
                                </div>
                            </div> */}
            </div>

            <div className="menu-item">
              <NavLink to="/account" className="menu-link">
                <span className="menu-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="fs-5"
                  >
                    {/* Document with checklist and checkmark */}
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="9" y1="16" x2="15" y2="16" />
                    <line x1="9" y1="20" x2="15" y2="20" />
                    <circle cx="18" cy="4" r="2" />
                    <polyline points="17,4 18,5 19,4" />
                  </svg>
                </span>
                <span className="menu-title fs-6">Terms of Use</span>
              </NavLink>
            </div>

            <div className="menu-item">
              <span
                className="menu-link"
                //  onClick={logout}
              >
                <span className="menu-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="fs-5"
                  >
                    {/* Headset with microphone */}
                    <path d="M3 9v6a2 2 0 0 0 2 2h1" />
                    <path d="M21 9v6a2 2 0 0 1-2 2h-1" />
                    <path d="M7 9h10" />
                    <path d="M7 9v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9" />
                    <path d="M9 15h6" />
                    <path d="M8 15v2" />
                    <path d="M16 15v2" />
                    <path d="M6 17h2" />
                    <path d="M16 17h2" />
                    <path d="M7 19h2" />
                    <path d="M15 19h2" />
                    <path d="M8 21h8" />
                    {/* Microphone arm */}
                    <path d="M6 13l-2 2" />
                    <circle cx="4" cy="15" r="1" />
                  </svg>
                </span>
                <span className="menu-title fs-6">Help</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
