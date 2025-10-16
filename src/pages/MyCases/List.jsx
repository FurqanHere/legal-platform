import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import notificationProfile from "../../assets/images/notification-profile.png";

const List = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const cases = [
    {
      id: 1,
      caseType: "Crimes Against Persons",
      caseId: "Case# 2548",
      description: "Sed ute perspiciatis unde omnis iste natious error voluptatem accusantium...",
      jurisdiction: "UAE",
      caseBudget: "$2000",
      respond: "250",
    },
    {
      id: 2,
      caseType: "Crimes Against Persons",
      caseId: "Case# 2548",
      description: "Sed ute perspiciatis unde omnis iste natious error voluptatem accusantium...",
      jurisdiction: "UAE",
      caseBudget: "$2000",
      respond: "250",
    },
    {
      id: 3,
      caseType: "Crimes Against Persons",
      caseId: "Case# 2548",
      description: "Sed ute perspiciatis unde omnis iste natious error voluptatem accusantium...",
      jurisdiction: "UAE",
      caseBudget: "$2000",
      respond: "250",
    },
    {
      id: 4,
      caseType: "Crimes Against Persons",
      caseId: "Case# 2548",
      description: "Sed ute perspiciatis unde omnis iste natious error voluptatem accusantium...",
      jurisdiction: "UAE",
      caseBudget: "$2000",
      respond: "250",
    },
    {
      id: 5,
      caseType: "Crimes Against Persons",
      caseId: "Case# 2548",
      description: "Sed ute perspiciatis unde omnis iste natious error voluptatem accusantium...",
      jurisdiction: "UAE",
      caseBudget: "$2000",
      respond: "250",
    },
    {
      id: 6,
      caseType: "Crimes Against Persons",
      caseId: "Case# 2548",
      description: "Sed ute perspiciatis unde omnis iste natious error voluptatem accusantium...",
      jurisdiction: "UAE",
      caseBudget: "$2000",
      respond: "250",
    },
    {
      id: 7,
      caseType: "Crimes Against Persons",
      caseId: "Case# 2548",
      description: "Sed ute perspiciatis unde omnis iste natious error voluptatem accusantium...",
      jurisdiction: "UAE",
      caseBudget: "$2000",
      respond: "250",
    },
    {
      id: 8,
      caseType: "Crimes Against Persons",
      caseId: "Case# 2548",
      description: "Sed ute perspiciatis unde omnis iste natious error voluptatem accusantium...",
      jurisdiction: "UAE",
      caseBudget: "$2000",
      respond: "250",
    },
    {
      id: 9,
      caseType: "Crimes Against Persons",
      caseId: "Case# 2548",
      description: "Sed ute perspiciatis unde omnis iste natious error voluptatem accusantium...",
      jurisdiction: "UAE",
      caseBudget: "$2000",
      respond: "250",
    },
  ];

  return (
    <div className="container-fluid">
      {/* Search and Filter Section */}
      <div className="row mb-4 bg-white px-4 py-5" style={{
              borderBottom: "1px solid #e6e6e6",
              borderTop: "1px solid #e6e6e6",
              marginTop: "30px",
            }}>
        <div className="col-12 px-0">
          <div className="d-flex gap-3 align-items-center">
            {/* Search Bar */}
            <div className="position-relative flex-grow-1" style={{ maxWidth: "400px" }}>
              <input
                type="text"
                className="form-control form-control-lg rounded-pill"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: "45px",
                  width: "483px",
                  height: "58px",
                  border: "1px solid #e9ecef",
                  backgroundColor: "#fff",
                }}
              />
              <i className="bi bi-search position-absolute top-50 translate-middle-y text-black fs-3 ms-4"></i>
            </div>

            {/* Filter Button */}
            <button
              className="btn btn-outline-secondary rounded-pill d-flex align-items-center gap-2"
              style={{
                fontSize: "18px",
                fontWeight: "500",
                border: "1px solid #e9ecef",
                backgroundColor: "#f8f9fa",
                width: "121px",
                height: "58px",
                marginLeft: "80px",
              }}
            >
              <i className="bi bi-funnel"></i>
              Filter
            </button>

            {/* Add New Case Button */}
            <button
              className="btn btn-outline-dark rounded-pill text-black px-4 py-2 d-flex justify-content-center align-items-center gap-2"
              style={{
                fontSize: "18px",
                fontWeight: "500",
                backgroundColor: "white",
                width: "224px",
                height: "58px",
                border: "1px solid #e9ecef",
              }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: "#000",
                }}
              >
                <i className="bi bi-plus text-white fs-1 pe-0" style={{ fontSize: "12px" }}></i>
              </div>
              Add New Case
            </button>
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="row">
        {cases.map((caseItem) => (
          <div key={caseItem.id} className="col-lg-4 col-md-6 mb-4">
            <div 
              className="card h-100 shadow-sm" 
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/my-cases/${caseItem.id}`)}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title fw-bold text-dark mb-0">
                    {caseItem.caseType}
                  </h5>
                  <span
                    className="badge bg-light text-dark px-3 py-2 rounded-pill"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {caseItem.caseId}
                  </span>
                </div>
                
                <p className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>
                  {caseItem.description}
                </p>

                <div className="row text-center">
                  <div className="col-4">
                    <div className="d-flex flex-column">
                      <small className="text-muted mb-1">Jurisdiction</small>
                      <span className="fw-bold text-dark">{caseItem.jurisdiction}</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-column">
                      <small className="text-muted mb-1">Case Budget</small>
                      <span className="fw-bold text-dark">{caseItem.caseBudget}</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-column">
                      <small className="text-muted mb-1">Respond</small>
                      <span className="fw-bold text-dark">{caseItem.respond}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
