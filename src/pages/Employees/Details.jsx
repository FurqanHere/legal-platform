import React, { useState } from "react";
import { useParams } from "react-router-dom";
import circle from "../../assets/images/yellow-circle.png";
import employeeDetail from "../../assets/images/employeeDetail.png";
import "./detail.css";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [showEditProfile, setShowEditProfile] = useState(false);

  const employee = {
    id,
    name: "Noon",
    location: "Retail Riyadh, 5K–10K Employees",
    description:
      "Noon is a Saudi Arabian-headquartered, tech-driven e-commerce platform founded in 2016 by Mohamed Alabbar to cater to the Middle East's digital economy by offering a local alternative to international Read More...",
    bannerImage: employeeDetail,
    profileImage: circle,
    socialMedia: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  };

  return (
    <div className="employee-container" style={{ marginTop: "31px" }}>
      {/* Banner Section */}
      <div className="banner-wrapper">
        <img src={employee.bannerImage} alt="Banner" className="banner-image" style={{ height: "259px" }} />
      </div>

      {/* Profile Card */}
      <div className="profile-card" style={{ width: "621px", height: "681px" }}>
        <div className="profile-header">
          <div className="profile-image-wrapper">
            <img
              src={employee.profileImage}
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="profile-info">
            <h2 className="company-name">{employee.name}</h2>
            <p className="company-location">{employee.location}</p>
          </div>
          <div className="edit-button-wrapper">
            <button
              className="edit-btn"
              onClick={() => setShowEditProfile(true)}
            >
              <i className="bi bi-pencil text-white"></i> Edit Profile
            </button>
          </div>
        </div>

        <p className="company-description">{employee.description}</p>
        
        {/* Textarea in empty space */}
        <div className="company-textarea-section">
          <textarea
            className="company-textarea"
            // placeholder="Add additional information about the company..."
            style={{ height: "246px" }}
          ></textarea>
        </div>
        {/* Social Media Links */}
      <div className="social-section" style={{ marginTop: "50px", width: "37%" }}>
        <h6 className="text-center">CONNECT WITH US</h6>
        <div className="social-icons">
          <a href={employee.socialMedia.facebook}>
            <i className="bi bi-facebook text-black"></i>
          </a>
          <a href={employee.socialMedia.twitter}>
            <i className="bi bi-twitter-x text-black"></i>
          </a>
          <a href={employee.socialMedia.instagram}>
            <i className="bi bi-instagram text-black"></i>
          </a>
          <a href={employee.socialMedia.linkedin}>
            <i className="bi bi-linkedin text-black"></i>
          </a>
        </div>
      </div>
      </div>

      {/* Edit Profile Offcanvas */}
      {showEditProfile && (
        <>
          <div
            className="offcanvas-backdrop"
            onClick={() => setShowEditProfile(false)}
          ></div>
          <div className="edit-panel">
            <div className="edit-header">
              <h5>Edit Profile</h5>
              <button onClick={() => setShowEditProfile(false)}>×</button>
            </div>
            <div className="edit-body">
              <form>
                <label>Company Name</label>
                <input type="text" defaultValue={employee.name} />
                <label>Location & Size</label>
                <input type="text" defaultValue={employee.location} />
                <label>Description</label>
                <textarea
                  rows="4"
                  defaultValue={employee.description}
                ></textarea>
                <label>Banner Image</label>
                <input type="file" accept="image/*" />
                <label>Profile Image</label>
                <input type="file" accept="image/*" />
              </form>
            </div>
            <div className="edit-footer">
              <button className="save-btn">Save Changes</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeDetails;
