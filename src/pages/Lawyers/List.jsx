import React, { useState, useEffect } from "react";
import notificationProfile from "../../assets/images/lawyerImg.png";

const List = () => {
  const [selectedFilter, setSelectedFilter] = useState("Company");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showJurisdictionDropdown, setShowJurisdictionDropdown] = useState(false);

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
      description: "Leading commercial law firm specializing in corporate transactions and business law."
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
      description: "Premier corporate law firm with expertise in mergers, acquisitions, and corporate governance."
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
      description: "Specialized real estate law firm handling property transactions and development projects."
    }
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
      description: "Experienced criminal defense attorney with 15+ years of practice in UAE courts."
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
      description: "Dedicated family law practitioner specializing in divorce, custody, and inheritance matters."
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
      description: "Expert immigration lawyer helping clients with visa applications and residency matters."
    }
  ];

  const categories = ["Commercial Law", "Corporate Law", "Criminal Law", "Family Law", "Real Estate Law", "Immigration Law", "Tax Law"];
  const jurisdictions = ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"];

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
        data = data.filter(lawyer => lawyer.category === selectedCategory);
      }
    } else if (selectedFilter === "Jurisdiction") {
      // Show all lawyers from both company and individual, filtered by jurisdiction
      data = [...companyLawyers, ...individualLawyers];
      if (selectedJurisdiction) {
        data = data.filter(lawyer => lawyer.jurisdiction === selectedJurisdiction);
      }
    }

    // Apply search filter
    if (searchTerm) {
      data = data.filter(lawyer => {
        const searchableText = selectedFilter === "Individual" 
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
      if (!event.target.closest('.position-relative')) {
        setShowCategoryDropdown(false);
        setShowJurisdictionDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
                       border: selectedFilter === filter ? "none" : "1px solid #e9ecef",
                       minWidth: "120px",
                       height: "40px",
                       display: "flex",
                       alignItems: "center",
                       justifyContent: "center",
                       gap: "8px",
                     }}
                   >
                     {selectedCategory || filter}
                     <i className="bi bi-chevron-down" style={{ fontSize: "0.8rem" }}></i>
                   </button>
                   
                   {showCategoryDropdown && (
                     <div className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow-lg" style={{ zIndex: 1000, minWidth: "200px" }}>
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
                       border: selectedFilter === filter ? "none" : "1px solid #e9ecef",
                       minWidth: "120px",
                       height: "40px",
                       display: "flex",
                       alignItems: "center",
                       justifyContent: "center",
                       gap: "8px",
                     }}
                   >
                     {selectedJurisdiction || filter}
                     <i className="bi bi-chevron-down" style={{ fontSize: "0.8rem" }}></i>
                   </button>
                   
                   {showJurisdictionDropdown && (
                     <div className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow-lg" style={{ zIndex: 1000, minWidth: "200px" }}>
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
                     border: selectedFilter === filter ? "none" : "1px solid #e9ecef",
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
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <div
                className="card-img-top position-relative"
                style={{
                  borderTopRightRadius: "15px",
                  borderTopLeftRadius: "15px",
                  overflow: "hidden"
                }}
              >
                <img
                  src={lawyer.image}
                  className="card-img-top"
                  alt={lawyer.type === "Individual" ? lawyer.name : lawyer.firmName}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    width: "100%",
                    borderTopRightRadius: "15px",
                    borderTopLeftRadius: "15px"
                  }}
                />
              </div>
              <div className="card-body p-4">
                {lawyer.type === "Individual" ? (
                  <>
                    <h5 className="card-title fw-bold text-dark mb-2" style={{ fontSize: "1.1rem", lineHeight: "1.3" }}>
                      {lawyer.name}
                    </h5>
                    <p className="text-muted mb-3" style={{ fontSize: "0.9rem", fontWeight: "500" }}>{lawyer.title}</p>
                    <div className="d-flex align-items-center justify-content-start mb-3">
                      <div className="d-flex align-items-center me-5">
                        <i className="bi bi-star-fill text-warning me-1" style={{ fontSize: "0.9rem" }}></i>
                        <span className="fw-bold text-dark" style={{ fontSize: "0.9rem" }}>
                          {lawyer.rating}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-geo-alt-fill text-muted me-1" style={{ fontSize: "0.8rem" }}></i>
                        <span className="text-muted" style={{ fontSize: "0.85rem" }}>{lawyer.location}</span>
                      </div>
                    </div>
                    <p className="text-muted mb-0" style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>{lawyer.specialization}</p>
                  </>
                ) : (
                  <>
                    <h5 className="card-title fw-bold text-dark mb-2" style={{ fontSize: "1.1rem", lineHeight: "1.3" }}>
                      {lawyer.firmName}
                    </h5>
                    <div className="d-flex align-items-center justify-content-start mb-3">
                      <div className="d-flex align-items-center me-5">
                        <i className="bi bi-star-fill text-warning me-1" style={{ fontSize: "0.9rem" }}></i>
                        <span className="fw-bold text-dark" style={{ fontSize: "0.9rem" }}>
                          {lawyer.rating}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-geo-alt-fill text-muted me-1" style={{ fontSize: "0.8rem" }}></i>
                        <span className="text-muted" style={{ fontSize: "0.85rem" }}>{lawyer.location}</span>
                      </div>
                    </div>
                    <p className="text-muted mb-0" style={{ fontSize: "0.8rem", lineHeight: "1.4" }}>{lawyer.specialization}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
