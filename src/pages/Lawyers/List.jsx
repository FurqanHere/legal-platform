import React, { useState, useEffect } from "react";
import notificationProfile from "../../assets/images/lawyerImg.png";

import appleLogo from "../../assets/images/apple-logo.png"

import layerDetail1 from "../../assets/images/layerDetail1.png";

const List = () => {
  const [selectedFilter, setSelectedFilter] = useState("Company");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showJurisdictionDropdown, setShowJurisdictionDropdown] =
    useState(false);
  const [showLawyerDetail, setShowLawyerDetail] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  const handleLawyerClick = (lawyer) => {
    setSelectedLawyer(lawyer);
    setShowLawyerDetail(true);
  };

  // Company lawyers data
  const companyLawyers = [
    {
      id: 1,
      type: "Company",
      firmName: "Justin Justice Law Firm Company",
      rating: 4.5,
      location: "Dubai Internet City UAE",
      specialization: "Commercial Law + Jurisdiction: UAE+",
      image: notificationProfile,
      category: "Commercial Law",
      jurisdiction: "UAE",
      description:
        "Leading commercial law firm specializing in corporate transactions and business law.",
    },
    {
      id: 2,
      type: "Company",
      firmName: "Al-Rashid & Associates",
      rating: 4.8,
      location: "Abu Dhabi, UAE",
      specialization: "Corporate Law + Jurisdiction: UAE+",
      image: notificationProfile,
      category: "Corporate Law",
      jurisdiction: "UAE",
      description:
        "Premier corporate law firm with expertise in mergers, acquisitions, and corporate governance.",
    },
    {
      id: 3,
      type: "Company",
      firmName: "Dubai Legal Partners",
      rating: 4.3,
      location: "Dubai, UAE",
      specialization: "Real Estate Law + Jurisdiction: UAE+",
      image: notificationProfile,
      category: "Real Estate Law",
      jurisdiction: "UAE",
      description:
        "Specialized real estate law firm handling property transactions and development projects.",
    },
  ];

  // Individual lawyers data
  const individualLawyers = [
    {
      id: 4,
      type: "Individual",
      name: "Dr. Sarah Ahmed",
      title: "Senior Partner",
      rating: 4.9,
      location: "Dubai, UAE",
      specialization: "Criminal Defense + Jurisdiction: UAE+",
      image: notificationProfile,
      category: "Criminal Law",
      jurisdiction: "UAE",
      description:
        "Experienced criminal defense attorney with 15+ years of practice in UAE courts.",
    },
    {
      id: 5,
      type: "Individual",
      name: "Mohammed Al-Zahra",
      title: "Senior Associate",
      rating: 4.6,
      location: "Abu Dhabi, UAE",
      specialization: "Family Law + Jurisdiction: UAE+",
      image: notificationProfile,
      category: "Family Law",
      jurisdiction: "UAE",
      description:
        "Dedicated family law practitioner specializing in divorce, custody, and inheritance matters.",
    },
    {
      id: 6,
      type: "Individual",
      name: "Emily Johnson",
      title: "Partner",
      rating: 4.7,
      location: "Dubai, UAE",
      specialization: "Immigration Law + Jurisdiction: UAE+",
      image: notificationProfile,
      category: "Immigration Law",
      jurisdiction: "UAE",
      description:
        "Expert immigration lawyer helping clients with visa applications and residency matters.",
    },
  ];

  const categories = [
    "Commercial Law",
    "Corporate Law",
    "Criminal Law",
    "Family Law",
    "Real Estate Law",
    "Immigration Law",
    "Tax Law",
  ];
  const jurisdictions = [
    "UAE",
    "Saudi Arabia",
    "Qatar",
    "Kuwait",
    "Bahrain",
    "Oman",
  ];

  const filters = ["Company", "Individual", "Categories", "Jurisdiction"];

  // Get current data based on selected filter
  const getCurrentData = () => {
    let data = [];

    if (selectedFilter === "Company") {
      data = companyLawyers;
    } else if (selectedFilter === "Individual") {
      data = individualLawyers;
    } else if (selectedFilter === "Categories") {
      // Show all lawyers from both company and individual, filtered by category
      data = [...companyLawyers, ...individualLawyers];
      if (selectedCategory) {
        data = data.filter((lawyer) => lawyer.category === selectedCategory);
      }
    } else if (selectedFilter === "Jurisdiction") {
      // Show all lawyers from both company and individual, filtered by jurisdiction
      data = [...companyLawyers, ...individualLawyers];
      if (selectedJurisdiction) {
        data = data.filter(
          (lawyer) => lawyer.jurisdiction === selectedJurisdiction
        );
      }
    }

    // Apply search filter
    if (searchTerm) {
      data = data.filter((lawyer) => {
        const searchableText =
          selectedFilter === "Individual"
            ? `${lawyer.name} ${lawyer.title} ${lawyer.specialization} ${lawyer.location}`
            : `${lawyer.firmName} ${lawyer.specialization} ${lawyer.location}`;
        return searchableText.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    return data;
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    if (filter !== "Categories") {
      setSelectedCategory("");
    }
    if (filter !== "Jurisdiction") {
      setSelectedJurisdiction("");
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const handleJurisdictionSelect = (jurisdiction) => {
    setSelectedJurisdiction(jurisdiction);
    setShowJurisdictionDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".position-relative")) {
        setShowCategoryDropdown(false);
        setShowJurisdictionDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container-fluid">
      {/* Search and Filter Section */}
      <div className="row mb-4" style={{ marginTop: "30px" }}>
        <div className="col-12 px-0">
          {/* Search Bar */}
          <div
            className="d-flex justify-content-center mb-4 bg-white"
            style={{
              borderBottom: "1px solid #e6e6e6",
              borderTop: "1px solid #e6e6e6",
            }}
          >
            <div
              className="position-relative my-5"
              style={{ width: "100%", maxWidth: "1096px" }}
            >
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: "50px",
                  paddingRight: "20px",
                  height: "50px",
                  border: "1px solid #e9ecef",
                  backgroundColor: "#ffffff",
                  borderRadius: "25px",
                  fontSize: "1rem",
                  boxShadow: "none",
                }}
              />
              <i
                className="bi bi-search position-absolute top-50 translate-middle-y text-muted fs-5"
                style={{ left: "20px" }}
              ></i>
            </div>
          </div>
        </div>
        {/* Filter Buttons */}
        <div className="d-flex justify-content-start gap-3 flex-wrap">
          {filters.map((filter) => (
            <div key={filter} className="position-relative">
              {filter === "Categories" ? (
                <div className="position-relative">
                  <button
                    className={`btn px-4 py-2 ${
                      selectedFilter === filter
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => {
                      handleFilterClick(filter);
                      setShowCategoryDropdown(!showCategoryDropdown);
                      setShowJurisdictionDropdown(false);
                    }}
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      borderRadius: "25px",
                      border:
                        selectedFilter === filter
                          ? "none"
                          : "1px solid #e9ecef",
                      minWidth: "120px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {selectedCategory || filter}
                    <i
                      className="bi bi-chevron-down"
                      style={{ fontSize: "0.8rem" }}
                    ></i>
                  </button>

                  {showCategoryDropdown && (
                    <div
                      className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow-lg"
                      style={{ zIndex: 1000, minWidth: "200px" }}
                    >
                      {categories.map((category) => (
                        <button
                          key={category}
                          className="btn btn-light w-100 text-start px-3 py-2 border-0"
                          onClick={() => handleCategorySelect(category)}
                          style={{ fontSize: "0.9rem" }}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : filter === "Jurisdiction" ? (
                <div className="position-relative">
                  <button
                    className={`btn px-4 py-2 ${
                      selectedFilter === filter
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => {
                      handleFilterClick(filter);
                      setShowJurisdictionDropdown(!showJurisdictionDropdown);
                      setShowCategoryDropdown(false);
                    }}
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      borderRadius: "25px",
                      border:
                        selectedFilter === filter
                          ? "none"
                          : "1px solid #e9ecef",
                      minWidth: "120px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {selectedJurisdiction || filter}
                    <i
                      className="bi bi-chevron-down"
                      style={{ fontSize: "0.8rem" }}
                    ></i>
                  </button>

                  {showJurisdictionDropdown && (
                    <div
                      className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow-lg"
                      style={{ zIndex: 1000, minWidth: "200px" }}
                    >
                      {jurisdictions.map((jurisdiction) => (
                        <button
                          key={jurisdiction}
                          className="btn btn-light w-100 text-start px-3 py-2 border-0"
                          onClick={() => handleJurisdictionSelect(jurisdiction)}
                          style={{ fontSize: "0.9rem" }}
                        >
                          {jurisdiction}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className={`btn px-4 py-2 ${
                    selectedFilter === filter
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleFilterClick(filter)}
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    borderRadius: "25px",
                    border:
                      selectedFilter === filter ? "none" : "1px solid #e9ecef",
                    minWidth: "120px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {filter}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lawyers Grid */}
      <div className="row">
        {getCurrentData().map((lawyer) => (
          <div key={lawyer.id} className="col-lg-4 col-md-6 mb-4">
            <div
              className="card h-100 shadow-sm"
              style={{
                borderRadius: "15px",
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
              onClick={() => handleLawyerClick(lawyer)}
            >
              <div
                className="card-img-top position-relative"
                style={{
                  borderTopRightRadius: "15px",
                  borderTopLeftRadius: "15px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={lawyer.image}
                  className="card-img-top"
                  alt={
                    lawyer.type === "Individual" ? lawyer.name : lawyer.firmName
                  }
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    width: "100%",
                    borderTopRightRadius: "15px",
                    borderTopLeftRadius: "15px",
                  }}
                />
              </div>
              <div className="card-body p-4">
                {lawyer.type === "Individual" ? (
                  <>
                    <h5
                      className="card-title fw-bold text-dark mb-2"
                      style={{ fontSize: "1.1rem", lineHeight: "1.3" }}
                    >
                      {lawyer.name}
                    </h5>
                    <p
                      className="text-muted mb-3"
                      style={{ fontSize: "0.9rem", fontWeight: "500" }}
                    >
                      {lawyer.title}
                    </p>
                    <div className="d-flex align-items-center justify-content-start mb-3">
                      <div className="d-flex align-items-center me-5">
                        <i
                          className="bi bi-star-fill text-warning me-1"
                          style={{ fontSize: "0.9rem" }}
                        ></i>
                        <span
                          className="fw-bold text-dark"
                          style={{ fontSize: "0.9rem" }}
                        >
                          {lawyer.rating}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <i
                          className="bi bi-geo-alt-fill text-muted me-1"
                          style={{ fontSize: "0.8rem" }}
                        ></i>
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.85rem" }}
                        >
                          {lawyer.location}
                        </span>
                      </div>
                    </div>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.8rem", lineHeight: "1.4" }}
                    >
                      {lawyer.specialization}
                    </p>
                  </>
                ) : (
                  <>
                    <h5
                      className="card-title fw-bold text-dark mb-2"
                      style={{ fontSize: "1.1rem", lineHeight: "1.3" }}
                    >
                      {lawyer.firmName}
                    </h5>
                    <div className="d-flex align-items-center justify-content-start mb-3">
                      <div className="d-flex align-items-center me-5">
                        <i
                          className="bi bi-star-fill text-warning me-1"
                          style={{ fontSize: "0.9rem" }}
                        ></i>
                        <span
                          className="fw-bold text-dark"
                          style={{ fontSize: "0.9rem" }}
                        >
                          {lawyer.rating}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <i
                          className="bi bi-geo-alt-fill text-muted me-1"
                          style={{ fontSize: "0.8rem" }}
                        ></i>
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.85rem" }}
                        >
                          {lawyer.location}
                        </span>
                      </div>
                    </div>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.8rem", lineHeight: "1.4" }}
                    >
                      {lawyer.specialization}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lawyer Detail Offcanvas */}
      {showLawyerDetail && selectedLawyer && (
        <div
          className="offcanvas offcanvas-end show"
          tabIndex="-1"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            visibility: "visible",
            width: "667px",
            transition: "all 0.3s ease",
            borderRadius: "15px",
            margin: "20px",
            zIndex: 1045,
          }}
        >
          <div className="offcanvas-header border-bottom">
            <div className="d-flex justify-content-between align-items-center w-100">
              <h5 className="mb-0 fw-bold">Lawyer Detail</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowLawyerDetail(false)}
              ></button>
            </div>
          </div>

          <div
            className="offcanvas-body p-0 d-flex flex-column"
            style={{ height: "100%" }}
          >
            <div className="p-4 flex-grow-1" style={{ overflowY: "auto" }}>
              {/* Main Image */}
              <div className="mb-4">
                <img
                  src={selectedLawyer.image}
                  alt={
                    selectedLawyer.type === "Individual"
                      ? selectedLawyer.name
                      : selectedLawyer.firmName
                  }
                  className="w-100 rounded"
                  style={{ height: "250px", objectFit: "cover" }}
                />
              </div>

              {/* Thumbnail Images */}
              <div className="d-flex gap-2 mb-4">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="rounded">
                    <img
                      src={layerDetail1}
                      style={{
                        width: "141px",
                        height: "113px",
                        borderRadius: "10px",
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #e9ecef",
                      }}
                      alt=""
                    />
                  </div>
                ))}
              </div>

              {/* Location */}
              <div className="mb-2">
                <small style={{ color: "#696969", fontSize: "15px" }}>{selectedLawyer.location}</small>
              </div>

              {/* Name and Rating */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold mb-0" style={{ fontSize: "25px", color: "#222222" }}>
                  {selectedLawyer.type === "Individual"
                    ? selectedLawyer.name
                    : selectedLawyer.firmName}
                </h4>
                <div className="d-flex align-items-center">
                  <span className="text-muted me-2">
                    {selectedLawyer.type === "Individual"
                      ? selectedLawyer.title
                      : "Law Firm"}
                  </span>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    <span className="fw-bold">{selectedLawyer.rating}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mb-4" style={{ lineHeight: "1.6", color: "#474747" }}>
                {selectedLawyer.description ||
                  "Experienced legal professional with expertise in various areas of law. Committed to providing high-quality legal services and achieving the best outcomes for clients."}
              </p>

              {/* Services */}
              <div className="mb-4">
                <h1 className="fw-bold text-dark mb-3">Services</h1>
                <div className="d-flex flex-column gap-2" style={{ color: "#696969" }}>
                  {[
                    "Legal consultation and advice",
                    "Document preparation and review",
                    "Court representation",
                    "Contract negotiation",
                  ].map((service, index) => (
                    <div key={index} className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill me-2" style={{ color: "#474747" }}></i>
                      <span className="text-muted">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="mb-4">
                <h6 className="fw-bold text-dark mb-3">Reviews</h6>

                {/* Overall Rating */}
                <div className="d-flex align-items-center mb-3">
                  <div className="d-flex me-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className="bi bi-star-fill text-warning"
                      ></i>
                    ))}
                  </div>
                  <span className="fw-bold me-2">5 out of 5</span>
                  <span className="" style={{ color: "#5D5D5D" }}>41 total review</span>
                </div>

                {/* Rating Breakdown */}
                <div className="mb-4">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div
                      key={rating}
                      className="d-flex align-items-center mb-2"
                    >
                      <span
                        className="text-muted me-2"
                        style={{ minWidth: "20px", color: "#696969" }}
                      >
                        {rating} star
                      </span>
                      
                      <div className="flex-grow-1 me-2">
                        <div
                          style={{
                            background: "#474747",
                            height: "8px",
                            width:
                              rating === 5
                                ? "100%"
                                : rating === 4
                                ? "75%"
                                : rating === 3
                                ? "50%"
                                : rating === 2
                                ? "25%"
                                : "0%",
                            borderRadius: "4px",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Individual Reviews */}
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-start">
                    <img
                      src={notificationProfile}
                      alt="Reviewer"
                      className="rounded-circle me-3"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center mb-1">
                        <span className="fw-bold me-2">Mark Jorden</span>
                        <div className="d-flex me-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <i
                              key={star}
                              className="bi bi-star-fill text-warning"
                              style={{ fontSize: "0.8rem" }}
                            ></i>
                          ))}
                        </div>
                        <small className="text-muted">2 hour ago</small>
                      </div>
                      <p
                        className="text-muted mb-0"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Excellent service and professional approach. Highly
                        recommended!
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start">
                    <img
                      src={notificationProfile}
                      alt="Reviewer"
                      className="rounded-circle me-3"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center mb-1">
                        <span className="fw-bold me-2">Shamra Joseph</span>
                        <div className="d-flex me-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <i
                              key={star}
                              className="bi bi-star-fill text-warning"
                              style={{ fontSize: "0.8rem" }}
                            ></i>
                          ))}
                        </div>
                        <small className="text-muted">2 hour ago</small>
                      </div>
                      <p
                        className="text-muted mb-0"
                        style={{ fontSize: "0.9rem" }}
                      >
                        Great experience working with this lawyer. Very
                        knowledgeable and helpful.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing and Action Section - Fixed at bottom */}
            <div className="p-4 border-top" style={{ backgroundColor: "#fff", borderRadius: "15px" }}>
              {/* Pricing Options */}
              <div className="mb-4">
                <div className="d-flex flex-column gap-2">
                  <div
                    className="d-flex align-items-center justify-content-between p-3 rounded text-white"
                    style={{
                      backgroundColor: "#030CCB",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: "#fff",
                        }}
                      >
                        <i
                          className="bi bi-check text-black"
                          style={{ fontSize: "1rem" }}
                        ></i>
                      </div>
                      <span className="fw-bold">฿ 150.00 / week</span>
                    </div>
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-between p-3 rounded"
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #e9ecef",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: "#fff",
                          border: "1px solid #e9ecef",
                        }}
                      ></div>
                      <span className="fw-bold">฿ 150.00 / week</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-3">
                <button
                  className="btn flex-grow-1 d-flex align-items-center justify-content-center rounded-pill"
                  style={{ height: "55px", width: "286px", background: "#9C9C9C" }}
                >
                  <img src= { appleLogo } style={{ width: "22.54px", height: "28px" }} alt="" />
                </button>
                <button
                  className="btn flex-grow-1 text-white rounded-pill"
                  style={{ height: "55px", width: "299px", background: "#474747", fontWeight: "600", fontSize: "20px" }}
                >
                  Get Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for Lawyer Detail */}
      {showLawyerDetail && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={() => setShowLawyerDetail(false)}
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

export default List;
