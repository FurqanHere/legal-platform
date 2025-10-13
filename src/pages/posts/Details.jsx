import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";
import { formatDate } from "../../utils/helper.js";
import { statusColor } from "../../assets/utils/statusColors";
import Paginator from "../../components/Paginator";
import Swal from "sweetalert2";

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const [currency] = useState(process.env.REACT_APP_CURRENCY);
  const [tab, setTab] = useState("info");
  const [company, setCompany] = useState({});
  const [companies, setCompanies] = useState([]);
  const [apiData, setApiData] = useState({
    search: "",
    daterange: "",
    page: 1,
    company_id: id,
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
        url: `posts/${id}`,
      });
      const data = response.data;
      if (data.status) {
        setCompany(data.data);
        setCompanies([data.data]);
      } else {
        toast.error(data.message);
      }
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
    }
  };

  const handlePageChange = (event) => {
    setApiData((prev) => ({ ...prev, page: event }));
  };

  const handleApprove = () => {
    Swal.fire({
      title: "Approve Company",
      text: "Are you sure you want to approve this company?",
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
            url: `companies/approval-status/${id}`,
            data: { status: "Approved" },
          });
          if (response.data.status) {
            toast.success(response.data.message);
            getSingleData();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("Error approving company");
        } finally {
          setIsLoader(false);
        }
      }
    });
  };

  const handleReject = () => {
    Swal.fire({
      title: "Reject Company",
      html: `
        <p>Are you sure you want to reject this company?</p>
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
            url: `companies/approval-status/${id}`,
            data: { status: "Rejected", reason: result.value },
          });
          if (response.data.status) {
            toast.success(response.data.message);
            getSingleData();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("Error rejecting company");
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
              Post: {company?.company_id?.company_name}
              {company?.status === "pending" && (
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
                  Post
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center gap-2 gap-lg-3">
            {company?.approval_status === "Pending" && (
              <>
                <button
                  onClick={handleApprove}
                  className="btn btn-sm btn-success"
                >
                  <i className="bi bi-check-circle-fill me-2"></i> Approved
                </button>
                <button
                  onClick={handleReject}
                  className="btn btn-sm btn-danger"
                >
                  <i className="bi bi-x-circle-fill me-2"></i> Reject
                </button>
              </>
            )}
            <Link to="/posts" className="btn btn-sm btn-light-primary">
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
                    <i className="bi bi-building me-2"></i> Posts Info
                  </button>
                </li>
                {/* <li className="nav-item">
                  <button
                    className={`nav-link ${tab === "posts" ? "active" : ""}`}
                    onClick={() => setTab("posts")}
                  >
                    <i class="bi bi-file-post me-2"></i> Posts
                  </button>
                </li> */}
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
                                Post Details
                              </h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-bordered align-middle">
                                  <tbody>
                                    <tr>
                                      <td>Images</td>
                                      <td>
                                        <div className="d-flex gap-2">
                                          {company.images?.map((img, index) => (
                                            <img
                                              key={index}
                                              src={img}
                                              alt={`logo-${index}`}
                                              className="w-45px h-45px object-cover rounded-2"
                                            />
                                          ))}
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Title</td>
                                      <td>{company.title}</td>
                                    </tr>

                                    <tr>
                                      <td>Description</td>
                                      <td>{company.description}</td>
                                    </tr>

                                    <tr>
                                      <td>Created At</td>
                                      <td>
                                        {formatDate(
                                          company.createdAt,
                                          "DD MMM YYYY, hh:mm A"
                                        )}
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Updated At</td>
                                      <td>
                                        {formatDate(
                                          company.updatedAt,
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
                                Company Details
                              </h3>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-bordered align-middle">
                                  <tbody>
                                    {[
                                      {
                                        label: "Logo",
                                        value: (
                                          <img
                                            src={company?.company_id?.logo}
                                            alt={
                                              company?.company_id?.company_name
                                            }
                                            className="w-45px h-45px object-cover rounded-circle"
                                          />
                                        ),
                                      },
                                      {
                                        label: "Company Name",
                                        value:
                                          company?.company_id?.company_name,
                                      },
                                      {
                                        label: "Name",
                                        value: company?.company_id?.name,
                                      },
                                      {
                                        label: "Email",
                                        value: company?.company_id?.email,
                                      },
                                      {
                                        label: "Phone",
                                        value: `+${company?.company_id?.phone_code}${company?.company_id?.phone}`,
                                      },
                                    ].map((row, index) => (
                                      <tr key={index}>
                                        <th className="fw-semibold text-muted">
                                          {row.label}
                                        </th>
                                        <td>{row.value || "-"}</td>
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
