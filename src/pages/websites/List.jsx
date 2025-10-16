import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";
import Loader from "../../components/Loader";

const WebsiteList = () => {
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false);
  const [websites, setWebsites] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    category: "",
    status: ""
  });

  useEffect(() => {
    fetchWebsites();
  }, [filters]);

  const fetchWebsites = async () => {
    setIsLoader(true);
    try {
      const response = await ApiService.request({
        method: "GET",
        url: "websites",
        data: filters
      });
      
      const data = response.data;
      if (data.status) {
        setWebsites(data.data.websites);
        setPagination(data.data.pagination);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching websites:", error);
    } finally {
      setIsLoader(false);
    }
  };

  const handleSearch = (e) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value,
      page: 1
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
      page: 1
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this website?")) {
      try {
        const response = await ApiService.request({
          method: "DELETE",
          url: `websites/${id}`
        });
        
        const data = response.data;
        if (data.status) {
          toast.success(data.message);
          fetchWebsites();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error deleting website:", error);
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: "badge bg-success",
      inactive: "badge bg-secondary",
      maintenance: "badge bg-warning"
    };
    return statusClasses[status] || "badge bg-secondary";
  };

  const getCategoryBadge = (category) => {
    const categoryClasses = {
      business: "badge bg-primary",
      portfolio: "badge bg-info",
      ecommerce: "badge bg-success",
      blog: "badge bg-warning",
      corporate: "badge bg-dark",
      other: "badge bg-secondary"
    };
    return categoryClasses[category] || "badge bg-secondary";
  };

  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div className="toolbar" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
          <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
            <h1 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">Websites</h1>
            <span className="h-20px border-gray-300 border-start ms-3 mx-2"></span>
            <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1 pt-1">
              <li className="breadcrumb-item text-muted">Dashboard</li>
              <li className="breadcrumb-item">
                <span className="bullet bg-gray-300 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-muted">Websites</li>
            </ul>
          </div>
          <div className="d-flex align-items-center gap-2 gap-lg-3">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => navigate("/websites/create")}
            >
              <i className="bi bi-plus-circle fs-4"></i>
              Add Website
            </button>
          </div>
        </div>
      </div>

      <div id="kt_content_container" className="container-xxl">
        <div className="card">
          <div className="card-header border-0 pt-6">
            <div className="card-title">
              <div className="d-flex align-items-center position-relative my-1">
                <i className="bi bi-search fs-3 position-absolute ms-5"></i>
                <input
                  type="text"
                  className="form-control form-control-solid w-250px ps-13"
                  placeholder="Search websites..."
                  value={filters.search}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="card-toolbar">
              <div className="d-flex justify-content-end" data-kt-customer-table-toolbar="base">
                <select
                  className="form-select form-select-solid w-150px me-3"
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="business">Business</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="blog">Blog</option>
                  <option value="corporate">Corporate</option>
                  <option value="other">Other</option>
                </select>
                <select
                  className="form-select form-select-solid w-150px"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card-body pt-0">
            {isLoader ? (
              <Loader />
            ) : (
              <div className="table-responsive">
                <table className="table align-middle table-row-dashed fs-6 gy-5">
                  <thead>
                    <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                      <th className="min-w-125px">Website</th>
                      <th className="min-w-125px">Category</th>
                      <th className="min-w-125px">Status</th>
                      <th className="min-w-125px">Client</th>
                      <th className="min-w-125px">Created</th>
                      <th className="text-end min-w-100px">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 fw-bold">
                    {websites.length > 0 ? (
                      websites.map((website) => (
                        <tr key={website._id}>
                          <td>
                            <div className="d-flex align-items-center">
                              {website.logo && (
                                <div className="symbol symbol-50px me-5">
                                  <img src={website.logo} alt={website.name} />
                                </div>
                              )}
                              <div className="d-flex justify-content-start flex-column">
                                <a href="#" className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                                  {website.name}
                                </a>
                                <span className="text-muted fw-bold text-muted d-block fs-7">
                                  {website.url}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={getCategoryBadge(website.category)}>
                              {website.category}
                            </span>
                          </td>
                          <td>
                            <span className={getStatusBadge(website.status)}>
                              {website.status}
                            </span>
                          </td>
                          <td>
                            {website.client?.name || "N/A"}
                          </td>
                          <td>
                            {new Date(website.createdAt).toLocaleDateString()}
                          </td>
                          <td className="text-end">
                            <div className="d-flex justify-content-end flex-shrink-0">
                              <button
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                onClick={() => navigate(`/websites/${website._id}`)}
                                title="View Details"
                              >
                                <i className="bi bi-eye fs-3"></i>
                              </button>
                              <button
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                onClick={() => navigate(`/websites/create/${website._id}`)}
                                title="Edit"
                              >
                                <i className="bi bi-pencil fs-3"></i>
                              </button>
                              <button
                                className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
                                onClick={() => handleDelete(website._id)}
                                title="Delete"
                              >
                                <i className="bi bi-trash fs-3"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-10">
                          <div className="text-muted">No websites found</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* {pagination.totalPages > 1 && (
              <div className="d-flex flex-stack flex-wrap pt-10">
                <div className="fs-6 fw-bold text-gray-700">
                  Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{" "}
                  {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{" "}
                  {pagination.totalItems} entries
                </div>
                <Paginator
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteList;

