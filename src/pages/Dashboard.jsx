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
            {/* Left Column - Main Content */}
            <div
              className="col-md-8 pt-4 dashboard-main-content"
            >
              {/* Welcome Header */}
              <div className="mb-6" data-aos="fade-up">
                <h1 className="text-black mb-2 dashboard-welcome-title">
                  Welcome Back! Noon
                </h1>
                <p className="text-gray-600 mb-4 dashboard-welcome-subtitle">
                  Dubai internet city UAE
                </p>
              </div>

              {/* Action Cards */}
              <div className="row mb-8">
                <div
                  className="col-lg-4 col-md-6 mb-4"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div
                    className="card h-100 dashboard-card-hover dashboard-action-card"
                  >
                    <div className="card-body p-4 d-flex flex-column justify-content-between h-100">
                      <div>
                        <h5 className="text-black fw-bold mb-3">
                          Post Your Legal <br /> Issues
                        </h5>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          className="btn btn-light rounded-circle d-flex justify-content-center align-items-center portal-button-hover dashboard-action-button"
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

                <div
                  className="col-lg-4 col-md-6 mb-4"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div
                    className="card h-100 shadow dashboard-card-hover dashboard-action-card"
                  >
                    <div className="card-body p-4 d-flex flex-column justify-content-between h-100">
                      <div>
                        <h5 className="text-dark fw-bold mb-3">
                          Hire Lawyer for Business Consultation
                        </h5>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink
                          to={"/lawyers"}
                          className="dashboard-card-hover-icon"
                        >
                          <button
                            className="btn rounded-circle d-flex justify-content-center align-items-center dashboard-action-button"
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

                <div
                  className="col-lg-4 col-md-6 mb-4"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div
                    className="card h-100 shadow dashboard-card-hover dashboard-action-card"
                  >
                    <div className="card-body p-4 d-flex flex-column justify-content-between h-100">
                      <div>
                        <h5 className="text-dark fw-bold mb-3">
                          Create New Case
                        </h5>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          className="btn rounded-circle d-flex justify-content-center align-items-center dashboard-action-button"
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
                className="card mb-6 shadow recent-posted-question-card recent-question-card-hover dashboard-recent-question-card"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className="card-body p-4 d-flex justify-content-between">
                  {/* Recent Posted Question Section */}
                  <div
                    className="me-4 d-flex flex-column dashboard-recent-question-section"
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
                      <div className="d-flex align-items-center gap-2 recent-question-views-container">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-eye-fill text-black me-2 recent-question-views-icon-hover"></i>
                          <span className="text-black recent-question-views-text-hover">
                            Views: 260
                          </span>
                        </div>
                        <div className="d-flex align-items-center ms-5">
                          <i className="bi bi-chat-dots-fill text-black me-2 recent-question-message-icon-hover"></i>
                          <span className="text-black recent-question-message-text-hover">
                            Ans: 60
                          </span>
                        </div>
                        <div
                          className="d-flex align-items-center rounded-pill py-2 px-3 ms-5 recent-question-date-container-hover dashboard-recent-question-date-container"
                        >
                          <span className="text-black recent-question-date-text-hover">
                            Jan 05 - 2025 - 10:25 AM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lawyer Respond Section */}
                  <div className="dashboard-lawyer-respond-section">
                    <div className="d-flex justify-content-between align-items-center mb-4 recent-posted-question-lawyer-respond">
                      <h2 className="fw-bold mb-0">Lawyer Respond</h2>
                      <a href="#" className="--bs-tertiary-bg-rgb fw-semibold dashboard-see-all-hover">
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
                className="card shadow-sm border-0 dashboard-my-lawyers-card"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex">
                      <h4 className="fw-bold text-dark mb-0">My Lawyers</h4>
                      <div className="d-flex mb-4 ms-5">
                        <button
                          className={`btn portal-tab-hover dashboard-tab-button ${
                            activeTab === "active"
                              ? "btn-dark text-white active"
                              : "btn-light text-dark"
                          } me-2`}
                          onClick={() => setActiveTab("active")}
                        >
                          Active Lawyers
                        </button>
                        <button
                          className={`btn portal-tab-hover dashboard-tab-button ${
                            activeTab === "inactive"
                              ? "btn-dark text-white active"
                              : "btn-light text-dark"
                          }`}
                          onClick={() => setActiveTab("inactive")}
                        >
                          Inactive Lawyers
                        </button>
                      </div>
                    </div>
                    <NavLink to={"/my-lawyers"}>
                      <a
                        href="#"
                        className="fw-semibold text-decoration-none --bs-tertiary-bg-rgb dashboard-see-all-hover"
                      >
                        See All
                      </a>
                    </NavLink>
                  </div>

                  {/* Lawyers List */}
                  {[1, 2].map((_, index) => (
                    <div
                      key={index}
                      className="card mb-3 border-0 shadow-sm lawyer-card-hover dashboard-lawyer-card"
                      data-aos="fade-up"
                      data-aos-delay={`${500 + index * 100}`}
                    >
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap p-3">
                        {/* Profile */}
                        <div
                          className="d-flex align-items-center dashboard-lawyer-profile"
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
                          className="text-muted dashboard-lawyer-practice"
                        >
                          Criminal Law, Tax Law+
                        </div>

                        {/* Renewal Date */}
                        <div
                          className="text-muted dashboard-lawyer-renewal"
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
                className="card mb-6 shadow my-cases-card-hover dashboard-my-cases-card"
                data-aos="fade-left"
                data-aos-delay="600"
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold text-dark mb-0">My Cases</h2>
                    <NavLink to={"/my-cases"}>
                      <a href="#" className="--bs-tertiary-bg-rgb fw-semibold dashboard-see-all-hover">
                        See All
                      </a>
                    </NavLink>
                  </div>

                  <div
                    className="card mb-3 my-cases-row-hover dashboard-case-card"
                    data-aos="fade-up"
                    data-aos-delay="700"
                  >
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold text-dark mb-0">
                          Crimes Against Persons
                        </h6>
                        <span
                          className="badge bg-light text-dark portal-badge-hover dashboard-case-badge"
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
                    className="card mb-3 my-cases-row-hover dashboard-case-card"
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold text-dark mb-0">
                          Crimes Against Persons
                        </h6>
                        <span
                          className="badge bg-light text-dark portal-badge-hover dashboard-case-badge"
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
                    className="card mb-3 my-cases-row-hover dashboard-case-card"
                    data-aos="fade-up"
                    data-aos-delay="900"
                  >
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold text-dark mb-0">
                          Crimes Against Persons
                        </h6>
                        <span
                          className="badge bg-light text-dark portal-badge-hover dashboard-case-badge"
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
              <div
                className="card shadow notification-card-hover dashboard-notification-card"
                data-aos="fade-left"
                data-aos-delay="1000"
              >
                <div className="card-body px-4 pb-4 dashboard-notification-body">
                  <div
                    className="d-flex justify-content-between align-items-center mb-4 pt-0 pb-5 dashboard-notification-header"
                  >
                    <h4
                      className="fw-bold text-black mb-0 dashboard-notification-title"
                    >
                      Notifications
                    </h4>
                    <NavLink to={"/notifications"}>
                      <a
                        href="#"
                        className="text-black fw-semibold dashboard-see-all-hover dashboard-notification-see-all"
                      >
                        See All
                      </a>
                    </NavLink>
                  </div>

                  <div
                    className="d-flex align-items-start mb-5 notification-item-hover dashboard-notification-item"
                    data-aos="fade-up"
                    data-aos-delay="1100"
                  >
                    <div
                      className="symbol symbol-40px me-3 dashboard-notification-avatar"
                    >
                      <img
                        src={notificationProfile}
                        alt="Notification"
                        className="rounded-circle notification-avatar-hover"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600 mb-2 notification-text-hover dashboard-notification-text">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        volupta accusantium doloremque laudantium, totam rem.
                      </p>
                      <span className="text-gray-500 fs-7 notification-time-hover dashboard-notification-time">
                        1 hour
                      </span>
                    </div>
                  </div>

                  <div
                    className="d-flex align-items-start mb-5 notification-item-hover dashboard-notification-item"
                    data-aos="fade-up"
                    data-aos-delay="1200"
                  >
                    <div
                      className="symbol symbol-40px me-3 dashboard-notification-avatar"
                    >
                      <img
                        src={notificationProfile}
                        alt="Notification"
                        className="rounded-circle notification-avatar-hover"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600 mb-2 notification-text-hover" style={{ fontSize: "14px", lineHeight: "1.5" }}>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        volupta accusantium doloremque laudantium, totam rem.
                      </p>
                      <span className="text-gray-500 fs-7 notification-time-hover" style={{ fontSize: "12px" }}>
                        2 hours
                      </span>
                    </div>
                  </div>

                  <div
                    className="d-flex align-items-start mb-5 notification-item-hover dashboard-notification-item"
                    data-aos="fade-up"
                    data-aos-delay="1300"
                  >
                    <div
                      className="symbol symbol-40px me-3 dashboard-notification-avatar"
                    >
                      <img
                        src={notificationProfile}
                        alt="Notification"
                        className="rounded-circle notification-avatar-hover"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600 mb-2 notification-text-hover" style={{ fontSize: "14px", lineHeight: "1.5" }}>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        volupta accusantium doloremque laudantium, totam rem.
                      </p>
                      <span className="text-gray-500 fs-7 notification-time-hover" style={{ fontSize: "12px" }}>
                        3 hours
                      </span>
                    </div>
                  </div>

                  <div
                    className="d-flex align-items-start notification-item-hover"
                    data-aos="fade-up"
                    data-aos-delay="1400"
                  >
                    <div
                      className="symbol symbol-40px me-3 dashboard-notification-avatar"
                    >
                      <img
                        src={notificationProfile}
                        alt="Notification"
                        className="rounded-circle notification-avatar-hover"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600 mb-2 notification-text-hover" style={{ fontSize: "14px", lineHeight: "1.5" }}>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        volupta accusantium doloremque laudantium, totam rem.
                      </p>
                      <span className="text-gray-500 fs-7 notification-time-hover" style={{ fontSize: "12px" }}>
                        4 hours
                      </span>
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
          className="offcanvas offcanvas-end show dashboard-create-case-offcanvas"
          tabIndex="-1"
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

          <div
            className="offcanvas-body p-0 d-flex flex-column dashboard-offcanvas-body"
          >
            <div className="p-4 flex-grow-1 dashboard-offcanvas-content">
              {/* Top Row Selects */}
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <div className="position-relative">
                    <select
                      className="form-select dashboard-form-select"
                    >
                      <option>Select Jurisdiction</option>
                    </select>
                    <i className="bi bi-chevron-down position-absolute top-50 end-0 translate-middle-y me-3 text-gray-600"></i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="position-relative">
                    <select
                      className="form-select dashboard-form-select"
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
                      className="form-select dashboard-form-select"
                    >
                      <option>Criminal Law</option>
                    </select>
                    <i className="bi bi-chevron-down position-absolute top-50 end-0 translate-middle-y me-3 text-gray-600"></i>
                  </div>
                </div>
                <div className="col-6">
                  <div className="position-relative">
                    <select
                      className="form-select dashboard-form-select"
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
                  className="form-control dashboard-textarea"
                  placeholder="Explain Your Case"
                ></textarea>
              </div>

              {/* Attach Document */}
              <div className="mb-3">
                <div
                  className="d-flex align-items-center justify-content-start border border-2 border-dashed rounded dashboard-file-upload"
                >
                  <div
                    className="p-3 mx-3 rounded-1 dashboard-file-upload-icon"
                  >
                    <i
                      className="bi bi-paperclip fs-3 d-inline-block dashboard-paperclip-icon"
                    ></i>
                  </div>

                  <p className="text-muted mb-0">Attach Document</p>
                </div>
              </div>

              {/* Accept Terms */}
              <div className="form-check mb-4 mt-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="acceptTermsDashboard"
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="acceptTermsDashboard"
                >
                  Accept all Privacy policy & Terms & conditions
                </label>
              </div>
            </div>

            {/* Submit Button - fixed at bottom */}
            <div
              className="p-4 border-top dashboard-submit-footer"
            >
              <button
                className="btn text-white rounded-pill w-100 dashboard-submit-button"
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
          className="offcanvas-backdrop fade show dashboard-backdrop"
          onClick={() => setShowCreateCase(false)}
        ></div>
      )}

      {/* Post Question Offcanvas */}
      {showPostQuestion && (
        <div
          className="offcanvas offcanvas-end show dashboard-post-question-offcanvas"
          tabIndex="-1"
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
                className="form-control dashboard-post-question-textarea"
                placeholder="Explain Your Question"
              ></textarea>
            </div>

            {/* Jurisdiction Dropdown */}
            <div className="mb-3">
              <div className="position-relative">
                <select
                  className="form-select dashboard-post-question-select"
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
                className="d-flex align-items-center justify-content-start border border-2 border-dashed rounded dashboard-post-question-upload"
              >
                <div
                  className="p-3 mx-3 rounded-1 dashboard-file-upload-icon"
                >
                  <i
                    className="bi bi-paperclip fs-3 d-inline-block dashboard-paperclip-icon"
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
                  className="bi bi-moon-fill text-black dashboard-moon-icon"
                ></i>
                <small className="text-muted">
                  Ask your question and see the answer in Questions & Answers.
                </small>
              </div>
              <div className="d-flex align-items-start gap-5 my-5">
                <i
                  className="bi bi-moon-fill text-black dashboard-moon-icon"
                ></i>
                <small className="text-muted">
                  You will be notified when a lawyer answers.
                </small>
              </div>
            </div>

            {/* Post Question Fee */}
            <div
              className="mb-3 rounded-4 dashboard-post-question-fee"
            >
              <div className="d-flex justify-content-between align-items-center h-100 rounded">
                <div className="p-3">
                  <h6 className="fw-bold mb-1">Post Question Fee</h6>
                  <small className="text-muted">1 Question post only</small>
                </div>
                <div
                  className="text-end px-4 h-100 d-flex flex-column justify-content-center dashboard-fee-divider"
                >
                  <div className="fw-bold">USD</div>
                  <div className="fw-bold fs-5">1.00</div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="btn text-white rounded-pill dashboard-post-question-button"
            >
              Post Your Legal Issues
            </button>
          </div>
        </div>
      )}

      {/* Backdrop for Post Question */}
      {showPostQuestion && (
        <div
          className="offcanvas-backdrop fade show dashboard-backdrop"
          onClick={() => setShowPostQuestion(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
