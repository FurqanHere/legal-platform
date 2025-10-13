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

import { Button, Form, Row, Col } from "react-bootstrap";

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("info");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [employersOptions, setEmployersOptions] = useState([]);
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [facilitiesOptions, setFacilitiesOptions] = useState([]);

  const [pageLoader, setPageLoader] = useState(false);

  const [errors, setErrors] = useState({});
  const [isLoader, setIsLoader] = useState(false);

  const [formData, setFormData] = useState({
    employee_id: "",
    title: "",
    description: "",
    job_type: "",
    area: "",
    address: "",
    duration: "",
    job_sector: "",
    start_date: "",
    expiry_date: "",
    contract_type: "",
    monthly_salary_from: "",
    monthly_salary_to: "",
    facilities: [],
    skills: [],
    requirements: [],
    status: "Active",
    isActive: true,
    featured: false,
    urgent: false,
    remote_work: false,
    experience_level: "",
    education_level: "",
    benefits: [],
    working_hours: "",
    location_type: "",
    tags: []
  });

  // Fetch Employers
  useEffect(() => {
    (async () => {
      try {
        setIsLoader(true);
        const res = await ApiService.request({
          method: "GET",
          url: "employers",
        });

        const employers = res.data.data;
        setEmployersOptions(employers);
      } catch (err) {
        console.error("Error fetching employers:", err);
        toast.error("Failed to load employers");
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
        url: `jobs/${id}`,
        params: { get_for: "edit" },
      });

      const data = response.data;
      if (data.status) {
        const job = data.data;

        setFacilitiesOptions(job.facilities || []);
        setFormData({
          ...formData,
          ...job,
          employee_id: job.employee_id?._id || "",
          skills: job.skills?.map((s) => s._id) || [],
          facilities: job.facilities || [],
          requirements: job.requirements || [],
          benefits: job.benefits || [],
          tags: job.tags || [],
          start_date: job.start_date
            ? new Date(job.start_date).toISOString().split("T")[0]
            : "",
          expiry_date: job.expiry_date
            ? new Date(job.expiry_date).toISOString().split("T")[0]
            : "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching job detail:", error);
    } finally {
      setPageLoader(false);
    }
  };

  useEffect(() => {
    if (id) getSingleData();
  }, [id]);

  // Handle Form Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoader(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          const csv = value
            .map((v) => {
              if (v && typeof v === "object" && v._id) {
                return v._id;
              }
              return v;
            })
            .join(",");
          form.append(key, csv);
        } else if (value && typeof value === "object" && value._id) {
          form.append(key, value._id);
        } else {
          form.append(key, value ?? "");
        }
      });

      const response = await ApiService.request({
        method: "POST",
        url: `jobs/createOrUpdate/${id}`,
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;
      if (data.status) {
        toast.success(data.message);
        navigate("/jobs");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoader(false);
    }
  };

  // Fetch Skills
  useEffect(() => {
    (async () => {
      try {
        setIsLoader(true);
        const res = await ApiService.request({
          method: "GET",
          url: "skills-list",
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

  // Requirements

  const [requirements, setRequirements] = useState([""]);

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const deleteRequirement = (index) => {
    const updated = [...requirements];
    updated.splice(index, 1);
    setRequirements(updated);
  };

  const handleChange = (index, value) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
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
              {id ? "Edit" : "Add New"} Job
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
                <a href="/jobs" className="text-muted text-hover-primary">
                  Job
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
                  <i className="bi bi-envelope-fill"></i> Job Info
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
                    {/* Job Title */}
                    <div className="col-md-6 fv-row">
                      <label className="required fs-6 fw-semibold mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter Job Title"
                        value={formData.title || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                      />
                    </div>

                    {/* Description */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">
                        Description
                      </label>
                      <textarea
                        className="form-control form-control-solid"
                        placeholder="Enter Job Description"
                        rows="3"
                        value={formData.description || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Job Type */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Job Type</label>
                      <Dropdown
                        value={formData.job_type}
                        options={[
                          { label: "Full-time", value: "Full-time" },
                          { label: "Part-time", value: "Part-time" },
                          { label: "Internship", value: "Internship" },
                          { label: "Contract", value: "Contract" },
                          { label: "Freelance", value: "Freelance" },
                        ]}
                        onChange={(e) =>
                          setFormData({ ...formData, job_type: e.value })
                        }
                        placeholder="Select Job Type"
                        className="w-100"
                      />
                    </div>

                    {/* Employer Dropdown */}
                    <div className="col-md-6 fv-row">
                      <label className="required fs-6 fw-semibold mb-2">
                        Employer
                      </label>
                      <Dropdown
                        value={formData.employee_id}
                        options={employersOptions}
                        optionLabel="name"
                        optionValue="_id"
                        onChange={(e) =>
                          setFormData({ ...formData, employee_id: e.value })
                        }
                        placeholder="Select Employer"
                        className="w-100"
                      />
                    </div>

                    {/* Skills Dropdown */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Skills</label>
                      <MultiSelect
                        value={formData.skills}
                        options={skillsOptions}
                        optionLabel="title"
                        optionValue="_id"
                        onChange={(e) =>
                          setFormData({ ...formData, skills: e.value })
                        }
                        placeholder="Select Skills"
                        className="w-100"
                      />
                    </div>

                    {/* Facilities Dropdown */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">
                        Facilities
                      </label>
                      <MultiSelect
                        value={formData.facilities} // array of facility _ids
                        options={facilitiesOptions} // array of { _id, title }
                        optionLabel="title"
                        optionValue="_id"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            facilities: e.value, // PrimeReact gives you an array of selected _ids
                          })
                        }
                        placeholder="Select Facilities"
                        className="w-100"
                      />
                    </div>

                    {/* Area */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Area</label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter Area"
                        value={formData.area || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, area: e.target.value })
                        }
                      />
                    </div>

                    {/* Address */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Address</label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter Address"
                        value={formData.address || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </div>

                    {/* Duration */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Duration</label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter Duration"
                        value={formData.duration || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, duration: e.target.value })
                        }
                      />
                    </div>

                    {/* Job Sector */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">
                        Job Sector
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter Job Sector"
                        value={formData.job_sector || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            job_sector: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Start Date */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-solid"
                        value={formData.start_date || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            start_date: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Expiry Date */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-solid"
                        value={formData.expiry_date || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expiry_date: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Contract Type */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">
                        Contract Type
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="Enter Contract Type"
                        value={formData.contract_type || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contract_type: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Monthly Salary From */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">
                        Monthly Salary (From)
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-solid"
                        placeholder="From"
                        value={formData.monthly_salary_from || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            monthly_salary_from: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Monthly Salary To */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">
                        Monthly Salary (To)
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-solid"
                        placeholder="To"
                        value={formData.monthly_salary_to || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            monthly_salary_to: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Experience Level */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Experience Level</label>
                      <Dropdown
                        value={formData.experience_level}
                        options={[
                          { label: "Entry Level", value: "Entry Level" },
                          { label: "Mid Level", value: "Mid Level" },
                          { label: "Senior Level", value: "Senior Level" },
                          { label: "Executive Level", value: "Executive Level" },
                        ]}
                        onChange={(e) =>
                          setFormData({ ...formData, experience_level: e.value })
                        }
                        placeholder="Select Experience Level"
                        className="w-100"
                      />
                    </div>

                    {/* Education Level */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Education Level</label>
                      <Dropdown
                        value={formData.education_level}
                        options={[
                          { label: "High School", value: "High School" },
                          { label: "Bachelor", value: "Bachelor" },
                          { label: "Master", value: "Master" },
                          { label: "PhD", value: "PhD" },
                        ]}
                        onChange={(e) =>
                          setFormData({ ...formData, education_level: e.value })
                        }
                        placeholder="Select Education Level"
                        className="w-100"
                      />
                    </div>

                    {/* Location Type */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Location Type</label>
                      <Dropdown
                        value={formData.location_type}
                        options={[
                          { label: "On-site", value: "On-site" },
                          { label: "Remote", value: "Remote" },
                          { label: "Hybrid", value: "Hybrid" },
                        ]}
                        onChange={(e) =>
                          setFormData({ ...formData, location_type: e.value })
                        }
                        placeholder="Select Location Type"
                        className="w-100"
                      />
                    </div>

                    {/* Working Hours */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Working Hours</label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        placeholder="e.g., 9 AM - 6 PM"
                        value={formData.working_hours || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, working_hours: e.target.value })
                        }
                      />
                    </div>

                    {/* Status */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Status</label>
                      <Dropdown
                        value={formData.status}
                        options={[
                          { label: "Active", value: "Active" },
                          { label: "Draft", value: "Draft" },
                          { label: "Expired", value: "Expired" },
                        ]}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.value })
                        }
                        placeholder="Select Status"
                        className="w-100"
                      />
                    </div>

                    {/* Job Features */}
                    <div className="col-md-6 fv-row">
                      <label className="fs-6 fw-semibold mb-2">Job Features</label>
                      <div className="d-flex flex-wrap gap-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) =>
                              setFormData({ ...formData, featured: e.target.checked })
                            }
                          />
                          <label className="form-check-label">Featured</label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={formData.urgent}
                            onChange={(e) =>
                              setFormData({ ...formData, urgent: e.target.checked })
                            }
                          />
                          <label className="form-check-label">Urgent</label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={formData.remote_work}
                            onChange={(e) =>
                              setFormData({ ...formData, remote_work: e.target.checked })
                            }
                          />
                          <label className="form-check-label">Remote Work</label>
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}

                    <div className="card p-3">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Requirements</h5>
                        <Button
                          variant="primary"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              requirements: ["", ...formData.requirements], // new input always on top
                            })
                          }
                        >
                          + Add Field
                        </Button>
                      </div>

                      {formData.requirements?.map((req, index) => (
                        <Row key={index} className="mb-2 align-items-center">
                          <Col>
                            <Form.Control
                              type="text"
                              placeholder="Enter your requirements"
                              value={req}
                              onChange={(e) => {
                                const updated = [...formData.requirements];
                                updated[index] = e.target.value;
                                setFormData({
                                  ...formData,
                                  requirements: updated,
                                });
                              }}
                              onBlur={() => {
                                if (req.trim() !== "") {
                                  // lock the field only after user finishes typing
                                  const updated = [...formData.requirements];
                                  updated[index] = req.trim();
                                  setFormData({
                                    ...formData,
                                    requirements: updated,
                                  });
                                }
                              }}
                            />
                          </Col>
                          <Col xs="auto">
                            <Button
                              className=""
                              onClick={() => {
                                const updated = [...formData.requirements];
                                updated.splice(index, 1);
                                setFormData({
                                  ...formData,
                                  requirements: updated,
                                });
                              }}
                            >
                              <i className="bi bi-trash3 fs-3"></i>
                            </Button>
                          </Col>
                        </Row>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="text-center mt-3">
                    <button
                      type="button"
                      className="btn btn-light me-3"
                      onClick={() => navigate("/jobs")}
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

export default JobForm;
