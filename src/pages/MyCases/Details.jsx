import React, { useState } from "react";
import notificationProfile from "../../assets/images/notification-profile.png";

const Details = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateCase, setShowCreateCase] = useState(false);

  const caseDetails = {
    caseId: "Case# 2548",
    title: "Explain Your Case",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    countryRegion: "UAE Jurisdiction",
    legalConsultant: "Legal Advisor",
    caseCategory: "Criminal Law",
    subCategory: "Crimes Against Persons",
    caseValue: "$1M",
    caseBudget: "$2000",
  };

  const lawyers = [
    {
      id: 1,
      name: "Shamra Joseph",
      role: "Corporate lawyer",
      specialization: "Criminal Law, Tax Law+",
      renewal: "Renew 21 September",
      price: "1.99 USD",
      avatar: notificationProfile,
    },
    {
      id: 2,
      name: "Shamra Joseph",
      role: "Corporate lawyer",
      specialization: "Criminal Law, Tax Law+",
      renewal: "Renew 21 September",
      price: "1.99 USD",
      avatar: notificationProfile,
    },
    {
      id: 3,
      name: "Shamra Joseph",
      role: "Corporate lawyer",
      specialization: "Criminal Law, Tax Law+",
      renewal: "Renew 21 September",
      price: "1.99 USD",
      avatar: notificationProfile,
    },
    {
      id: 4,
      name: "Shamra Joseph",
      role: "Corporate lawyer",
      specialization: "Criminal Law, Tax Law+",
      renewal: "Renew 21 September",
      price: "1.99 USD",
      avatar: notificationProfile,
    },
  ];

  return (
    <div className="container-fluid case-details--mukta-font">
      {/* Search and Filter Section */}
      <div className="row mb-4 bg-white px-4 py-5 case-details-search-section">
        <div className="col-12 px-0">
          <div className="d-flex gap-3 align-items-center">
            {/* Search Bar */}
            <div
              className="position-relative flex-grow-1"
              style={{ maxWidth: "400px" }}
            >
              <input
                type="text"
                className="form-control form-control-lg rounded-pill case-details-search-input"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="bi bi-search position-absolute top-50 translate-middle-y text-muted fs-4 ms-4"></i>
            </div>

            {/* Filter Button */}
            <button
              className="btn btn-outline-secondary rounded-pill d-flex align-items-center gap-2 case-details-filter-btn"
            >
              <i className="bi bi-funnel"></i>
              Filter
            </button>

            {/* Add New Case Button */}
            <button
              className="btn bg-transparent btn-outline-dark rounded-pill text-black px-4 py-2 d-flex justify-content-center align-items-center gap-2 case-details-add-case-btn" style={{ border: "1px solid #DEDEDE" }}
              type="button"
              onClick={() => setShowCreateCase(true)}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center case-details-add-case-icon"
              >
                <i
                  className="bi bi-plus text-white fs-1 pe-0 case-details-add-case-icon-plus"
                ></i>
              </div>
              Add New Case
            </button>
          </div>
        </div>
      </div>

      {/* Explain Your Case Section */}
      <div className="row mb-4 case-details-main-section">
        <div className="col-12 rounded-4">
          <div
            className="card bg-white case-details-explain-card"
          >
            <div className="card-body p-0">
              <div className="d-flex justify-content-between align-items-center mb-3 p-4">
                <h4 className="text-dark mb-0 case-details-explain-title">{caseDetails.title}</h4>
                <span
                  className="badge bg-light text-dark px-3 py-2 rounded-pill case-details-explain-badge"
                >
                  {caseDetails.caseId}
                </span>
              </div>
              <p
                className="text-muted mb-0 px-3 pb-3 case-details-explain-description"
              >
                {caseDetails.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Details Section */}
      <div className="row mb-4 case-details-main-section">
        <div className="col-lg-4 col-md-6 mb-3">
          <div
            className="card h-100 shadow-sm case-details-info-card"
          >
            <div className="card-body p-4">
              <div
                className="mb-3 pb-3 case-details-info-divider"
              >
                <small
                  className="text-muted d-block mb-1 case-details-info-label"
                >
                  Country Region
                </small>
                <span
                  className="case-details-info-value"
                >
                  {caseDetails.countryRegion}
                </span>
              </div>
              <div>
                <small
                  className="text-muted d-block mb-1 case-details-info-label"
                >
                  Type of legal consultant
                </small>
                <span
                  className="case-details-info-value"
                >
                  {caseDetails.legalConsultant}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
          <div
            className="card h-100 shadow-sm case-details-info-card"
          >
            <div className="card-body p-4">
              <div
                className="mb-3 pb-3 case-details-info-divider"
              >
                <small
                  className="text-muted d-block mb-1 case-details-info-label"
                >
                  Select Case Category
                </small>
                <span
                  className="case-details-info-value"
                >
                  {caseDetails.caseCategory}
                </span>
              </div>
              <div>
                <small
                  className="text-muted d-block mb-1 case-details-info-label"
                >
                  Select Sub Categories
                </small>
                <span
                  className="case-details-info-value"
                >
                  {caseDetails.subCategory}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
          <div
            className="card shadow-sm case-details-financial-card"
          >
            <div className="card-body p-4 h-100">
              <div className="row h-100">
                <div
                  className="col-6 d-flex flex-column justify-content-center align-items-start case-details-financial-divider"
                >
                  <small
                    className="d-block mb-2 case-details-financial-label"
                  >
                    Case Value
                  </small>
                  <span
                    className="case-details-financial-value"
                  >
                    {caseDetails.caseValue}
                  </span>
                </div>
                <div className="col-6 d-flex flex-column justify-content-center align-items-start">
                  <small
                    className="d-block mb-2 case-details-financial-label"
                  >
                    Case Budget
                  </small>
                  <span
                    className="case-details-financial-value"
                  >
                    {caseDetails.caseBudget}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lawyers Respond Section */}
      <div className="row case-details-lawyers-section">
        <div className="col-12">
          <div
            className="card bg-transparent border-0 case-details-lawyers-card"
          >
            <div className="card-body p-4">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-dark mb-0 case-details-lawyers-title">Lawyers Respond</h4>
              </div>

              {/* Lawyers List */}
              {lawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="card mb-3 border-0 shadow-sm case-details-lawyer-card"
                >
                  <div className="card-body d-flex align-items-center justify-content-between flex-wrap p-3">
                    {/* Profile */}
                    <div
                      className="d-flex align-items-center case-details-lawyer-profile"
                    >
                      <img
                        src={lawyer.avatar}
                        alt={lawyer.name}
                        className="rounded-circle me-5"
                        width="48"
                        height="48"
                      />
                      <div>
                        <h6 className="fw-bold mb-0" style={{ fontSize: "20px", color: "#474747" }}>
                          {lawyer.name}
                        </h6>
                      </div>
                    </div>

                    {/* Practice Role */}
                    <div
                      className="case-details-lawyer-practice"
                    >
                      {lawyer.role}
                    </div>

                    {/* Practice Areas */}
                    <div
                      className="case-details-lawyer-practice"
                    >
                      {lawyer.specialization}
                    </div>

                    {/* Renewal Date */}
                    <div
                      className="case-details-lawyer-renewal"
                    >
                      {lawyer.renewal}
                    </div>

                    {/* Price */}
                    <div className="case-details-lawyer-price">{lawyer.price}</div>

                    {/* Arrow */}
                    <div className="case-details-lawyer-arrow">
                      <i className="bi bi-chevron-right"></i>
                    </div>
                  </div>
                </div>
              ))}
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
              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="acceptTerms" />
                <label className="form-check-label ms-2" htmlFor="acceptTerms">
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
    </div>
  );
};

export default Details;
