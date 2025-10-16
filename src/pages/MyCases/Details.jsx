import React, { useState } from "react";
import notificationProfile from "../../assets/images/notification-profile.png";

const Details = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const caseDetails = {
    caseId: "Case# 2548",
    title: "Explain Your Case",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    countryRegion: "UAE Jurisdiction",
    legalConsultant: "Legal Advisor",
    caseCategory: "Criminal Law",
    subCategory: "Crimes Against Persons",
    caseValue: "$1M",
    caseBudget: "$2000"
  };

  const lawyers = [
    {
      id: 1,
      name: "Shamra Joseph",
      role: "Corporate lawyer",
      specialization: "Criminal Law, Tax Law+",
      renewal: "Renew 21 September",
      price: "1.99 USD",
      avatar: notificationProfile
    },
    {
      id: 2,
      name: "Shamra Joseph",
      role: "Corporate lawyer",
      specialization: "Criminal Law, Tax Law+",
      renewal: "Renew 21 September",
      price: "1.99 USD",
      avatar: notificationProfile
    },
    {
      id: 3,
      name: "Shamra Joseph",
      role: "Corporate lawyer",
      specialization: "Criminal Law, Tax Law+",
      renewal: "Renew 21 September",
      price: "1.99 USD",
      avatar: notificationProfile
    },
    {
      id: 4,
      name: "Shamra Joseph",
      role: "Corporate lawyer",
      specialization: "Criminal Law, Tax Law+",
      renewal: "Renew 21 September",
      price: "1.99 USD",
      avatar: notificationProfile
    }
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
              <i className="bi bi-search position-absolute top-50 translate-middle-y text-muted fs-4 ms-4"></i>
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

      {/* Explain Your Case Section */}
      <div className="row mb-4">
        <div className="col-12 shadow rounded-4">
          <div className="card bg-white" style={{
            borderRadius: "12px",
            border: "1px solid #EEEEEE"
          }}>
            <div className="card-body p-0">
              <div className="d-flex justify-content-between align-items-start mb-3 p-4">
                <h4 className="fw-bold text-dark mb-0">{caseDetails.title}</h4>
                <span className="badge bg-light text-dark px-3 py-2 rounded-pill" style={{ fontSize: "0.9rem" }}>
                  {caseDetails.caseId}
                </span>
              </div>
              <p className="text-muted mb-0" style={{ lineHeight: "1.6", fontSize: "1rem" }}>
                {caseDetails.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Details Section */}
      <div className="row mb-4">
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="card h-100 shadow-sm" style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "none"
          }}>
            <div className="card-body p-4">
              <div className="mb-3 pb-3" style={{ borderBottom: "1px solid #e9ecef" }}>
                <small className="text-muted d-block mb-1" style={{ fontSize: "0.8rem" }}>Country Region</small>
                <span className="fw-bold text-dark" style={{ fontSize: "1rem" }}>{caseDetails.countryRegion}</span>
              </div>
              <div>
                <small className="text-muted d-block mb-1" style={{ fontSize: "0.8rem" }}>Type of legal consultant</small>
                <span className="fw-bold text-dark" style={{ fontSize: "1rem" }}>{caseDetails.legalConsultant}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
          <div className="card h-100 shadow-sm" style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "none"
          }}>
            <div className="card-body p-4">
              <div className="mb-3 pb-3" style={{ borderBottom: "1px solid #e9ecef" }}>
                <small className="text-muted d-block mb-1" style={{ fontSize: "0.8rem" }}>Select Case Category</small>
                <span className="fw-bold text-dark" style={{ fontSize: "1rem" }}>{caseDetails.caseCategory}</span>
              </div>
              <div>
                <small className="text-muted d-block mb-1" style={{ fontSize: "0.8rem" }}>Select Sub Categories</small>
                <span className="fw-bold text-dark" style={{ fontSize: "1rem" }}>{caseDetails.subCategory}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
          <div className="card h-100 shadow-sm" style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "none"
          }}>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-6 pe-2" style={{ borderRight: "1px solid #e9ecef" }}>
                  <small className="text-muted d-block mb-1" style={{ fontSize: "0.8rem" }}>Case Value</small>
                  <span className="fw-bold text-dark" style={{ fontSize: "1rem" }}>{caseDetails.caseValue}</span>
                </div>
                <div className="col-6 ps-2">
                  <small className="text-muted d-block mb-1" style={{ fontSize: "0.8rem" }}>Case Budget</small>
                  <span className="fw-bold text-dark" style={{ fontSize: "1rem" }}>{caseDetails.caseBudget}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lawyers Respond Section */}
      <div className="row">
        <div className="col-12">
          <h4 className="fw-bold text-dark mb-4">Lawyers Respond</h4>
          <div className="row">
            {lawyers.map((lawyer) => (
              <div key={lawyer.id} className="col-12 mb-3">
                <div className="card" style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "12px",
                  border: "1px solid #e9ecef"
                }}>
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <img
                          src={lawyer.avatar}
                          alt={lawyer.name}
                          className="rounded-circle me-3"
                          style={{ width: "48px", height: "48px" }}
                        />
                        <div>
                          <h6 className="fw-bold text-dark mb-1">{lawyer.name}</h6>
                          <p className="text-muted mb-1" style={{ fontSize: "0.9rem" }}>{lawyer.role}</p>
                          <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>{lawyer.specialization}</p>
                          <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>{lawyer.renewal}</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <span className="fw-semibold text-dark">{lawyer.price}</span>
                        <i className="bi bi-chevron-right text-muted fs-5"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
