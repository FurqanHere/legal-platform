import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import Loader from "../../components/Loader";
import TimingModal from "../../components/TimingModal";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import ImageDropzone from "../../components/ImageDropzone.jsx";
import Select from "react-select";

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("info");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [pageLoader, setPageLoader] = useState(false);
  const [files, setFiles] = useState(null);

  const [businessTypeOptions, setBusinessTypeOptions] = useState([]);
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoader, setIsLoader] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    industry: "",
    employeeSize: "",
    foundedYear: "",
    logo: "",
    coverImages: [],
    status: "Pending",
    isActive: true,
    verificationStatus: "Unverified",
    benefits: [],
    facilities: [],
    requirements: [],
    skills: [],
    services: [],
    address: {
      street: "",
      city: "",
      state: "",
      country: "UAE",
      zipCode: ""
    },
    contactPerson: {
      name: "",
      position: "",
      email: "",
      phone: ""
    }
  });

  // Fetch skills
  useEffect(() => {
    (async () => {
      try {
        setIsLoader(true);
        const res = await ApiService.request({
          method: "GET",
          url: "skills",
        });

        const skills = res.data.data;
        setSkillsOptions(skills);
      } catch (err) {
        console.error("Error fetching skills:", err);
        toast.error("Failed to load skills");
      } finally {
        setIsLoader(false);
      }
    })();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    getSingleData();
  };

  // const getSingleData = async () => {
  //   try {
  //     setPageLoader(true);
  //     const response = await ApiService.request({
  //       method: "GET",
  //       url: `users/${id}`,
  //       data: { get_for: "edit" },
  //     });

  //     const data = response.data;
  //     if (data.status) {
  //       const company = data.data;
  //       delete company.password;
  //       setFormData(company);
  //     } else {
  //       toast.error(data.message);
  //     }
  //     setPageLoader(false);
  //   } catch (error) {
  //     setPageLoader(false);
  //   }
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsLoader(true);

  //   try {
  //     const form = new FormData();
  //     Object.entries(formData).forEach(([key, value]) => {
  //       form.append(key, value);
  //     });

  //     const response = await ApiService.request({
  //       method: "POST",
  //       url: `users/createOrUpdate/`,
  //       data: form,
  //     });

  //     const data = response.data;
  //     if (data.status) {
  //       toast.success(data.message);
  //       navigate("/users");
  //     } else {
  //       toast.error(data.message);
  //     }
  //     setIsLoader(false);
  //   } catch (error) {
  //     setIsLoader(false);
  //   }
  // };

  const getSingleData = async () => {
    try {
      setPageLoader(true);
      const response = await ApiService.request({
        method: "GET",
        url: `employees/${id}`,
        data: { get_for: "edit" },
      });

      const data = response.data;
      if (data.status) {
        const company = data.data;
        delete company.password;

        console.log("Employee languages:", company.languages);

        setFormData((prev) => ({
          ...prev,
          ...company,
          languages: company.languages ?? [],
        }));
      } else {
        toast.error(data.message);
      }
      setPageLoader(false);
    } catch (error) {
      setPageLoader(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoader(true);

    try {
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value) || typeof value === "object") {
          form.append(key, JSON.stringify(value));
        } else {
          form.append(key, value ?? "");
        }
      });

      const response = await ApiService.request({
        method: "POST",
        url: `employees/createOrUpdate/${id}`,
        data: form,
      });

      const data = response.data;
      if (data.status) {
        toast.success(data.message);
        navigate("/users");
      } else {
        toast.error(data.message);
      }
      setIsLoader(false);
    } catch (error) {
      console.error(error);
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
              {id ? "Edit" : "Add New"} Employee
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
                <a href="/users" className="text-muted text-hover-primary">
                  Employees
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
                  <i className="bi bi-envelope-fill"></i> Employee Info
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
                    {/* Employee Name */}
                    <div className="col-md-6 fv-row">
                      <label className="required fs-6 fw-semibold mb-2">
                        Employee Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter Employee Name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    {/* Email */}
                    <div className="col-md-6 fv-row">
                      <label className="required fs-6 fw-semibold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-solid"
                        placeholder="Enter Employee Email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    {/* Phone */}
                    <div className="col-md-6 fv-row">
                      <label className="required fs-6 fw-semibold mb-2">Phone</label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter phone number"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    {/* Industry */}
                    <div className="col-md-6 fv-row">
                      <label className="required fs-6 fw-semibold mb-2">Industry</label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter industry"
                        required
                        value={formData.industry}
                        onChange={(e) =>
                          setFormData({ ...formData, industry: e.target.value })
                        }
                      />
                    </div>

                    {/* Employee Size */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Employee Size</label>
                      <Dropdown
                        value={formData.employeeSize}
                        options={[
                          { label: "1-10", value: "1-10" },
                          { label: "11-50", value: "11-50" },
                          { label: "51-200", value: "51-200" },
                          { label: "201-500", value: "201-500" },
                          { label: "501-1000", value: "501-1000" },
                          { label: "1000+", value: "1000+" },
                        ]}
                        onChange={(e) =>
                          setFormData({ ...formData, employeeSize: e.value })
                        }
                        placeholder="Select Employee Size"
                        className="w-100"
                      />
                    </div>

                    {/* Founded Year */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Founded Year</label>
                      <input
                        type="number"
                        className="form-control form-control-solid"
                        placeholder="Enter founded year"
                        value={formData.foundedYear}
                        onChange={(e) =>
                          setFormData({ ...formData, foundedYear: e.target.value })
                        }
                      />
                    </div>

                    {/* Description */}
                    <div className="col-md-12 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Description</label>
                      <textarea
                        className="form-control form-control-solid"
                        placeholder="Enter employee description"
                        rows="3"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                      />
                    </div>

                    {/* Address Section */}
                    <div className="col-12">
                      <h5 className="fw-bold mb-3">Address Information</h5>
                    </div>
                    
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Street</label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
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
                      <label className="fs-6 fw-semibold mb-2">City</label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
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
                      <label className="fs-6 fw-semibold mb-2">State</label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
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
                      <label className="fs-6 fw-semibold mb-2">Country</label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter country"
                        value={formData.address.country}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            address: { ...formData.address, country: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Zip Code</label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter zip code"
                        value={formData.address.zipCode}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            address: { ...formData.address, zipCode: e.target.value }
                          })
                        }
                      />
                    </div>

                    {/* Contact Person Section */}
                    <div className="col-12">
                      <h5 className="fw-bold mb-3">Contact Person Information</h5>
                    </div>

                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Contact Person Name</label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter contact person name"
                        value={formData.contactPerson.name}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            contactPerson: { ...formData.contactPerson, name: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Position</label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter position"
                        value={formData.contactPerson.position}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            contactPerson: { ...formData.contactPerson, position: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Contact Email</label>
                      <input
                        type="email"
                        className="form-control form-control-solid"
                        placeholder="Enter contact email"
                        value={formData.contactPerson.email}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            contactPerson: { ...formData.contactPerson, email: e.target.value }
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Contact Phone</label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter contact phone"
                        value={formData.contactPerson.phone}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            contactPerson: { ...formData.contactPerson, phone: e.target.value }
                          })
                        }
                      />
                    </div>

                    {/* Status Section */}
                    <div className="col-12">
                      <h5 className="fw-bold mb-3">Status Information</h5>
                    </div>

                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Status</label>
                      <Dropdown
                        value={formData.status}
                        options={[
                          { label: "Active", value: "Active" },
                          { label: "Pending", value: "Pending" },
                          { label: "Inactive", value: "Inactive" },
                        ]}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.value })
                        }
                        placeholder="Select Status"
                        className="w-100"
                      />
                    </div>

                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Verification Status</label>
                      <Dropdown
                        value={formData.verificationStatus}
                        options={[
                          { label: "Verified", value: "Verified" },
                          { label: "Unverified", value: "Unverified" },
                        ]}
                        onChange={(e) =>
                          setFormData({ ...formData, verificationStatus: e.value })
                        }
                        placeholder="Select Verification Status"
                        className="w-100"
                      />
                    </div>

                    {/* Languages */}
                    {/* <div className="col-md-6 fv-row">
                      <label>Languages</label>

                      {formData.languages?.map((lang, index) => (
                        <div key={index} className="mb-3 border p-2 rounded">
                          <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Language Name"
                            value={lang.name}
                            onChange={(e) => {
                              const updated = [...formData.languages];
                              updated[index].name = e.target.value;
                              setFormData({ ...formData, languages: updated });
                            }}
                          />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Proficiency Level (e.g. Fluent, Native)"
                            value={lang.level}
                            onChange={(e) => {
                              const updated = [...formData.languages];
                              updated[index].level = e.target.value;
                              setFormData({ ...formData, languages: updated });
                            }}
                          />
                        </div>
                      ))}
                    </div> */}

                    {/* Languages */}
                    <div className="col-md-6 fv-row">
                      <label className="fw-bold mb-2">Languages</label>

                      {formData.languages?.map((lang, index) => (
                        <div
                          key={index}
                          className="mb-3 border p-2 rounded d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <p className="mb-1">
                              <strong>Language:</strong> {lang.name}
                            </p>
                            <p className="mb-0">
                              <strong>Level:</strong> {lang.level}
                            </p>
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              const updated = [...formData.languages];
                              updated.splice(index, 1);
                              setFormData({ ...formData, languages: updated });
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}

                      {/* Languages */}
                      <div className="col-md-6 fv-row">
                        <label className="fw-bold mb-2">Languages</label>

                        {/* Show existing languages */}
                        {formData.languages?.map((lang, index) => (
                          <div
                            key={index}
                            className="mb-3 border p-2 rounded d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <p className="mb-1">
                                <strong>Language:</strong> {lang.name || "N/A"}
                              </p>
                              <p className="mb-0">
                                <strong>Proficiency:</strong>{" "}
                                {lang.level || "N/A"}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => {
                                const updated = [...formData.languages];
                                updated.splice(index, 1); // remove by index
                                setFormData({
                                  ...formData,
                                  languages: updated,
                                });
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        ))}

                        {/* Add new language inputs */}
                        <div className="border p-2 rounded mt-3">
                          <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Language Name"
                            value={formData.newLangName || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                newLangName: e.target.value,
                              })
                            }
                          />
                          <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Proficiency Level (e.g. Fluent, Native)"
                            value={formData.newLangLevel || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                newLangLevel: e.target.value,
                              })
                            }
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              if (
                                formData.newLangName &&
                                formData.newLangLevel
                              ) {
                                const updated = [
                                  ...formData.languages,
                                  {
                                    name: formData.newLangName,
                                    level: formData.newLangLevel,
                                  },
                                ];
                                setFormData({
                                  ...formData,
                                  languages: updated,
                                  newLangName: "",
                                  newLangLevel: "",
                                });
                              }
                            }}
                          >
                            Add Language
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Phone Code */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="phone_code">Phone Code</label>
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
                    </div>

                    {/* Picture */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="picture">Employee picture</label>
                      <input
                        type="file"
                        id="picture"
                        name="picture"
                        accept="image/*"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            picture: e.target.files[0],
                          })
                        }
                        className="form-control"
                      />
                    </div>

                    {/* About */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="about">About</label>
                      <textarea
                        id="about"
                        name="about"
                        rows={2}
                        value={formData.about}
                        onChange={(e) =>
                          setFormData({ ...formData, about: e.target.value })
                        }
                        className="form-control"
                        placeholder="Enter about employee"
                      />
                    </div>

                    {/* Responsibility */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="responsibility">Responsibility</label>
                      <input
                        type="text"
                        id="responsibility"
                        name="responsibility"
                        value={formData.responsibility}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            responsibility: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Responsibility"
                      />
                    </div>

                    {/* Description */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        rows={2}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Description of the employee"
                      />
                    </div>

                    {/* Country */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="country">Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        className="form-control"
                        placeholder="Enter Country Name"
                      />
                    </div>

                    {/* DOB */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="dob">DOB</label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={(e) =>
                          setFormData({ ...formData, dob: e.target.value })
                        }
                        className="form-control"
                      />
                    </div>

                    {/* Nationality */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="nationality">Nationality</label>
                      <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nationality: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Enter Nationality"
                      />
                    </div>

                    {/* Skills (MultiSelect) */}
                    <div className="col-md-6 fv-row">
                      <label htmlFor="skills">Skills</label>
                      <MultiSelect
                        value={formData.skills}
                        options={skillsOptions}
                        optionLabel="title"
                        optionValue="_id"
                        onChange={(e) =>
                          setFormData({ ...formData, skills: e.value })
                        }
                        placeholder="Select skills"
                        filter
                        className="form-control"
                      />
                      {errors.skills && (
                        <div className="text-danger small mt-1">
                          {errors.skills}
                        </div>
                      )}
                    </div>

                    {/* gender */}
                    <div className="col-md-6 fv-row">
                      <label className="d-block mb-5">Gender</label>

                      <div className="form-check mb-4">
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                          }
                          className="form-check-input"
                        />
                        <label htmlFor="male" className="form-check-label">
                          Male
                        </label>
                      </div>

                      <div className="form-check mb-4">
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                          }
                          className="form-check-input"
                        />
                        <label htmlFor="female" className="form-check-label">
                          Female
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          type="radio"
                          id="other"
                          name="gender"
                          value="Other"
                          checked={formData.gender === "Other"}
                          onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                          }
                          className="form-check-input"
                        />
                        <label htmlFor="other" className="form-check-label">
                          Other
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="text-center mt-3">
                    <button
                      type="button"
                      className="btn btn-light me-3"
                      onClick={() => navigate("/users")}
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

export default EmployeeForm;
