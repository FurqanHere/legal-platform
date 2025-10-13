import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";
import { formatDate } from "../../utils/helper.js";
import { statusColor } from "../../assets/utils/statusColors";
import Paginator from "../../components/Paginator";
import Swal from "sweetalert2";

const EmployerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({});
  const [jobs, setOrders] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [currency] = useState(process.env.REACT_APP_CURRENCY);
  const [tab, setTab] = useState("info");
  const [employer, setEmployer] = useState({});
  const [apiData, setApiData] = useState({
    search: "",
    daterange: "",
    page: 1,
    employer_id: id,
    type: "",
    status: "",
  });

  useEffect(() => {
    if (id) {
      getSingleData();
    }
  }, [id]);

  const getSingleData = async () => {
    try {
      setIsLoader(true);
      const response = await ApiService.request({
        method: "GET",
        url: `employers/${id}`,
      });
      const data = response.data;
      if (data.status) {
        setEmployer(data.data);
      } else {
        toast.error(data.message);
      }
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
    }
  };

  const getOrders = async () => {
    try {
      setIsLoader(true);
      const response = await ApiService.request({
        method: "GET",
        url: "jobs",
        data: {
          employer_id: id,
          page: apiData.page,
          search: apiData.search || "",
          status: apiData.status || "",
          type: apiData.type || "",
          daterange: apiData.daterange || "",
        },
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
    if (tab === "jobs" && "id") {
      getOrders();
    }
  }, [tab, id]);

  const getPosts = async () => {
    try {
      setIsLoader(true);
      const response = await ApiService.request({
        method: "GET",
        url: "posts",
        data: {
          employer_id: id,
          page: apiData.page,
          search: apiData.search || "",
          status: apiData.status || "",
          type: apiData.type || "",
          daterange: apiData.daterange || "",
        },
      });

      const data = response.data;
      if (data.status) {
        setPosts(data.data);
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
    if (tab === "posts" && "id") {
      getPosts();
    }
  }, [tab, id]);

  const handlePageChange = (event) => {
    setApiData((prev) => ({ ...prev, page: event }));
  };

  const handleApprove = () => {
    Swal.fire({
      title: "Approve Employer",
      text: "Are you sure you want to approve this employer?",
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
            url: `employers/approval-status/${id}`,
            data: { status: "Approved" },
          });
          if (response.data.status) {
            toast.success(response.data.message);
            getSingleData();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("Error approving employer");
        } finally {
          setIsLoader(false);
        }
      }
    });
  };

  const handleReject = () => {
    Swal.fire({
      title: "Reject Employer",
      html: `
        <p>Are you sure you want to reject this employer?</p>
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
            url: `employers/approval-status/${id}`,
            data: { status: "Rejected", reason: result.value },
          });
          if (response.data.status) {
            toast.success(response.data.message);
            getSingleData();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("Error rejecting employer");
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
              Employer: {employer?.name}
              {employer?.status === "Pending" && (
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
                <Link to="/companies" className="text-muted text-hover-primary">
                  Employers
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center gap-2 gap-lg-3">
            {employer?.status === "Pending" && (
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

            {employer?.status === "Approved" && (
              <button onClick={handleReject} className="btn btn-sm btn-danger">
                <i className="bi bi-x-circle-fill me-2"></i> Reject
              </button>
            )}

            {employer?.status === "Rejected" && (
              <button
                onClick={handleApprove}
                className="btn btn-sm btn-success"
              >
                <i className="bi bi-check-circle-fill me-2"></i> Approve
              </button>
            )}

            <Link to="/companies" className="btn btn-sm btn-light-primary">
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
                    <i className="bi bi-building me-2"></i> Employer Info
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${tab === "jobs" ? "active" : ""}`}
                    onClick={() => setTab("jobs")}
                  >
                    <i className="bi bi-list-check me-2"></i> Jobs
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${tab === "posts" ? "active" : ""}`}
                    onClick={() => setTab("posts")}
                  >
                    <i class="bi bi-file-post me-2"></i> Posts
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
                                          src={employer.logo || "/assets/images/blank.png"}
                                          alt="logo"
                                          className="w-45px h-45px object-cover rounded-circle"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="w-25 fw-semibold text-muted">
                                        Cover Images
                                      </th>
                                      <td>
                                        {employer.coverImages &&
                                        employer.coverImages.length > 0 ? (
                                          employer.coverImages.map(
                                            (img, index) => (
                                              <img
                                                key={index}
                                                src={img}
                                                alt={`cover-${index}`}
                                                className="w-45px h-45px object-cover rounded-2 me-2"
                                              />
                                            )
                                          )
                                        ) : (
                                          <span>N/A</span>
                                        )}
                                      </td>
                                    </tr>

                                    <tr>
                                      <th className="w-25 fw-semibold text-muted">
                                        Name
                                      </th>
                                      <td>{employer.name}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Email
                                      </th>
                                      <td>{employer.email}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Phone
                                      </th>
                                      <td>{employer.phone}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Website
                                      </th>
                                      <td>
                                        {employer.website ? (
                                          <a href={employer.website} target="_blank" rel="noopener noreferrer">
                                            {employer.website}
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
                                      <td>{employer.industry}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Description
                                      </th>
                                      <td>{employer.description}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Address
                                      </th>
                                      <td>
                                        {employer.address ? (
                                          <div>
                                            {employer.address.street && <div>{employer.address.street}</div>}
                                            {employer.address.city && <div>{employer.address.city}</div>}
                                            {employer.address.state && <div>{employer.address.state}</div>}
                                            {employer.address.country && <div>{employer.address.country}</div>}
                                            {employer.address.zipCode && <div>{employer.address.zipCode}</div>}
                                          </div>
                                        ) : (
                                          "N/A"
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
                                        Company Size
                                      </th>
                                      <td>{employer.companySize}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Founded Year
                                      </th>
                                      <td>{employer.foundedYear}</td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Status
                                      </th>
                                      <td>
                                        <span className={`badge ${
                                          employer.status === "Pending"
                                            ? "bg-warning text-dark"
                                            : employer.status === "Rejected"
                                            ? "bg-danger"
                                            : employer.status === "Approved"
                                            ? "bg-success"
                                            : "bg-secondary"
                                        }`}>
                                          {employer.status}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Verification Status
                                      </th>
                                      <td>
                                        <span className={`badge ${
                                          employer.verificationStatus === "Verified"
                                            ? "bg-success"
                                            : employer.verificationStatus === "Unverified"
                                            ? "bg-warning text-dark"
                                            : "bg-secondary"
                                        }`}>
                                          {employer.verificationStatus}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Is Active
                                      </th>
                                      <td>
                                        <span className={`badge ${
                                          employer.isActive ? "bg-success" : "bg-danger"
                                        }`}>
                                          {employer.isActive ? "Active" : "Inactive"}
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Benefits
                                      </th>
                                      <td>
                                        {employer.benefits && employer.benefits.length > 0 ? (
                                          <ul className="list-unstyled">
                                            {employer.benefits.map((benefit, index) => (
                                              <li key={index} className="mb-1">
                                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                {benefit}
                                              </li>
                                            ))}
                                          </ul>
                                        ) : (
                                          "N/A"
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Facilities
                                      </th>
                                      <td>
                                        {employer.facilities && employer.facilities.length > 0 ? (
                                          <ul className="list-unstyled">
                                            {employer.facilities.map((facility, index) => (
                                              <li key={index} className="mb-1">
                                                <i className="bi bi-building text-primary me-2"></i>
                                                {facility}
                                              </li>
                                            ))}
                                          </ul>
                                        ) : (
                                          "N/A"
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Contact Person
                                      </th>
                                      <td>
                                        {employer.contactPerson ? (
                                          <div>
                                            <div><strong>Name:</strong> {employer.contactPerson.name}</div>
                                            <div><strong>Position:</strong> {employer.contactPerson.position}</div>
                                            <div><strong>Email:</strong> {employer.contactPerson.email}</div>
                                            <div><strong>Phone:</strong> {employer.contactPerson.phone}</div>
                                          </div>
                                        ) : (
                                          "N/A"
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Social Media
                                      </th>
                                      <td>
                                        {employer.socialMedia ? (
                                          <div>
                                            {employer.socialMedia.linkedin && (
                                              <div className="mb-1">
                                                <i className="bi bi-linkedin text-primary me-2"></i>
                                                <a href={employer.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                                                  LinkedIn
                                                </a>
                                              </div>
                                            )}
                                            {employer.socialMedia.twitter && (
                                              <div className="mb-1">
                                                <i className="bi bi-twitter text-info me-2"></i>
                                                <a href={employer.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                                                  Twitter
                                                </a>
                                              </div>
                                            )}
                                            {employer.socialMedia.facebook && (
                                              <div className="mb-1">
                                                <i className="bi bi-facebook text-primary me-2"></i>
                                                <a href={employer.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                                                  Facebook
                                                </a>
                                              </div>
                                            )}
                                          </div>
                                        ) : (
                                          "N/A"
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Created at
                                      </th>
                                      <td>
                                        {formatDate(
                                          employer.createdAt,
                                          "DD MMM YYYY, hh:mm A"
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="fw-semibold text-muted">
                                        Created by
                                      </th>
                                      <td>
                                        {employer.created_by ? (
                                          <div>
                                            <div>{employer.created_by.name}</div>
                                            <div className="text-muted fs-7">{employer.created_by.email}</div>
                                          </div>
                                        ) : (
                                          "N/A"
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

                  {tab === "jobs" && (
                    <div className="tab-pane fade show active">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title fw-bold">Job Details</h3>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-hover align-middle">
                              <thead>
                                <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                                  <th>Title</th>
                                  <th>Job Sector</th>
                                  <th>Job Type</th>
                                  <th>Contract Type</th>
                                  <th>Duration</th>
                                  <th>Created At</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody className="fw-semibold text-gray-600">
                                {jobs.length > 0 ? (
                                  jobs.map((item, index) => (
                                    <tr key={index}>
                                      <td>{item.title}</td>

                                      <td>{item.job_sector}</td>
                                      <td>{item.job_type}</td>
                                      <td>{item.contract_type}</td>
                                      <td>{item.duration}</td>
                                      <td>
                                        {formatDate(
                                          item.createdAt,
                                          "DD MMM YYYY, hh:mm A"
                                        )}
                                      </td>

                                      {/* Actions */}
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
                                      colSpan="7"
                                      className="text-center py-10"
                                    >
                                      <div className="text-muted">
                                        No jobs found for this employer
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
                  )}
                  {tab === "posts" && (
                    <div className="tab-pane fade show active">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title fw-bold">Post Details</h3>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-hover align-middle">
                              <thead>
                                <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                                  <th>Image</th>
                                  <th>Title</th>
                                  <th>Description</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody className="fw-semibold text-gray-600">
                                {posts.length > 0 ? (
                                  posts.map((item, index) => (
                                    <tr key={index}>
                                      <td>
                                        <img
                                          src={item.images || "-"}
                                          className="object-fit rounded-2 w-45px h-45px"
                                          alt=""
                                        />
                                      </td>
                                      <td>{item.title || "-"}</td>

                                      <td>
                                        {item.description
                                          ? item.description.length > 100
                                            ? item.description.substring(
                                                0,
                                                100
                                              ) + "..."
                                            : item.description
                                          : "-"}
                                      </td>

                                      <td>
                                        <Link
                                          to={`/companies/${item._id}`}
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
                                        No posts found for this employer
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
                                Showing {posts.length}
                                <span className="me-2">of</span>
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDetails;
