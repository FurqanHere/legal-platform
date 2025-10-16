import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthService from "../services/AuthService";
import blank from "../assets/images/notification-profile.png";
import ApiService from "../services/ApiService";
import { toast } from "react-toastify";
import moment from "moment";
import circle from "../assets/images/yellow-circle.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [user] = useState(
    JSON.parse(localStorage.getItem("admin")) || {
      name: "Admin User",
      email: "admin@example.com",
    }
  );
    const [notifications, setNotifications] = useState([]);

  // Check if we're on the Ask Question page
  const isAskQuestionPage =
    location.pathname.includes("/companies") ||
    location.pathname.includes("/ask-question");

  // Check if we're on the Chat page
  const isChatPage =
    location.pathname.includes("/users") || location.pathname.includes("/messages");

  // Check if we're on the My Lawyers page
  const isMyLawyersPage =
    location.pathname.includes("/jobs") ||
    location.pathname.includes("/my-lawyers");

  // Check if we're on the My Cases page
  const isMyCasesPage = location.pathname.includes("/my-cases");

  // Check if we're on the Lawyers page
  const isLawyersPage = location.pathname.includes("/lawyers");

  // Check if we're on the Notifications page
  const isNotificationsPage = location.pathname.includes("/notifications");

  // Check if we're on the Case Details page
  const isCaseDetailsPage = location.pathname.includes("/my-cases/") && location.pathname !== "/my-cases";

    const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
            AuthService.logout();
        }
    };

    useEffect(() => {
        // getNotifications();
    }, []); 

    const getNotifications = async () => {
        try {
            const response = await ApiService.request({
                method: "GET",
        url: "getNotifications",
            });
            const data = response.data;
            if (data.status) {
                setNotifications(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
  };
       
    const clearAllNotifications = async () => {
        try {
            const response = await ApiService.request({
                method: "POST",
        url: "clearAllNotifications",
            });
            const data = response.data;
            if (data.status) {
                setNotifications([]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
    <div id="kt_app_header" className="app-header modern-header-container">
      {isAskQuestionPage ? (
        // Ask Question Page Header
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <h1 className="fw-bold text-dark fs-2 mb-2">Ask Question</h1>
            <p className="text-gray-600 fs-6 mb-0">
              Question listing and responding Lawyers.
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <NavLink to="/notifications">
              <div className="modern-icon-container position-relative">
                <i className="bi bi-bell text-gray-600 fs-4"></i>
                {notifications.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>
                    {notifications.length}
                  </span>
                )}
              </div>
            </NavLink>
            <div className="symbol symbol-40px">
              <div className="symbol-label text-white rounded-circle">
                <img
                  src={circle}
                  className="w-40px h-40px rounded-circle"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      ) : isChatPage ? (
        // Chat Page Header
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <h1 className="fw-bold text-dark fs-2 mb-2">Messages</h1>
            <p className="text-gray-600 fs-6 mb-0">
              Quick, Clear and concise communications.
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <NavLink to="/notifications">
              <div className="modern-icon-container position-relative">
                <i className="bi bi-bell text-gray-600 fs-4"></i>
                {notifications.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>
                    {notifications.length}
                  </span>
                )}
              </div>
            </NavLink>
            <div className="symbol symbol-40px">
              <div className="symbol-label bg-warning text-white rounded-circle">
                <img
                  src={circle}
                  className="w-40px h-40px rounded-circle"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      ) : isMyLawyersPage ? (
        // My Lawyers Page Header
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <h1 className="fw-bold text-dark fs-2 mb-2">My Lawyers</h1>
            <p className="text-gray-600 fs-6 mb-0">
              Manage your legal team and communications.
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <NavLink to="/notifications">
              <div className="modern-icon-container position-relative">
                <i className="bi bi-bell text-gray-600 fs-4"></i>
                {notifications.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>
                    {notifications.length}
                  </span>
                )}
              </div>
            </NavLink>
            <div className="symbol symbol-40px">
              <div className="symbol-label bg-warning text-white rounded-circle">
                <img
                  src={circle}
                  className="w-40px h-40px rounded-circle"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      ) : isMyCasesPage ? (
        // My Cases Page Header
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <h1 className="fw-bold text-dark fs-2 mb-2">My Cases</h1>
            <p className="text-gray-600 fs-6 mb-0">
              cases and date and time with lawyers.
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <NavLink to="/notifications">
              <div className="modern-icon-container position-relative">
                <i className="bi bi-bell text-gray-600 fs-4"></i>
                {notifications.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>
                    {notifications.length}
                  </span>
                )}
              </div>
            </NavLink>
            <div className="modern-icon-container">
              <img
                src={circle}
                className="w-40px h-40px rounded-circle"
                alt=""
              />
                    </div>
                </div>
                </div>
      ) : isLawyersPage ? (
        // Lawyers Page Header
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <h1 className="fw-bold text-dark fs-2 mb-2">Find Best Lawyers</h1>
            <p className="text-gray-600 fs-6 mb-0">
              Add New Employee and view list.
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <NavLink to="/notifications">
              <div className="modern-icon-container position-relative">
                <i className="bi bi-bell text-gray-600 fs-4"></i>
                {notifications.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>
                    {notifications.length}
                  </span>
                )}
              </div>
            </NavLink>
            <div className="modern-icon-container">
              <img
                src={circle}
                className="w-40px h-40px rounded-circle"
                alt=""
              />
            </div>
          </div>
        </div>
      ) : isNotificationsPage ? (
        // Notifications Page Header
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <h1 className="fw-bold text-dark fs-2 mb-2">Notifications</h1>
            <p className="text-gray-600 fs-6 mb-0">
              Listing notifications
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="modern-icon-container position-relative">
              <i className="bi bi-bell text-gray-600 fs-4"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>
                3
              </span>
            </div>
            <div className="modern-icon-container">
              <img
                src={circle}
                className="w-40px h-40px rounded-circle"
                alt=""
              />
            </div>
          </div>
        </div>
      ) : isCaseDetailsPage ? (
        // Case Summary Page Header
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <h1 className="fw-bold text-dark fs-2 mb-2">Case Summary</h1>
            <p className="text-gray-600 fs-6 mb-0">
              Detail
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <NavLink to="/notifications">
              <div className="modern-icon-container position-relative">
                <i className="bi bi-bell text-gray-600 fs-4"></i>
                {notifications.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>
                    {notifications.length}
                  </span>
                )}
              </div>
            </NavLink>
            <div className="modern-icon-container">
              <img
                src={circle}
                className="w-40px h-40px rounded-circle"
                alt=""
              />
            </div>
          </div>
        </div>
      ) : (
        // Default Header Layout
        <div className="modern-header-layout d-flex align-items-center justify-content-between w-100">
          {/* Mobile menu toggle */}
          <div
            className="d-flex align-items-center d-lg-none me-3"
            title="Show sidebar menu"
          >
            <div
              className="btn btn-icon btn-active-color-primary w-35px h-35px"
              id="kt_app_sidebar_mobile_toggle"
            >
              <i className="bi bi-list text-gray-600 fs-3"></i>
                        </div>
                    </div>

          {/* Search Bar */}
          <div className="modern-search-container flex-grow-1 me-4">
            <div className="modern-search-wrapper position-relative">
              <input
                type="search"
                name="search"
                placeholder="Search"
                className="modern-search-input"
              />
              <i className="bi bi-search modern-search-icon position-absolute"></i>
            </div>
                        </div>

          {/* Right side icons */}
          <div className="modern-icons-container d-flex align-items-center gap-3">
            {/* Messages Icon */}
            <NavLink to="/chat">
              <div className="modern-icon-container">
                <i className="bi bi-chat-dots modern-icon"></i>
                            </div>
            </NavLink>

            {/* Notifications Icon */}
            <NavLink to="/notifications">
              <div className="modern-notification-container position-relative">
                <i className="bi bi-bell modern-icon"></i>
                {notifications.length > 0 && (
                  <span className="modern-notification-indicator"></span>
                )}
                                    </div>
            </NavLink>

            {/* User Profile */}
            <div
              className="app-navbar-item ms-1 ms-lg-3"
              id="kt_header_user_menu_toggle"
            >
                            <div className="cursor-pointer symbol symbol-35px symbol-md-40px profile-dropdown">
                <img src={blank} alt="user" className="modern-profile-image" />
                            </div>
              <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px profile-submenu modern-profile-dropdown">
                                <div className="menu-item px-3">
                                    <div className="menu-content d-flex align-items-center px-3">
                                        <div className="symbol symbol-50px me-5">
                      <img alt="Logo" src={blank} />
                                        </div>
                                        <div className="d-flex flex-column">
                      <div className="fw-bold d-flex align-items-center fs-5">
                        {user.name}
                      </div>
                      <Link
                        to="#"
                        className="fw-semibold text-muted text-hover-primary fs-7"
                      >
                        {user.email}
                      </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="separator my-2"></div>
                                <div className="menu-item px-5 my-1">
                  <Link to="/account" className="menu-link px-5">
                    Account Settings
                  </Link>
                                </div>
                                <div className="menu-item px-5">
                  <button
                    onClick={logout}
                    className="menu-link px-5 btn btn-transparent"
                  >
                    Logout
                  </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
        </div>
    );
};

export default Header;
