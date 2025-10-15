import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";
import { formatDate } from "../../utils/helper.js";
import { statusColor } from "../../assets/utils/statusColors";
import Paginator from "../../components/Paginator";
import Swal from "sweetalert2";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({});
  const [applications, setApplications] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [currency] = useState(process.env.REACT_APP_CURRENCY);
  const [tab, setTab] = useState("info");
  const [job, setJob] = useState({});
  const [apiData, setApiData] = useState({
    search: "",
    daterange: "",
    page: 1,
    job_id: id,
    type: "",
    status: "",
  });

  const getSingleData = async () => {
    try {
      setIsLoader(true);
      const response = await ApiService.request({
        method: "GET",
        url: `jobs/${id}`,
      });

      if (response.data.status) {
        setJob(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    // if (id) {
    getSingleData(id);
    // }
  }, [id]);

  const getApplications = async () => {
    try {
      setIsLoader(true);
      const response = await ApiService.request({
        method: "GET",
        url: "job-applications",
        data: apiData,
      });
      const data = response.data;
      if (data.status) {
        setApplications(data.data);
        setPagination(data.pagination);
      } else {
        toast.error(data.message);
      }
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    if (tab === "applicants") {
      getApplications();
    }
  }, [tab]);

  const handlePageChange = (event) => {
    setApiData((prev) => ({ ...prev, page: event }));
  };

  const handleApprove = () => {
    Swal.fire({
      title: "Approve Job",
      text: "Are you sure you want to approve this job?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoader(true);
          const response = await ApiService.request({
            method: "POST",
            url: `jobs/approval-status/${id}`,
            data: { status: "Approved" },
          });
          if (response.data.status) {
            toast.success(response.data.message);
            getSingleData();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("Error approving job");
        } finally {
          setIsLoader(false);
        }
      }
    });
  };

  const handleReject = () => {
    Swal.fire({
      title: "Reject Job",
      html: `
        <p>Are you sure you want to reject this job?</p>
        <input id="swal-reason" class="swal2-input" placeholder="Reason for rejection">
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      preConfirm: () => {
        const reason = Swal.getPopup().querySelector("#swal-reason").value;
        if (!reason) {
          Swal.showValidationMessage("Please enter a reason");
          return false;
        }
        return reason;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoader(true);
          const response = await ApiService.request({
            method: "POST",
            url: `jobs/approval-status/${id}`,
            data: { status: "Rejected", reason: result.value },
          });
          if (response.data.status) {
            toast.success(response.data.message);
            getSingleData();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("Error rejecting job");
        } finally {
          setIsLoader(false);
        }
      }
    });
  };

  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
        <div
          id="kt_app_toolbar_container"
          className="app-container container-xxl d-flex flex-stack"
        >
          <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
              Job: {job?.title}
              {job?.status === "Pending" && (
                <span className="badge bg-warning ms-2 fs-7">
                  Pending Approval
                </span>
              )}
            </h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
              <li className="breadcrumb-item text-muted">
                <Link to="/dashboard" className="text-muted text-hover-primary">
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item">
                <span className="bullet bg-gray-400 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-muted">
                <Link to="/jobs" className="text-muted text-hover-primary">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center gap-2 gap-lg-3">
            {job?.status === "Pending" && (
              <>
                <button
                  onClick={handleApprove}
                  className="btn btn-sm btn-success"
                >
                  <i className="bi bi-check-circle-fill me-2"></i> Approve
                </button>
                <button
                  onClick={handleReject}
                  className="btn btn-sm btn-danger"
                >
                  <i className="bi bi-x-circle-fill me-2"></i> Reject
                </button>
              </>
            )}
            <Link to="/jobs" className="btn btn-sm btn-light-primary">
              <i className="bi bi-arrow-left me-2"></i> Back to List
            </Link>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="app-container container-xxl"
        >
          <div className="card">
            <div className="card-body pt-5">
              <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
                <li className="nav-item">
                  <button
                    className={`nav-link ${tab === "info" ? "active" : ""}`}
                    onClick={() => setTab("info")}
                  >
                    <i className="bi bi-briefcase me-2"></i> Job Info
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      tab === "invited_users" ? "active" : ""
                    }`}
                    onClick={() => setTab("invited_users")}
                  >
                    <i class="bi bi-people me-2"></i> Invited Users
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      tab === "applicants" ? "active" : ""
                    }`}
                    onClick={() => setTab("applicants")}
                  >
                    <i class="bi bi-person-bounding-box me-2"></i> Applicants
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      tab === "short_listed" ? "active" : ""
                    }`}
                    onClick={() => setTab("short_listed")}
                  >
                    <i class="bi bi-card-checklist me-2"></i> Short Listed
                  </button>
                </li>
              </ul>

              {isLoader ? (
                <Loader
                  color="black"
                  className="mt-5"
                  text="Loading"
                  size="30"
                />
              ) : (
                <div className="tab-content">
                  {tab === "info" && (
                    <div className="tab-pane fade show active">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card mb-5">
                            <div className="card-header">
                              <h3 className="card-title fw-bold">
                                Job Details
                              </h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-borderless">
                                  <tbody>
                                    <tr>
                                      <th className="w-25 fw-semibold text-muted">
                                        Title
                                      </th>
                                      <td>{job.title}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Job Type
                                      </th>
                                      <td>
                                        <span className="badge badge-light-info">
                                          {job.job_type}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Job Sector
                                      </th>
                                      <td>
                                        <span className="badge badge-light-primary">
                                          {job.job_sector}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Experience Level
                                      </th>
                                      <td>{job.experience_level}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Education Level
                                      </th>
                                      <td>{job.education_level}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Location Type
                                      </th>
                                      <td>
                                        <span className={`badge ${
                                          job.location_type === "Remote" ? "badge-light-success" :
                                          job.location_type === "On-site" ? "badge-light-warning" :
                                          job.location_type === "Hybrid" ? "badge-light-info" : "badge-light-secondary"
                                        }`}>
                                          {job.location_type}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Working Hours
                                      </th>
                                      <td>{job.working_hours}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Area
                                      </th>
                                      <td>{job.area}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Address
                                      </th>
                                      <td>{job.address}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Contract Type
                                      </th>
                                      <td>{job.contract_type}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Duration
                                      </th>
                                      <td>{job.duration}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Salary Range
                                      </th>
                                      <td>
                                        {job.monthly_salary_from && job.monthly_salary_to ? (
                                          <span className="fw-bold text-success">
                                            {currency} {job.monthly_salary_from.toLocaleString()} - {job.monthly_salary_to.toLocaleString()}
                                          </span>
                                        ) : (
                                          <span className="text-muted">Not specified</span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Start Date
                                      </th>
                                      <td>
                                        {job.start_date ? formatDate(job.start_date, "DD MMM YYYY") : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Expiry Date
                                      </th>
                                      <td>
                                        {job.expiry_date ? formatDate(job.expiry_date, "DD MMM YYYY") : "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Status
                                      </th>
                                      <td>
                                        <span className={`badge ${
                                          job.status === "Active" ? "bg-success" :
                                          job.status === "Draft" ? "bg-warning text-dark" :
                                          job.status === "Expired" ? "bg-danger" : "bg-secondary"
                                        }`}>
                                          {job.status}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Job Features
                                      </th>
                                      <td>
                                        <div className="d-flex flex-wrap gap-2">
                                          {job.featured && (
                                            <span className="badge bg-warning text-dark">
                                              <i className="bi bi-star-fill me-1"></i>Featured
                                            </span>
                                          )}
                                          {job.urgent && (
                                            <span className="badge bg-danger">
                                              <i className="bi bi-exclamation-triangle-fill me-1"></i>Urgent
                                            </span>
                                          )}
                                          {job.remote_work && (
                                            <span className="badge bg-info">
                                              <i className="bi bi-laptop me-1"></i>Remote Work
                                            </span>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Application Count
                                      </th>
                                      <td>
                                        <span className="badge bg-primary">
                                          {job.application_count || 0} applications
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        View Count
                                      </th>
                                      <td>
                                        <span className="badge bg-secondary">
                                          {job.view_count || 0} views
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Description
                                      </th>
                                      <td>
                                        <div className="text-wrap" style={{maxWidth: '400px'}}>
                                          {job.description}
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Skills
                                      </th>
                                      <td colSpan="3">
                                        {job?.skills && job.skills.length > 0 ? (
                                          job.skills.map((skill, index) => (
                                              <span
                                                key={index}
                                              className="badge bg-primary text-white me-2 mb-1"
                                              >
                                              {skill}
                                              </span>
                                          ))
                                        ) : (
                                          <span className="text-muted">
                                            No skills specified
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Requirements
                                      </th>
                                      <td colSpan="3">
                                        {job?.requirements && job.requirements.length > 0 ? (
                                          <ul className="list-unstyled mb-0">
                                            {job.requirements.map((requirement, index) => (
                                              <li key={index} className="mb-1">
                                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                {requirement}
                                              </li>
                                            ))}
                                          </ul>
                                        ) : (
                                          <span className="text-muted">
                                            No requirements specified
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Benefits
                                      </th>
                                      <td colSpan="3">
                                        {job?.benefits && job.benefits.length > 0 ? (
                                          <ul className="list-unstyled mb-0">
                                            {job.benefits.map((benefit, index) => (
                                              <li key={index} className="mb-1">
                                                <i className="bi bi-gift text-primary me-2"></i>
                                                {benefit}
                                              </li>
                                            ))}
                                          </ul>
                                        ) : (
                                          <span className="text-muted">
                                            No benefits specified
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Facilities
                                      </th>
                                      <td colSpan="3">
                                        {job?.facilities && job.facilities.length > 0 ? (
                                          <ul className="list-unstyled mb-0">
                                            {job.facilities.map((facility, index) => (
                                              <li key={index} className="mb-1">
                                                <i className="bi bi-building text-info me-2"></i>
                                                {facility}
                                              </li>
                                            ))}
                                          </ul>
                                        ) : (
                                          <span className="text-muted">
                                            No facilities specified
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Tags
                                      </th>
                                      <td colSpan="3">
                                        {job?.tags && job.tags.length > 0 ? (
                                          job.tags.map((tag, index) => (
                                              <span
                                                key={index}
                                              className="badge bg-light text-dark me-2 mb-1"
                                              >
                                              #{tag}
                                              </span>
                                          ))
                                        ) : (
                                          <span className="text-muted">
                                            No tags specified
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Created At
                                      </th>
                                      <td>
                                        {formatDate(
                                          job.createdAt,
                                          "DD MMM YYYY, hh:mm A"
                                        )}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card mb-5">
                            <div className="card-header">
                              <h3 className="card-title fw-bold">
                                Employer Details
                              </h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-borderless">
                                  <tbody>
                                    <tr>
                                      <th className="w-25 fw-semibold text-muted">
                                        Employer Name
                                      </th>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="symbol symbol-40px me-3">
                                            <div className="symbol-label bg-light-primary">
                                              <i className="bi bi-building text-primary fs-2"></i>
                                            </div>
                                          </div>
                                          <div className="d-flex flex-column">
                                            <span className="fw-bold text-dark">
                                              {job.employee_id?.name || "N/A"}
                                            </span>
                                            <span className="text-muted fs-7">
                                              {job.employee_id?.industry || "N/A"}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Email
                                      </th>
                                      <td>
                                        {job.employee_id?.email ? (
                                          <a href={`mailto:${job.employee_id.email}`} className="text-primary">
                                            {job.employee_id.email}
                                          </a>
                                        ) : (
                                          "N/A"
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Industry
                                      </th>
                                      <td>
                                        <span className="badge badge-light-primary">
                                          {job.employee_id?.industry || "N/A"}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Address
                                      </th>
                                      <td>
                                        {job.employee_id?.address ? (
                                          <div>
                                            {job.employee_id.address.street && (
                                              <div>{job.employee_id.address.street}</div>
                                            )}
                                            {job.employee_id.address.city && (
                                              <div>{job.employee_id.address.city}</div>
                                            )}
                                            {job.employee_id.address.state && (
                                              <div>{job.employee_id.address.state}</div>
                                            )}
                                            {job.employee_id.address.country && (
                                              <div>{job.employee_id.address.country}</div>
                                            )}
                                            {job.employee_id.address.zipCode && (
                                              <div>{job.employee_id.address.zipCode}</div>
                                            )}
                                          </div>
                                        ) : (
                                          "N/A"
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Employer ID
                                      </th>
                                      <td>
                                        <span className="text-muted fs-7">
                                          {job.employee_id?._id || "N/A"}
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="col-md-4">
                          <div className="card mb-5">
                            <div className="card-header">
                              <h3 className="card-title fw-bold">Facilities</h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-borderless">
                                  <table className="table table-bordered">
                                    <thead>
                                      <tr>
                                        <th className="fw-semibold text-muted">
                                          Title
                                        </th>
                                        <th className="fw-semibold text-muted">
                                          Status
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {employee?.facilities &&
                                      employee.facilities.length > 0 ? (
                                        employee.facilities.map(
                                          (facility, index) => (
                                            <tr key={index}>
                                              <td>{facility.title || "-"}</td>
                                              <td className="badge bg-primary-badge text-white p-2">
                                                {facility.status
                                                  ? "Active"
                                                  : "Inactive"}
                                              </td>
                                            </tr>
                                          )
                                        )
                                      ) : (
                                        <tr>
                                          <td
                                            colSpan="3"
                                            className="text-muted text-center"
                                          >
                                            No facilities available
                                          </td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        {/* <div className="col-md-3">
                          <div className="card mb-5">
                            <div className="card-header">
                              <h3 className="card-title fw-bold">Skills</h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-borderless">
                                  <tbody>
                                    {employee?.skills &&
                                    employee.skills.length > 0 ? (
                                      <>
                                        <tr>
                                          <th className="fw-semibold text-muted">
                                            Title
                                          </th>
                                          <th className="fw-semibold text-muted">
                                            Status
                                          </th>
                                          {/* <th className="fw-semibold text-muted">
                                            Created At
                                          </th>
                                        </tr>

                                        {employee.skills.map((skill, index) => (
                                          <tr key={index}>
                                            <td>{skill.title || "-"}</td>
                                          </tr>
                                        ))}
                                      </>
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan="3"
                                          className="text-center text-muted"
                                        >
                                          No skills found
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  )}

                  {tab === "jobs" && (
                    <div className="tab-pane fade show active">
                      <div className="card">
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-hover align-middle">
                              <thead>
                                <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                                  <th>Order #</th>
                                  <th>User</th>
                                  <th>Pay Method</th>
                                  <th>Order Total</th>
                                  <th>Order Type</th>
                                  <th>Status</th>
                                  <th>Order Date</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody className="fw-semibold text-gray-600">
                                {applications.length > 0 ? (
                                  applications.map((item, index) => (
                                    <tr key={index}>
                                      <td>#{item.order_code}</td>
                                      <td>
                                        {item.user && (
                                          <div>
                                            <div className="fw-bold">
                                              {item.user.name}
                                            </div>
                                            <div className="text-muted">
                                              {item.user.phone}
                                            </div>
                                          </div>
                                        )}
                                      </td>
                                      <td>{item.payment_method}</td>
                                      <td>
                                        {currency}
                                        {item.grand_total?.toFixed(2)}
                                      </td>
                                      <td>{item.type}</td>
                                      <td>
                                        <span
                                          className={`badge bg-${
                                            statusColor[item.status] ||
                                            "secondary"
                                          }`}
                                        >
                                          {item.status}
                                        </span>
                                      </td>
                                      <td>
                                        {formatDate(
                                          item.createdAt,
                                          "DD MMM YYYY, hh:mm A"
                                        )}
                                      </td>
                                      <td>
                                        <Link
                                          to={`/jobs/${item._id}`}
                                          className="btn btn-icon btn-light-primary btn-sm"
                                          title="View Details"
                                        >
                                          <i className="bi bi-eye-fill fs-6"></i>
                                        </Link>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan="8"
                                      className="text-center py-10"
                                    >
                                      <div className="text-muted">
                                        No applications found for this job
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>

                          {pagination.total_pages > 1 && (
                            <div className="d-flex justify-content-between align-items-center mt-5">
                              <div className="text-muted">
                                Showing {applications.length} of
                                {pagination.total_records} records
                              </div>
                              <Paginator
                                page={pagination.current_page}
                                rows={pagination.per_page}
                                totalRecords={pagination.total_records}
                                onPageChange={handlePageChange}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === "invited_users" && (
                    <div className="tab-pane fade show active">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card mb-5">
                            <div className="card-header">
                              <h3 className="card-title fw-bold">
                                Invited Users
                              </h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-borderless">
                                  <thead>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Picture
                                      </th>
                                      <th className="fw-semibold text-muted">
                                        Name
                                      </th>
                                      <th className="fw-semibold text-muted">
                                        Email
                                      </th>
                                      <th className="fw-semibold text-muted">
                                        Phone
                                      </th>
                                      <th className="fw-semibold text-muted">
                                        Country
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {job?.invited_users
                                      ?.filter(Boolean)
                                      .map((user) => (
                                        <tr key={user._id}>
                                          <td>
                                            <img
                                              src={user.picture}
                                              alt={user.name}
                                              className="w-45px h-45px object-cover rounded-2"
                                            />
                                          </td>
                                          <td>{user.name}</td>
                                          <td>{user.email}</td>
                                          <td>
                                            +{user.phone_code}
                                            {user.phone}
                                          </td>
                                          <td>{user.country}</td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === "short_listed" && (
                    <div className="tab-pane fade show active">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card mb-5">
                            <div className="card-header">
                              <h3 className="card-title fw-bold">
                                Short Listed
                              </h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                {job?.shortlisted?.length > 0 ? (
                                  <table className="table table-bordered align-middle">
                                    <thead>
                                      <tr>
                                        <th className="fw-semibold text-muted">
                                          Picture
                                        </th>
                                        <th className="fw-semibold text-muted">
                                          Name
                                        </th>
                                        <th className="fw-semibold text-muted">
                                          Email
                                        </th>
                                        <th className="fw-semibold text-muted">
                                          Phone
                                        </th>
                                        <th className="fw-semibold text-muted">
                                          Country
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {job.shortlisted.map(
                                        (user, index) => (
                                          <tr key={user._id || index}>
                                            <td>
                                              <img
                                                src={user.picture}
                                                alt="Short Listed User"
                                                className="w-45px h-45px object-cover rounded-2"
                                              />
                                            </td>
                                            <td>{user.name || "-"}</td>
                                            <td>{user.email || "-"}</td>
                                            <td>{user.phone || "-"}</td>
                                            <td>{user.country || "-"}</td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                ) : (
                                  <p className="text-muted">
                                    No shortlisted users
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === "applicants" && (
                    <div className="tab-pane fade show active">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card mb-5">
                            <div className="card-header">
                              <h3 className="card-title fw-bold">Applicants</h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                {job?.applicants?.length > 0 ? (
                                  <table className="table table-bordered align-middle">
                                    <thead className="table-light">
                                      <tr>
                                        <th>Picture</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Country</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {job.applicants.map(
                                        (user, index) => (
                                          <tr key={user._id || index}>
                                            <td>
                                              <img
                                                src={user.picture}
                                                alt="Applicant"
                                                className="w-45px h-45px object-cover rounded-2"
                                              />
                                            </td>
                                            <td>{user.name || "-"}</td>
                                            <td>{user.email || "-"}</td>
                                            <td>{user.phone || "-"}</td>
                                            <td>{user.country || "-"}</td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                ) : (
                                  <p className="text-muted">No Applicants</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
