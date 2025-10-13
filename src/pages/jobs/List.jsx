import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Paginator from "../../components/Paginator";
import ApiService from "../../services/ApiService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../utils/helper";
import { statusColor } from "../../assets/utils/statusColors";
import { Dropdown } from "primereact/dropdown";

const List = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currency] = useState(process.env.REACT_APP_CURRENCY);
  const { type } = useParams();
  const [apiData, setApiData] = useState({
    search: "",
    daterange: "",
    status: "",
    page: 1,
    type: type,
  });
  useEffect(() => {
    // Update apiData with the new type whenever it changes
    setApiData((prevData) => ({ ...prevData, type }));
  }, [type]);

  useEffect(() => {
    getJobs();
  }, [
    apiData.page,
    apiData.search,
    apiData.daterange,
    apiData.type,
    apiData.status,
  ]); // Dependency array for re-fetching data

  const getJobs = async () => {
    try {
      setIsLoader(true);
      const response = await ApiService.request({
        method: "GET",
        url: "jobs", // Replace with your API endpoint
        data: apiData,
      });
      const data = response.data;
      if (data.status) {
        setJobs(data.data);
        setPagination(data.pagination);
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

  const clearFilter = () => {
    setApiData({
      search: "",
      daterange: "",
      page: 1,
      type: "",
      status: "",
    });
  };

  const delData = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "you will not be able to revert it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#9E9B9B",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      const response = await ApiService.request({
        method: "DELETE",
        url: `jobs/${id}`, // Replace with your API endpoint
      });
      const data = response.data;
      if (data.status) {
        getJobs();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
  };

  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
        <div
          id="kt_app_toolbar_container"
          className="app-container container-xxl d-flex flex-stack"
        >
          <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0 text-capitalize">
              Job Management
            </h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
              <li className="breadcrumb-item text-muted">
                <Link to="/dashboard" className="text-muted text-hover-primary">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <span className="bullet bg-gray-400 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-muted">Jobs</li>
            </ul>
          </div>
          <div className="d-flex align-projects-center gap-2 gap-lg-3">
            {/* Add New projects Button */}
            {/* <Link to={`/projects/create`}  className='btn btn-base btn-sm'>Add New Project</Link> */}
          </div>
        </div>
      </div>
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="app-container container-xxl"
        >
          <div className="card">
            <div className="card-header bproject-0 pt-6">
              <div className="w-100">
                <form method="get">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="d-flex align-projects-center position-relative mb-1">
                        <input
                          type="text"
                          value={apiData.search}
                          onChange={(e) =>
                            setApiData({ ...apiData, search: e.target.value })
                          }
                          className="form-control form-control-solid me-5"
                          placeholder="Search by Title..."
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <DatePicker
                        selectsRange={true}
                        startDate={apiData.daterange[0]}
                        endDate={apiData.daterange[1]}
                        onChange={(e) =>
                          setApiData({ ...apiData, daterange: e })
                        }
                        isClearable={true}
                        className="form-control form-control-solid"
                        placeholderText={"Select Daterange"}
                      />
                    </div>
                    <div className="col-md-3">
                      <Dropdown
                        value={apiData.status}
                        options={[
                          { label: "Active", value: "Active" },
                          { label: "Draft", value: "Draft" },
                          { label: "Expired", value: "Expired" },
                        ]}
                        onChange={(e) =>
                          setApiData({ ...apiData, status: e.value })
                        }
                        placeholder="Select Status"
                        className="w-full"
                      />
                    </div>
                    <div className="col-md-3 mt-2">
                      <button
                        type="button"
                        onClick={clearFilter}
                        className={`btn btn-sm btn-secondary mx-1 ${
                          !apiData.search && !apiData.daterange ? "d-none" : ""
                        }`}
                      >
                        {"clear"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card-body pt-0">
              <div
                id="kt_projects_table_wrapper"
                className="dataTables_wrapper dt-bootstrap4 no-footer"
              >
                <div className="table-responsive">
                  <table className="table align-middle table-hover fs-6 gy-5 dataTable no-footer">
                    <thead>
                      <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                        <th>Employer</th>
                        <th>Job Title</th>
                        <th>Job Type</th>
                        <th>Area</th>
                        <th>Salary Range</th>
                        <th>Job Sector</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="fw-semibold text-gray-600 fs-6">
                      {jobs.length > 0 ? (
                        jobs.map((job, index) => (
                          <tr key={index}>
                            <td>
                              <Link to={`/jobs/${job._id}`}>
                                <div className="d-flex align-items-center">
                                  <div className="symbol symbol-40px me-3">
                                    <div className="symbol-label bg-light-primary">
                                      <i className="bi bi-building text-primary fs-2"></i>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-column">
                                    <span className="fw-bold text-dark">
                                      {job.employee_id?.name || "--"}
                                    </span>
                                    <span className="text-muted fs-7">
                                      {job.employee_id?.industry || "--"}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/jobs/${job._id}`}
                                className="d-flex flex-column"
                              >
                                <span className="fw-bold text-dark">
                                  {job.title || "--"}
                                </span>
                                <span className="text-muted fs-7">
                                  {job.experience_level} • {job.education_level}
                                </span>
                              </Link>
                            </td>

                            <td>
                              <Link to={`/jobs/${job._id}`}>
                                <span className="badge badge-light-info">
                                  {job.job_type}
                                </span>
                              </Link>
                            </td>
                            <td>
                              <Link to={`/jobs/${job._id}`}>
                                <span className="text-dark">{job.area}</span>
                                <br />
                                <span className="text-muted fs-7">{job.location_type}</span>
                              </Link>
                            </td>
                            <td>
                              <Link to={`/jobs/${job._id}`}>
                                {job.monthly_salary_from && job.monthly_salary_to ? (
                                  <span className="text-dark">
                                    {currency} {job.monthly_salary_from.toLocaleString()} - {job.monthly_salary_to.toLocaleString()}
                                  </span>
                                ) : (
                                  <span className="text-muted">--</span>
                                )}
                              </Link>
                            </td>
                            <td>
                              <Link to={`/jobs/${job._id}`}>
                                <span className="badge badge-light-primary">
                                  {job.job_sector}
                                </span>
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/jobs/${job._id}`}
                                className={`badge ${
                                  job.status === "Active"
                                    ? "bg-success"
                                    : job.status === "Draft"
                                    ? "bg-warning text-dark"
                                    : job.status === "Expired"
                                    ? "bg-danger"
                                    : "bg-secondary"
                                }`}
                              >
                                {job.status}
                              </Link>
                            </td>

                            <td>
                              <Link to={`/jobs/${job._id}`}>
                                {formatDate(
                                  job.createdAt,
                                  "DD MMM YYYY, hh:mm A"
                                )}
                              </Link>
                            </td>
                            <td className="mt-2">
                              <Link
                                to={`/jobs/${job._id}`}
                                className="btn btn-sm h-30px btn-light-primary"
                              >
                                <i className="bi bi-eye-fill fs-6"></i>
                              </Link>
                              <Link
                                to={`/jobs/create/${job._id}`}
                                className="btn btn-sm h-30px btn-light-primary"
                              >
                                <i className="bi bi-pencil-fill fs-6"></i>
                              </Link>

                              <button
                                onClick={() => delData(job._id)}
                                className="btn btn-sm h-30px btn-light-primary"
                              >
                                <i className="bi bi-trash-fill fs-6"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="11"
                            className="text-dark text-center mt-2"
                          >
                            No data found!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {isLoader && (
                    <Loader text="Loading" size="30" className="text-center" />
                  )}
                  <span>Total Records: {pagination?.total_records}</span>

                  {pagination.total_pages > 1 && (
                    <Paginator
                      page={pagination.current_page}
                      rows={pagination.per_page}
                      totalRecords={pagination.total_records}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
