import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import Loader from "../../components/Loader.jsx";
import TimingModal from "../../components/TimingModal.jsx";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService.js";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import ImageUpload from "../../components/ImageUpload.jsx";
import ImageDropzone from "../../components/ImageDropzone.jsx";
import Select from "react-select";

const EmployerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [tab, setTab] = useState("info");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [pageLoader, setPageLoader] = useState(false);
  const [files, setFiles] = useState(null);

  const [businessTypeOptions, setBusinessTypeOptions] = useState([]);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoader, setIsLoader] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    // Employer Name
    if (!formData.name.trim()) {
      newErrors.name = "Employer name is required";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    // Industry
    if (!formData.industry.trim()) {
      newErrors.industry = "Industry is required";
    }

    // Description
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    description: "",
    industry: "",
    employerSize: "",
    foundedYear: "",
    logo: "",
    coverImages: [],
    status: "Pending",
    isActive: true,
    verificationStatus: "Unverified",
    benefits: [],
    facilities: [],
    address: {
      street: "",
      city: "",
      state: "",
      country: "UAE",
      zipCode: ""
    },
    socialMedia: {
      linkedin: "",
      twitter: "",
      facebook: ""
    },
    contactPerson: {
      name: "",
      position: "",
      email: "",
      phone: ""
    }
  });

  // Fetch Business Types
  useEffect(() => {
    (async () => {
      try {
        setIsLoader(true);
        const res = await ApiService.request({
          method: "GET",
          url: "business_types-list",
        });

        const types = res.data.data;
        setBusinessTypeOptions(types);
      } catch (err) {
        console.error("Error fetching business types:", err);
        toast.error("Failed to load business types");
      } finally {
        setIsLoader(false);
      }
    })();
  }, []);

  // Fetch Services
  useEffect(() => {
    (async () => {
      try {
        setIsLoader(true);
        const res = await ApiService.request({
          method: "GET",
          url: "services-list",
        });

        const services = res.data.data;
        setServicesOptions(services);
      } catch (err) {
        console.error("Error fetching services:", err);
        toast.error("Failed to load services");
      } finally {
        setIsLoader(false);
      }
    })();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    getSingleData();
  };

  const getSingleData = async () => {
    try {
      setPageLoader(true);
      const response = await ApiService.request({
        method: "GET",
        url: `employers/${id}`,
        data: { get_for: "edit" },
      });

      const data = response.data;
      if (data.status) {
        const employer = data.data;
        delete employer.password;
        setFormData(employer);
      } else {
        toast.error(data.message);
      }
      setPageLoader(false);
    } catch (error) {
      setPageLoader(false);
      console.error("Error fetching employer detail:", error);
    }
  };
  useEffect(() => {
    if (id) getSingleData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoader(true);

    try {
      const form = new FormData();

      if (id) {
        form.append("_id", id);
      }

      // Object.entries(formData).forEach(([key, value]) => {
      //   if (key === "_id") return;

      //   if (key === "cover_images" && value?.length > 0) {
      //     Array.from(value).forEach((file) =>
      //       form.append("cover_images[]", file)
      //     );
      //   } else if (key === "services" && Array.isArray(value)) {
      //     value.forEach((s) => form.append("services[]", s));
      //   } else if (
      //     ["skills", "facilities", "requirements"].includes(key) &&
      //     Array.isArray(value)
      //   ) {
      //     const csv = value
      //       .map((v) => (v && typeof v === "object" && v._id ? v._id : v))
      //       .join(",");
      //     form.append(key, csv);
      //   } else {
      //     form.append(key, value ?? "");
      //   }
      // });

      Object.entries(formData).forEach(([key, value]) => {
  if (key === "_id") return;

  // Logo
  if (key === "logo") {
    if (value instanceof File) {
      form.append("logo", value); // new upload
    } else if (typeof value === "string" && value) {
      form.append("old_logo", value); // keep old one
    }
  }

  // Cover Images
  else if (key === "cover_images" && value?.length > 0) {
    Array.from(value).forEach((file) => form.append("cover_images[]", file));
  } else if (key === "old_cover_images" && value?.length > 0) {
    value.forEach((img) => form.append("old_cover_images[]", img));
  }

  // Services (multiple IDs)
  else if (key === "services" && Array.isArray(value)) {
    value.forEach((s) => form.append("services[]", s));
  }

  // Other arrays as CSV
  else if (["skills", "facilities", "requirements"].includes(key) && Array.isArray(value)) {
    const csv = value
      .map((v) => (v && typeof v === "object" && v._id ? v._id : v))
      .join(",");
    form.append(key, csv);
  }

  // Default
  else if (key !== "cover_images" && key !== "old_cover_images") {
    form.append(key, value ?? "");
  }
});


      const response = await ApiService.request({
        method: "POST",
        url: `employers/createOrUpdate/${id}`,
        data: form,
      });

      const data = response.data;
      if (data.status) {
        toast.success(data.message);
        navigate("/companies");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating employer:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <div className="d-flex flex-column flex-column-fluid">
      {/* Toolbar */}
      <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
        <div
          id="kt_app_toolbar_container"
          className="app-container container-xxl d-flex flex-stack"
        >
          <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
              {id ? "Edit" : "Add New"} Employer
            </h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
              <li className="breadcrumb-item text-muted">
                <a href="/dashboard" className="text-muted text-hover-primary">
                  Dashboard
                </a>
              </li>
              <li className="breadcrumb-item">
                <span className="bullet bg-gray-400 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-muted">
                <a href="/companies" className="text-muted text-hover-primary">
                  Employers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Content */}
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="app-container container-xxl"
        >
          <div className="card">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className={`nav-link fs-lg-5 ${
                    tab === "info" ? "active" : ""
                  }`}
                  onClick={() => setTab("info")}
                  id="nav-profile-tab"
                  type="button"
                >
                  <i className="bi bi-envelope-fill"></i> Employer Info
                </button>
              </div>
            </nav>
            <div className="card-body pt-0">
              {/* Info Form */}
              {tab === "info" && (
                <form
                  encType="multipart/form-data"
                  method="POST"
                  className="form fv-plugins-bootstrap5 fv-plugins-framework"
                  onSubmit={handleSubmit}
                >
                  <div className="row g-9 my-3">
                    {/* Employer Name */}
                    <div className="col-md-6 fv-row">
                      <label className="required fs-6 fw-semibold mb-2">
                        Employer Name
                      </label>
                      <input
                        type="text"
                        className={`form-control form-control-solid ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Employer Name"
                        value={formData.name || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                      />
                      {errors.name && (
                        <div className="invalid-feedback">
                          {errors.name}
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="col-md-6 fv-row">
                      <label className="required fs-6 fw-semibold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`form-control form-control-solid ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Employer Email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="phone" className="required">
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className={`form-control ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">{errors.phone}</div>
                      )}
                    </div>

                    {/* Website */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="website">Website</label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        className="form-control"
                        placeholder="https://example.com"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                      />
                    </div>

                    {/* Industry */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="industry" className="required">
                        Industry
                      </label>
                      <input
                        type="text"
                        id="industry"
                        name="industry"
                        className={`form-control ${
                          errors.industry ? "is-invalid" : ""
                        }`}
                        placeholder="e.g., Technology, Healthcare, Finance"
                        value={formData.industry}
                        onChange={(e) =>
                          setFormData({ ...formData, industry: e.target.value })
                        }
                      />
                      {errors.industry && (
                        <div className="invalid-feedback">{errors.industry}</div>
                      )}
                    </div>

                    {/* Employer Size */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="employerSize">Employer Size</label>
                      <select
                        id="employerSize"
                        name="employerSize"
                        className="form-control"
                        value={formData.employerSize}
                        onChange={(e) =>
                          setFormData({ ...formData, employerSize: e.target.value })
                        }
                      >
                        <option value="">Select Employer Size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>

                    {/* Founded Year */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="foundedYear">Founded Year</label>
                      <input
                        type="number"
                        id="foundedYear"
                        name="foundedYear"
                        className="form-control"
                        placeholder="e.g., 2020"
                        value={formData.foundedYear}
                        onChange={(e) =>
                          setFormData({ ...formData, foundedYear: e.target.value })
                        }
                      />
                    </div>

                    {/* Contact Person Name */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="name">Contact Person Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="form-control"
                        placeholder="Enter contact name"
                      />
                    </div>

                    {/* Phone Code */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="phone_code" className="required">
                        Phone Code
                      </label>
                      <input
                        type="text"
                        id="phone_code"
                        name="phone_code"
                        value={formData.phone_code}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone_code: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="+1 / +91 etc."
                      />
                      {errors.phone_code && (
                        <div className="text-danger small mt-1">
                          {errors.phone_code}
                        </div>
                      )}
                    </div>

                    {/* Business type */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="business_type" className="required">
                        Business Type
                      </label>
                      <Dropdown
                        value={formData.business_type_id}
                        options={businessTypeOptions}
                        optionLabel="title"
                        optionValue="_id"
                        onChange={(selectedOption) =>
                          setFormData({
                            ...formData,
                            business_type_id: selectedOption.value,
                          })
                        }
                        placeholder="Select Business Type"
                        filter
                        checkmark={true}
                      />
                      {errors.business_type_id && (
                        <div className="text-danger small mt-1">
                          {errors.business_type_id}
                        </div>
                      )}
                    </div>

                    {/* Services */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="services" className="required">
                        Services
                      </label>
                      <MultiSelect
                        value={formData.services}
                        options={servicesOptions}
                        optionLabel="title"
                        optionValue="_id"
                        onChange={(e) =>
                          setFormData({ ...formData, services: e.value })
                        }
                        placeholder="Select Services"
                        filter
                        className="form-control"
                      />
                      {errors.services && (
                        <div className="text-danger small mt-1">
                          {errors.services}
                        </div>
                      )}
                    </div>

                    {/* Logo */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="logo">Employer Logo</label>

                      <ImageUpload
                        name="logo"
                        defaultPreviewUrl={formData.logo}
                        onImageChange={(field, file) =>
                          setFormData({ ...formData, [field]: file })
                        }
                      />
                    </div>

                    {/* Cover Images */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="cover_images">Cover Images</label>

                      <ImageDropzone
                        oldFiles={formData.old_cover_images || []}
                        setFiles={(files) =>
                          setFormData({ ...formData, cover_images: files })
                        }
                        updateOldImages={(updated) =>
                          setFormData({
                            ...formData,
                            old_cover_images: updated,
                          })
                        }
                      />
                    </div>

                    {/* Mission */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="mission">Mission</label>
                      <input
                        type="text"
                        id="mission"
                        name="mission"
                        value={formData.mission}
                        onChange={(e) =>
                          setFormData({ ...formData, mission: e.target.value })
                        }
                        className="form-control"
                        placeholder="Enter mission"
                      />
                    </div>

                    {/* Location */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="form-control"
                        placeholder="Enter employer location"
                      />
                    </div>

                    {/* Values */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="values">Values</label>
                      <input
                        type="text"
                        id="values"
                        name="values"
                        value={formData.values}
                        onChange={(e) =>
                          setFormData({ ...formData, values: e.target.value })
                        }
                        className="form-control"
                        placeholder="Enter employer values"
                      />
                    </div>

                    {/* Address */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="form-control"
                        placeholder="Enter Address"
                      />
                    </div>

                    {/* Employer Size */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="employer_size">Employer Size</label>
                      <input
                        type="text"
                        id="employer_size"
                        name="employer_size"
                        value={formData.employer_size}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            employer_size: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="e.g. 50-100 employees"
                      />
                    </div>
                    {/* Description */}
                    <div className="col-md-12 fv-row">
                      <label htmlFor="description" className="required">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        className={`form-control ${
                          errors.description ? "is-invalid" : ""
                        }`}
                        placeholder="Enter employer description"
                      />
                      {errors.description && (
                        <div className="invalid-feedback">{errors.description}</div>
                      )}
                    </div>

                    {/* Address Section */}
                    <div className="col-md-12">
                      <h5 className="mb-3">Address Information</h5>
                    </div>
                    
                    <div className="col-md-6 fv-row">
                      <label htmlFor="street">Street Address</label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        className="form-control"
                        placeholder="Enter street address"
                        value={formData.address.street}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            address: { ...formData.address, street: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6 fv-row">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        placeholder="Enter city"
                        value={formData.address.city}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            address: { ...formData.address, city: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6 fv-row">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="form-control"
                        placeholder="Enter state"
                        value={formData.address.state}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            address: { ...formData.address, state: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6 fv-row">
                      <label htmlFor="zipCode">ZIP Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        className="form-control"
                        placeholder="Enter ZIP code"
                        value={formData.address.zipCode}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            address: { ...formData.address, zipCode: e.target.value }
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="text-center mt-3">
                    <button
                      type="button"
                      className="btn btn-light me-3"
                      onClick={() => navigate("/companies")}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-base"
                      disabled={isLoader}
                    >
                      <span className="indicator-label" hidden={isLoader}>
                        Submit
                      </span>
                      {isLoader && <Loader size={20} text="Submitting" />}
                    </button>
                  </div>
                </form>
              )}

              {isModalOpen && (
                <TimingModal branchId={id} closeModal={handleCloseModal} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerForm;
