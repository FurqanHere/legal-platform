import React, { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { useNavigate, NavLink } from "react-router-dom";

import notificationProfile from "../assets/images/notification-profile.png";

import postYourLegal from "../assets/images/postYourLegal.png";
import hireLawyer from "../assets/images/hireLawyer.png";
import createNewCase from "../assets/images/createNewCase.png";

import { toast } from "react-toastify";
import ApiService from "../services/ApiService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const [showPostQuestion, setShowPostQuestion] = useState(false);
  const [showCreateCase, setShowCreateCase] = useState(false);

  const handleAddQuestionClick = () => {
    setShowPostQuestion(true);
  };

  return (
    <div className="d-flex flex-column flex-column-fluid header-main dashboard--inter-font">
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="app-container container-fluid"
        >
          {/* Main Content Row */}
          <div className="row">
            {/* Left Column - Main Content (col-md-8) */}
            <div
              className="col-md-8 pt-4"
              style={{
                background:
                  "linear-gradient(to bottom,rgba(0, 0, 0, 0.06) 0%, #ffffff 100%, #ffffff 100%)",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              {/* Welcome Header */}
              <div className="mb-6">
                <h1 className="fw-bold text-dark fs-2 mb-2">
                  Welcome Back! Noon
                </h1>
                <p className="text-gray-600 fs-6 mb-4">
                  Dubai internet city UAE
                </p>
              </div>

              {/* Action Cards */}
              <div className="row mb-8">
                <div className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="card h-100"
                    style={{ backgroundColor: "black", borderRadius: "12px" }}
                  >
                    <div className="card-body p-4 d-flex flex-column justify-content-between h-100">
                      <div>
                        <h5 className="text-white fw-bold mb-3">
                          Post Your Legal <br /> Issues
                        </h5>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          className="btn btn-light rounded-circle d-flex justify-content-center align-items-center"
                          style={{ width: "40px", height: "40px" }}
                          onClick={handleAddQuestionClick}
                        >
                          <i className="bi bi-plus fs-1 text-dark pe-0"></i>
                        </button>
                        <img
                          src={postYourLegal}
                          alt="Post Your Legal"
                          className="rounded-circle postYourLegalImage"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="card h-100 shadow"
                    style={{ backgroundColor: "#F7FAFC", borderRadius: "12px" }}
                  >
                    <div className="card-body p-4 d-flex flex-column justify-content-between h-100">
                      <div>
                        <h5 className="text-dark fw-bold mb-3">
                          Hire Lawyer for Business Consultation
                        </h5>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={"/my-lawyers"}>
                        <button
                          className="btn btn-dark rounded-circle d-flex justify-content-center align-items-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#EAEAEA",
                          }}
                          type="button"
                          
                        >
                          <i className="bi bi-plus fs-1 text-black p-0"></i>
                        </button>
                        </NavLink>
                        <img
                          src={hireLawyer}
                          alt="Hire Lawyer"
                          className="rounded-circle hireLawyerImage"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="card h-100 shadow"
                    style={{ backgroundColor: "#F7FAFC", borderRadius: "12px" }}
                  >
                    <div className="card-body p-4 d-flex flex-column justify-content-between h-100">
                      <div>
                        <h5 className="text-dark fw-bold mb-3">
                          Create New Case
                        </h5>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          className="btn btn-dark rounded-circle d-flex justify-content-center align-items-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#EAEAEA",
                          }}
                          onClick={() => setShowCreateCase(true)}
                        >
                          <i className="bi bi-plus fs-1 text-black p-0"></i>
                        </button>
                        <img
                          src={createNewCase}
                          alt="Create New Case"
                          className="rounded-circle createNewCaseImage"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Posted Question and Lawyer Respond */}
              <div
                className="card mb-6 shadow"
                style={{ borderRadius: "12px" }}
              >
                <div className="card-body p-4 d-flex justify-content-between">
                  {/* Recent Posted Question Section */}
                  <div
                    className="me-4 d-flex flex-column"
                    style={{ flex: "2" }}
                  >
                    <h1 className="fw-bold text-dark mb-4">
                      Recent Posted Question
                    </h1>
                    <p className="text-gray-700 mb-4">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis.
                    </p>
                    <div className="mt-auto">
                      <div className="d-flex align-items-center gap-4">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-eye-fill text-black me-2"></i>
                          <span className="text-black">Views: 260</span>
                        </div>
                        <div className="d-flex align-items-center ms-5">
                          <i className="bi bi-chat-dots-fill text-black me-2"></i>
                          <span className="text-black">Ans: 60</span>
                        </div>
                        <div
                          className="d-flex align-items-center rounded-pill py-2 px-3 ms-5"
                          style={{ backgroundColor: "#F0F0F0" }}
                        >
                          <span className="text-black">
                            Jan 05 - 2025 - 10:25 AM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lawyer Respond Section */}
                  <div style={{ flex: "1" }}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h2 className="fw-bold text-dark mb-0">Lawyer Respond</h2>
                      <a href="#" className="--bs-tertiary-bg-rgb fw-semibold">
                        See All
                      </a>
                    </div>

                    <div className="d-flex align-items-center mb-4">
                      <div className="symbol symbol-50px me-3">
                        <img
                          src={notificationProfile}
                          alt="Jackline Dim"
                          className="rounded-circle"
                        />
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-1">Jackline Dim</h6>
                        <p className="text-gray-600 mb-0">
                          Lorem ipsum dolor sit amet.
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-4">
                      <div className="symbol symbol-50px me-3">
                        <img
                          src={notificationProfile}
                          alt="Maxwell Clarck"
                          className="rounded-circle"
                        />
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-1">
                          Maxwell Clarck
                        </h6>
                        <p className="text-gray-600 mb-0">
                          Lorem ipsum dolor sit amet.
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50px me-3">
                        <img
                          src={notificationProfile}
                          alt="Jackline Dim"
                          className="rounded-circle"
                        />
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-1">Jackline Dim</h6>
                        <p className="text-gray-600 mb-0">
                          Lorem ipsum dolor sit amet.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* My Lawyers */}
              <div
                className="card shadow-sm border-0"
                style={{ borderRadius: "12px" }}
              >
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex">
                      <h4 className="fw-bold text-dark mb-0">My Lawyers</h4>
                      <div className="d-flex mb-4 ms-5">
                        <button
                          className={`btn ${
                            activeTab === "active"
                              ? "btn-dark text-white"
                              : "btn-light text-dark"
                          } me-2`}
                          onClick={() => setActiveTab("active")}
                          style={{
                            borderRadius: "20px",
                            padding: "6px 20px",
                            fontWeight: "500",
                          }}
                        >
                          Active Lawyers
                        </button>
                        <button
                          className={`btn ${
                            activeTab === "inactive"
                              ? "btn-dark text-white"
                              : "btn-light text-dark"
                          }`}
                          onClick={() => setActiveTab("inactive")}
                          style={{
                            borderRadius: "20px",
                            padding: "6px 20px",
                            fontWeight: "500",
                          }}
                        >
                          Inactive Lawyers
                        </button>
                      </div>
                    </div>
                    <NavLink to={"/my-lawyers"}>
                    <a
                      href="#"
                      className="fw-semibold text-decoration-none --bs-tertiary-bg-rgb"
                    >
                      See All
                    </a>
                    </NavLink>
                  </div>

                  {/* Lawyers List */}
                  {[1, 2].map((_, index) => (
                    <div
                      key={index}
                      className="card mb-3 border-0 shadow-sm"
                      style={{ borderRadius: "12px" }}
                    >
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap p-3">
                        {/* Profile */}
                        <div
                          className="d-flex align-items-center"
                          style={{ minWidth: "200px" }}
                        >
                          <img
                            src={notificationProfile}
                            alt="Shamra Joseph"
                            className="rounded-circle me-3"
                            width="48"
                            height="48"
                          />
                          <div>
                            <h6 className="fw-bold text-dark mb-0">
                              Shamra Joseph
                            </h6>
                            <small className="text-muted">
                              Corporate lawyer
                            </small>
                          </div>
                        </div>

                        {/* Practice Areas */}
                        <div
                          className="text-muted"
                          style={{ minWidth: "180px" }}
                        >
                          Criminal Law, Tax Law+
                        </div>

                        {/* Renewal Date */}
                        <div
                          className="text-muted"
                          style={{ minWidth: "160px" }}
                        >
                          Renew 21 September
                        </div>

                        {/* Price */}
                        <div className="fw-semibold text-dark">1.99 USD</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              {/* My Cases */}
              <div
                className="card mb-6 shadow"
                style={{ borderRadius: "12px" }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold text-dark mb-0">My Cases</h2>
                    <NavLink to={"/my-cases"}>
                    <a href="#" className="--bs-tertiary-bg-rgb fw-semibold">
                      See All
                    </a>
                    </NavLink>
                  </div>

                  <div
                    className="card mb-3 border"
                    style={{ borderRadius: "12px" }}
                  >
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold text-dark mb-0">
                          Crimes Against Persons
                        </h6>
                        <span
                          className="badge bg-light text-dark"
                          style={{ borderRadius: "12px" }}
                        >
                          Case# 2548
                        </span>
                      </div>
                      <p className="text-gray-600 mb-0">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem ipsum accusantium doloremque laudantium.
                      </p>
                    </div>
                  </div>

                  <div
                    className="card mb-3 border"
                    style={{ borderRadius: "12px" }}
                  >
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold text-dark mb-0">
                          Crimes Against Persons
                        </h6>
                        <span
                          className="badge bg-light text-dark"
                          style={{ borderRadius: "12px" }}
                        >
                          Case# 2548
                        </span>
                      </div>
                      <p className="text-gray-600 mb-0">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem ipsum accusantium doloremque laudantium.
                      </p>
                    </div>
                  </div>

                  <div
                    className="card mb-3 border"
                    style={{ borderRadius: "12px" }}
                  >
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold text-dark mb-0">
                          Crimes Against Persons
                        </h6>
                        <span
                          className="badge bg-light text-dark"
                          style={{ borderRadius: "12px" }}
                        >
                          Case# 2548
                        </span>
                      </div>
                      <p className="text-gray-600 mb-0">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem ipsum accusantium doloremque laudantium.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="card shadow" style={{ borderRadius: "12px" }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4 pt-0 pb-5 border-bottom">
                    <h4 className="fw-bold text-dark mb-0">Notifications</h4>
                    <NavLink to={"/notifications"}>
                    <a href="#" className="--bs-tertiary-bg-rgb fw-semibold">
                      See All
                    </a>
                    </NavLink>
                  </div>

                  <div className="d-flex align-items-start mb-4 border-bottom">
                    <div className="symbol symbol-40px me-3">
                      <img
                        src={notificationProfile}
                        alt="Notification"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                      <span className="text-gray-500 fs-7">1 hour</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-4 border-bottom">
                    <div className="symbol symbol-40px me-3">
                      <img
                        src={notificationProfile}
                        alt="Notification"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                      <span className="text-gray-500 fs-7">1 hour</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-4 border-bottom">
                    <div className="symbol symbol-40px me-3">
                      <img
                        src={notificationProfile}
                        alt="Notification"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                      <span className="text-gray-500 fs-7">1 hour</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-start">
                    <div className="symbol symbol-40px me-3">
                      <img
                        src={notificationProfile}
                        alt="Notification"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam.
                      </p>
                      <span className="text-gray-500 fs-7">1 hour</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Create Case Offcanvas */}
    {showCreateCase && (
      <div
        className="offcanvas offcanvas-end show"
        tabIndex="-1"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          visibility: "visible",
          width: "633px",
          transition: "all 0.3s ease",
          borderRadius: "13px",
          margin: "20px",
          zIndex: 1045,
        }}
      >
        <div className="offcanvas-header border-bottom">
          <div className="d-flex justify-content-between align-items-center w-100">
            <h5 className="mb-0 fw-bold">Create a Case</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowCreateCase(false)}
            ></button>
          </div>
        </div>

        <div className="offcanvas-body p-0 d-flex flex-column" style={{ height: "100%" }}>
          <div className="p-4 flex-grow-1" style={{ overflowY: "auto" }}>
            {/* Top Row Selects */}
            <div className="row g-3 mb-3">
              <div className="col-6">
                <div className="position-relative">
                  <select
                    className="form-select"
                    style={{
                      width: "100%",
                      height: "56px",
                      border: "1px solid #C9C9C9",
                      borderRadius: "12px",
                    }}
                  >
                    <option>Select Jurisdiction</option>
                  </select>
                  <i className="bi bi-chevron-down position-absolute top-50 end-0 translate-middle-y me-3 text-gray-600"></i>
                </div>
              </div>
              <div className="col-6">
                <div className="position-relative">
                  <select
                    className="form-select"
                    style={{
                      width: "100%",
                      height: "56px",
                      border: "1px solid #C9C9C9",
                      borderRadius: "12px",
                    }}
                  >
                    <option>Type of legal consultant</option>
                  </select>
                  <i className="bi bi-chevron-down position-absolute top-50 end-0 translate-middle-y me-3 text-gray-600"></i>
                </div>
              </div>
            </div>

            {/* Second Row Selects */}
            <div className="row g-3 mb-3">
              <div className="col-6">
                <div className="position-relative">
                  <select
                    className="form-select"
                    style={{
                      width: "100%",
                      height: "56px",
                      border: "1px solid #C9C9C9",
                      borderRadius: "12px",
                    }}
                  >
                    <option>Criminal Law</option>
                  </select>
                  <i className="bi bi-chevron-down position-absolute top-50 end-0 translate-middle-y me-3 text-gray-600"></i>
                </div>
              </div>
              <div className="col-6">
                <div className="position-relative">
                  <select
                    className="form-select"
                    style={{
                      width: "100%",
                      height: "56px",
                      border: "1px solid #C9C9C9",
                      borderRadius: "12px",
                    }}
                  >
                    <option>Select Sub Categories</option>
                  </select>
                  <i className="bi bi-chevron-down position-absolute top-50 end-0 translate-middle-y me-3 text-gray-600"></i>
                </div>
              </div>
            </div>

            {/* Explain Case */}
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Explain Your Case"
                style={{
                  resize: "none",
                  width: "100%",
                  height: "217px",
                  border: "1px solid #C9C9C9",
                  borderRadius: "12px",
                }}
              ></textarea>
            </div>

            {/* Attach Document */}
            <div className="mb-3">
              <div
                className="d-flex align-items-center justify-content-start border border-2 border-dashed rounded"
                style={{
                  border: "1.5px dashed #C9C9C9",
                  width: "100%",
                  height: "80px",
                  borderRadius: "12px",
                }}
              >
                <div
                  className="p-3 mx-3 rounded-1"
                  style={{
                    backgroundColor: "#FDFDFD",
                    border: "1px dashed #BEBEBE",
                  }}
                >
                  <i
                    className="bi bi-paperclip fs-3 d-inline-block"
                    style={{
                      transform: "rotate(45deg)",
                      display: "inline-block",
                    }}
                  ></i>
                </div>

                <p className="text-muted mb-0">Attach Document</p>
              </div>
            </div>

            {/* Accept Terms */}
            <div className="form-check mb-4 mt-5">
              <input className="form-check-input" type="checkbox" id="acceptTermsDashboard" />
              <label className="form-check-label ms-2" htmlFor="acceptTermsDashboard">
                Accept all Privacy policy & Terms & conditions
              </label>
            </div>
          </div>

          {/* Submit Button - fixed at bottom */}
          <div className="p-4 border-top" style={{ backgroundColor: "#fff", borderRadius: "13px" }}>
            <button
              className="btn text-white rounded-pill w-100"
              style={{
                height: "63px",
                fontSize: "20px",
                fontWeight: "500",
                backgroundColor: "#474747",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Backdrop for Create Case */}
    {showCreateCase && (
      <div
        className="offcanvas-backdrop fade show"
        onClick={() => setShowCreateCase(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1040,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,1)",
        }}
      ></div>
    )}

    {/* Post Question Offcanvas */}
      {showPostQuestion && (
        <div
        className="offcanvas offcanvas-end show"
        tabIndex="-1"
        style={{
          visibility: "visible",
          width: "633px",
          right: "0",
          transition: "all 0.3s ease",
          borderRadius: "13px",
          margin: "20px",
        }}
      >
        <div className="offcanvas-header border-bottom">
          <div className="d-flex justify-content-between align-items-center w-100">
            <h5 className="mb-0 fw-bold">Post Question</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowPostQuestion(false)}
            ></button>
          </div>
        </div>

        <div className="offcanvas-body p-4">
          {/* Question Input */}
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Explain Your Question"
              style={{
                resize: "none",
                width: "606px",
                height: "217px",
                border: "1px solid #C9C9C9",
                borderRadius: "8px",
              }}
            ></textarea>
          </div>

          {/* Jurisdiction Dropdown */}
          <div className="mb-3">
            <div className="position-relative">
              <select
                className="form-select"
                style={{
                  width: "606px",
                  height: "79px",
                  border: "1px solid #C9C9C9",
                  borderRadius: "8px",
                }}
              >
                <option>Jurisdiction</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
              <i className="bi bi-chevron-down position-absolute top-50 end-0 translate-middle-y me-3 text-gray-600"></i>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-3">
            <div
              className="d-flex align-items-center justify-content-start border border-2 border-dashed rounded"
              style={{
                border: "1.5px dashed #C9C9C9",
                width: "606px",
                height: "80px",
                borderRadius: "8px",
              }}
            >
              <div
                className="p-3 mx-3 rounded-1"
                style={{
                  backgroundColor: "#FDFDFD",
                  border: "1px dashed #BEBEBE",
                }}
              >
                <i
                  className="bi bi-paperclip fs-3 d-inline-block"
                  style={{
                    transform: "rotate(45deg)",
                    display: "inline-block",
                  }}
                ></i>
              </div>

              <p className="text-muted mb-0">Attach Document</p>
            </div>
          </div>

          {/* How it works Section */}
          <div className="mb-3">
            <h6 className="fw-bold mb-2">How it works</h6>
            <div className="d-flex align-items-start gap-5 my-5">
              <i
                className="bi bi-moon-fill text-black"
                style={{
                  transform: "rotate(35deg)",
                  display: "inline-block",
                }}
              ></i>
              <small className="text-muted">
                Ask your question and see the answer in Questions & Answers.
              </small>
            </div>
            <div className="d-flex align-items-start gap-5 my-5">
              <i
                className="bi bi-moon-fill text-black"
                style={{
                  transform: "rotate(35deg)",
                  display: "inline-block",
                }}
              ></i>
              <small className="text-muted">
                You will be notified when a lawyer answers.
              </small>
            </div>
          </div>

          {/* Post Question Fee */}
          <div
            className="mb-3 rounded-4"
            style={{
              border: "1px solid #D3D3D3",
              width: "606px",
              height: "92px",
              borderRadius: "8px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center h-100 rounded">
              <div className="p-3">
                <h6 className="fw-bold mb-1">Post Question Fee</h6>
                <small className="text-muted">1 Question post only</small>
              </div>
              <div
                className="text-end px-4 h-100 d-flex flex-column justify-content-center"
                style={{ borderLeft: "1px solid #D3D3D3" }}
              >
                <div className="fw-bold">USD</div>
                <div className="fw-bold fs-5">1.00</div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="btn text-white rounded-pill"
            style={{
              height: "63px",
              fontSize: "20px",
              fontWeight: "500",
              backgroundColor: "#474747",
              width: "606px",
              marginTop: "25px",
            }}
          >
            Post Your Legal Issues
          </button>
        </div>
      </div>
      )}

      {/* Backdrop for Post Question */}
      {showPostQuestion && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={() => setShowPostQuestion(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1040,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,1)",
          }}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
