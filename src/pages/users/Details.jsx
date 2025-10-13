import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";
import { formatDate } from "../../utils/helper.js";
import { statusColor } from "../../assets/utils/statusColors";
import Paginator from "../../components/Paginator";
import Swal from "sweetalert2";

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({});
  const [jobs, setOrders] = useState([]);
  const [applications, setApplication] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [currency] = useState(process.env.REACT_APP_CURRENCY);
  const [tab, setTab] = useState("info");
  const [employee, setemployee] = useState({});
  const [apiData, setApiData] = useState({
    search: "",
    daterange: "",
    page: 1,
    employee_id: id,
    type: "",
    status: "",
  });

  const getSingleData = async () => {
    try {
      setIsLoader(true);
      const response = await ApiService.request({
        method: "GET",
        url: `employees/${id}`,
      });

      if (response.data.status) {
        setemployee(response.data.data);
        setApplication(response.data.applications || []);
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

  const getOrders = async () => {
    try {
      setIsLoader(true);
      const response = await ApiService.request({
        method: "GET",
        url: "jobs",
        data: apiData,
      });
      const data = response.data;
      if (data.status) {
        setOrders(data.data);
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
    if (tab === "jobs") {
      getOrders();
    }
  }, [tab]);

  const handlePageChange = (event) => {
    setApiData((prev) => ({ ...prev, page: event }));
  };

  const handleApprove = () => {
    Swal.fire({
      title: "Approve employee",
      text: "Are you sure you want to approve this employee?",
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
            url: `employees/approval-status/${id}`,
            data: { status: "Approved" },
          });
          if (response.data.status) {
            toast.success(response.data.message);
            getSingleData();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("Error approving employee");
        } finally {
          setIsLoader(false);
        }
      }
    });
  };

  const handleReject = () => {
    Swal.fire({
      title: "Reject employee",
      html: `
        <p>Are you sure you want to reject this employee?</p>
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
            url: `employees/approval-status/${id}`,
            data: { status: "Rejected", reason: result.value },
          });
          if (response.data.status) {
            toast.success(response.data.message);
            getSingleData();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("Error rejecting employee");
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
              Employee: {employee?.name}
              {employee?.status === "Pending" && (
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
                <Link to="/users" className="text-muted text-hover-primary">
                  Employees
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center gap-2 gap-lg-3">
            {employee?.status === "Pending" && (
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

            {employee?.status === "Approved" && (
              <button onClick={handleReject} className="btn btn-sm btn-danger">
                <i className="bi bi-x-circle-fill me-2"></i> Reject
              </button>
            )}

            {employee?.status === "Rejected" && (
              <button
                onClick={handleApprove}
                className="btn btn-sm btn-success"
              >
                <i className="bi bi-check-circle-fill me-2"></i> Approve
              </button>
            )}

            <Link to="/users" className="btn btn-sm btn-light-primary">
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
                    <i className="bi bi-person me-2"></i> Employee Info
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      tab === "application" ? "active" : ""
                    }`}
                    onClick={() => setTab("application")}
                  >
                    <i class="bi bi-window-fullscreen me-2"></i> Application
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
                                Basic Information
                              </h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-borderless">
                                  <tbody>
                                    <tr>
                                      <th className="w-25 fw-semibold text-muted">
                                        Logo
                                      </th>
                                      <td>
                                        <img
                                          src={employee.logo || "/assets/images/blank.png"}
                                          alt="logo"
                                          className="w-45px h-45px object-cover rounded-circle"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="w-25 fw-semibold text-muted">
                                        Name
                                      </th>
                                      <td>{employee.name}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Email
                                      </th>
                                      <td>{employee.email}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Phone
                                      </th>
                                      <td>{employee.phone}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Industry
                                      </th>
                                      <td>
                                        <span className="badge badge-light-primary">
                                          {employee.industry}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Employee Size
                                      </th>
                                      <td>{employee.employeeSize}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Founded Year
                                      </th>
                                      <td>{employee.foundedYear}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Status
                                      </th>
                                      <td>
                                        <span className={`badge ${
                                          employee.status === "Pending"
                                            ? "bg-warning text-dark"
                                            : employee.status === "Rejected"
                                            ? "bg-danger"
                                            : employee.status === "Approved"
                                            ? "bg-success"
                                            : "bg-secondary"
                                        }`}>
                                          {employee.status}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Verification Status
                                      </th>
                                      <td>
                                        <span className={`badge ${
                                          employee.verificationStatus === "Verified"
                                            ? "bg-success"
                                            : employee.verificationStatus === "Unverified"
                                            ? "bg-warning text-dark"
                                            : "bg-secondary"
                                        }`}>
                                          {employee.verificationStatus}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Is Active
                                      </th>
                                      <td>
                                        <span className={`badge ${
                                          employee.isActive ? "bg-success" : "bg-danger"
                                        }`}>
                                          {employee.isActive ? "Active" : "Inactive"}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Description
                                      </th>
                                      <td>
                                        <div className="text-wrap" style={{maxWidth: '400px'}}>
                                          {employee.description}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Created At
                                      </th>
                                      <td>
                                        {formatDate(
                                          employee.createdAt,
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
                                Address Information
                              </h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-borderless">
                                  <tbody>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Street
                                      </th>
                                      <td>{employee.address?.street || "N/A"}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        City
                                      </th>
                                      <td>{employee.address?.city || "N/A"}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        State
                                      </th>
                                      <td>{employee.address?.state || "N/A"}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Country
                                      </th>
                                      <td>{employee.address?.country || "N/A"}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Zip Code
                                      </th>
                                      <td>{employee.address?.zipCode || "N/A"}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card mb-5">
                            <div className="card-header">
                              <h3 className="card-title fw-bold">
                                Contact Person
                              </h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-borderless">
                                  <tbody>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Name
                                      </th>
                                      <td>{employee.contactPerson?.name || "N/A"}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Position
                                      </th>
                                      <td>{employee.contactPerson?.position || "N/A"}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Email
                                      </th>
                                      <td>
                                        {employee.contactPerson?.email ? (
                                          <a href={`mailto:${employee.contactPerson.email}`} className="text-primary">
                                            {employee.contactPerson.email}
                                          </a>
                                        ) : (
                                          "N/A"
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Phone
                                      </th>
                                      <td>{employee.contactPerson?.phone || "N/A"}</td>
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
                                Additional Information
                              </h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-borderless">
                                  <tbody>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Benefits
                                      </th>
                                      <td>
                                        {employee.benefits && employee.benefits.length > 0 ? (
                                          <ul className="list-unstyled mb-0">
                                            {employee.benefits.map((benefit, index) => (
                                              <li key={index} className="mb-1">
                                                <i className="bi bi-gift text-primary me-2"></i>
                                                {benefit}
                                              </li>
                                            ))}
                                          </ul>
                                        ) : (
                                          <span className="text-muted">No benefits specified</span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Facilities
                                      </th>
                                      <td>
                                        {employee.facilities && employee.facilities.length > 0 ? (
                                          <ul className="list-unstyled mb-0">
                                            {employee.facilities.map((facility, index) => (
                                              <li key={index} className="mb-1">
                                                <i className="bi bi-building text-info me-2"></i>
                                                {facility}
                                              </li>
                                            ))}
                                          </ul>
                                        ) : (
                                          <span className="text-muted">No facilities specified</span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Requirements
                                      </th>
                                      <td>
                                        {employee.requirements && employee.requirements.length > 0 ? (
                                          <ul className="list-unstyled mb-0">
                                            {employee.requirements.map((requirement, index) => (
                                              <li key={index} className="mb-1">
                                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                {requirement}
                                              </li>
                                            ))}
                                          </ul>
                                        ) : (
                                          <span className="text-muted">No requirements specified</span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Skills
                                      </th>
                                      <td>
                                        {employee.skills && employee.skills.length > 0 ? (
                                          employee.skills.map((skill, index) => (
                                            <span
                                              key={index}
                                              className="badge bg-primary text-white me-2 mb-1"
                                            >
                                              {skill}
                                            </span>
                                          ))
                                        ) : (
                                          <span className="text-muted">No skills specified</span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Services
                                      </th>
                                      <td>
                                        {employee.services && employee.services.length > 0 ? (
                                          employee.services.map((service, index) => (
                                            <span
                                              key={index}
                                              className="badge bg-secondary text-white me-2 mb-1"
                                            >
                                              {service}
                                            </span>
                                          ))
                                        ) : (
                                          <span className="text-muted">No services specified</span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Last Login
                                      </th>
                                      <td>
                                        {employee.lastLogin ? formatDate(employee.lastLogin, "DD MMM YYYY, hh:mm A") : "Never"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Login Attempts
                                      </th>
                                      <td>
                                        <span className="badge bg-info">
                                          {employee.loginAttempts || 0}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Updated At
                                      </th>
                                      <td>
                                        {formatDate(
                                          employee.updatedAt,
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
                      </div>
                    </div>
                  )}

                  {tab === "application" && (
                    <div className="tab-pane fade show active">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card">
                            <div className="card-header">
                              <h3 className="card-title fw-bold">
                                User Details
                              </h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                  <thead>
                                    <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                                      <th>File Name</th>
                                      <th>File</th>
                                      <th>Applied At</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody className="fw-semibold text-gray-600">
                                    {applications.length > 0 ? (
                                      applications.map((item, index) => (
                                        <tr key={index}>
                                          <td>
                                            {item?.resume_id?.file_name || "-"}
                                          </td>
                                          <td>
                                            {item?.resume_id?.file ? (
                                              <img
                                                src={item?.resume_id?.file}
                                              />
                                            ) : (
                                              "-"
                                            )}
                                          </td>
                                          <td>
                                            {formatDate(
                                              item?.resume_id?.createdAt,
                                              "DD MMM YYYY, hh:mm A"
                                            )}
                                          </td>
                                          <td>
                                            <span
                                              className={`badge ${
                                                item?.status === "Applied"
                                                  ? "bg-primary-badge"
                                                  : item?.status ===
                                                    "Shortlisted"
                                                  ? "bg-success-badge"
                                                  : "bg-secondary"
                                              }`}
                                            >
                                              {item?.status}
                                            </span>
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
                                            No applications found for this
                                            employee
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
                                    Showing {jobs.length} of
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
                        <div className="col-md-6">
                          <div className="card">
                            <div className="card-header">
                              <h3 className="card-title fw-bold">
                                Job Details
                              </h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                  <thead>
                                    <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                                      <th>Title</th>
                                      <th>Job Type</th>
                                      <th>Job Sector</th>
                                      <th>Duration</th>
                                    </tr>
                                  </thead>
                                  <tbody className="fw-semibold text-gray-600">
                                    {applications.length > 0 ? (
                                      applications.map((item, index) => (
                                        <tr key={index}>
                                          <td>{item?.job_id?.title}</td>
                                          <td>{item?.job_id?.job_type}</td>
                                          <td>{item?.job_id?.job_sector}</td>
                                          <td>{item?.job_id?.duration}</td>
                                          <td>
                                            {item?.resume_id?.file_name || "-"}
                                          </td>
                                          <td>
                                            {item?.resume_id?.file ? (
                                              <img
                                                src={item?.resume_id?.file}
                                              />
                                            ) : (
                                              "-"
                                            )}
                                          </td>
                                          <td>
                                            {formatDate(
                                              item?.resume_id?.createdAt,
                                              "DD MMM YYYY, hh:mm A"
                                            )}
                                          </td>
                                          <td>
                                            <span
                                              className={`badge ${
                                                item?.status === "Applied"
                                                  ? "bg-primary-badge"
                                                  : item?.status ===
                                                    "Shortlisted"
                                                  ? "bg-success-badge"
                                                  : "bg-secondary"
                                              }`}
                                            >
                                              {item?.status}
                                            </span>
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
                                            No applications found for this
                                            employee
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
                                    Showing {jobs.length} of
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

export default EmployeeDetail;
