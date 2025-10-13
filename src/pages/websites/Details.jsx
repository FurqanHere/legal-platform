import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";
import Loader from "../../components/Loader";

const WebsiteDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoader, setIsLoader] = useState(false);
  const [website, setWebsite] = useState(null);

  useEffect(() => {
    fetchWebsiteDetails();
  }, [id]);

  const fetchWebsiteDetails = async () => {
    setIsLoader(true);
    try {
      const response = await ApiService.request({
        method: "GET",
        url: `websites/${id}`
      });
      
      const data = response.data;
      if (data.status) {
        setWebsite(data.data);
      } else {
        toast.error(data.message);
        navigate("/websites");
      }
    } catch (error) {
      console.error("Error fetching website details:", error);
      navigate("/websites");
    } finally {
      setIsLoader(false);
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

  if (isLoader) {
    return <Loader />;
  }

  if (!website) {
    return (
      <div className="d-flex flex-column flex-column-fluid">
        <div className="container-xxl">
          <div className="card">
            <div className="card-body text-center py-10">
              <div className="text-muted">Website not found</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div className="toolbar" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
          <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
            <h1 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">
              {website.name}
            </h1>
            <span className="h-20px border-gray-300 border-start ms-3 mx-2"></span>
            <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1 pt-1">
              <li className="breadcrumb-item text-muted">Dashboard</li>
              <li className="breadcrumb-item">
                <span className="bullet bg-gray-300 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-muted">Websites</li>
              <li className="breadcrumb-item">
                <span className="bullet bg-gray-300 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-muted">Details</li>
            </ul>
          </div>
          <div className="d-flex align-items-center gap-2 gap-lg-3">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => navigate(`/websites/create/${id}`)}
            >
              <i className="bi bi-pencil fs-4"></i>
              Edit Website
            </button>
            <button
              type="button"
              className="btn btn-sm btn-light"
              onClick={() => navigate("/websites")}
            >
              <i className="bi bi-arrow-left fs-4"></i>
              Back to List
            </button>
          </div>
        </div>
      </div>

      <div id="kt_content_container" className="container-xxl">
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <h3 className="fw-bolder m-0">Website Information</h3>
                </div>
              </div>
              <div className="card-body">
                <div className="row mb-5">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      {website.logo && (
                        <div className="symbol symbol-60px me-5">
                          <img src={website.logo} alt={website.name} />
                        </div>
                      )}
                      <div>
                        <h4 className="fw-bolder mb-1">{website.name}</h4>
                        <a href={website.url} target="_blank" rel="noopener noreferrer" className="text-primary">
                          {website.url}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-column">
                      <span className="text-muted mb-1">Category</span>
                      <span className={getCategoryBadge(website.category)}>
                        {website.category}
                      </span>
                    </div>
                    <div className="d-flex flex-column mt-3">
                      <span className="text-muted mb-1">Status</span>
                      <span className={getStatusBadge(website.status)}>
                        {website.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <h5 className="fw-bolder mb-3">Description</h5>
                  <p className="text-gray-600">{website.description}</p>
                </div>

                {website.technologies && website.technologies.length > 0 && (
                  <div className="mb-5">
                    <h5 className="fw-bolder mb-3">Technologies Used</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {website.technologies.map((tech, index) => (
                        <span key={index} className="badge bg-light-primary text-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {website.features && website.features.length > 0 && (
                  <div className="mb-5">
                    <h5 className="fw-bolder mb-3">Features</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {website.features.map((feature, index) => (
                        <span key={index} className="badge bg-light-success text-success">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {website.screenshots && website.screenshots.length > 0 && (
                  <div className="mb-5">
                    <h5 className="fw-bolder mb-3">Screenshots</h5>
                    <div className="row">
                      {website.screenshots.map((screenshot, index) => (
                        <div key={index} className="col-md-4 mb-3">
                          <img
                            src={screenshot}
                            alt={`Screenshot ${index + 1}`}
                            className="img-fluid rounded border"
                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <h3 className="fw-bolder m-0">Client Information</h3>
                </div>
              </div>
              <div className="card-body">
                {website.client && (
                  <>
                    {website.client.name && (
                      <div className="mb-3">
                        <span className="text-muted d-block">Name</span>
                        <span className="fw-bold">{website.client.name}</span>
                      </div>
                    )}
                    {website.client.email && (
                      <div className="mb-3">
                        <span className="text-muted d-block">Email</span>
                        <a href={`mailto:${website.client.email}`} className="text-primary">
                          {website.client.email}
                        </a>
                      </div>
                    )}
                    {website.client.phone && (
                      <div className="mb-3">
                        <span className="text-muted d-block">Phone</span>
                        <a href={`tel:${website.client.phone}`} className="text-primary">
                          {website.client.phone}
                        </a>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="card mt-5">
              <div className="card-header">
                <div className="card-title">
                  <h3 className="fw-bolder m-0">SEO & Analytics</h3>
                </div>
              </div>
              <div className="card-body">
                {website.seo && (
                  <>
                    {website.seo.title && (
                      <div className="mb-3">
                        <span className="text-muted d-block">SEO Title</span>
                        <span className="fw-bold">{website.seo.title}</span>
                      </div>
                    )}
                    {website.seo.description && (
                      <div className="mb-3">
                        <span className="text-muted d-block">SEO Description</span>
                        <span className="fw-bold">{website.seo.description}</span>
                      </div>
                    )}
                    {website.seo.keywords && website.seo.keywords.length > 0 && (
                      <div className="mb-3">
                        <span className="text-muted d-block">SEO Keywords</span>
                        <div className="d-flex flex-wrap gap-1">
                          {website.seo.keywords.map((keyword, index) => (
                            <span key={index} className="badge bg-light-info text-info">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {website.analytics && (
                  <>
                    {website.analytics.googleAnalyticsId && (
                      <div className="mb-3">
                        <span className="text-muted d-block">Google Analytics ID</span>
                        <span className="fw-bold">{website.analytics.googleAnalyticsId}</span>
                      </div>
                    )}
                    {website.analytics.googleTagManagerId && (
                      <div className="mb-3">
                        <span className="text-muted d-block">Google Tag Manager ID</span>
                        <span className="fw-bold">{website.analytics.googleTagManagerId}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="card mt-5">
              <div className="card-header">
                <div className="card-title">
                  <h3 className="fw-bolder m-0">Social Media</h3>
                </div>
              </div>
              <div className="card-body">
                {website.socialMedia && (
                  <div className="d-flex flex-column gap-3">
                    {website.socialMedia.facebook && (
                      <a href={website.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-primary">
                        <i className="bi bi-facebook fs-3 me-3"></i>
                        Facebook
                      </a>
                    )}
                    {website.socialMedia.twitter && (
                      <a href={website.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-primary">
                        <i className="bi bi-twitter fs-3 me-3"></i>
                        Twitter
                      </a>
                    )}
                    {website.socialMedia.instagram && (
                      <a href={website.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-primary">
                        <i className="bi bi-instagram fs-3 me-3"></i>
                        Instagram
                      </a>
                    )}
                    {website.socialMedia.linkedin && (
                      <a href={website.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-primary">
                        <i className="bi bi-linkedin fs-3 me-3"></i>
                        LinkedIn
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="card mt-5">
              <div className="card-header">
                <div className="card-title">
                  <h3 className="fw-bolder m-0">Website Details</h3>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <span className="text-muted d-block">Created</span>
                  <span className="fw-bold">{new Date(website.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="mb-3">
                  <span className="text-muted d-block">Last Updated</span>
                  <span className="fw-bold">{new Date(website.lastUpdated).toLocaleDateString()}</span>
                </div>
                {website.launchDate && (
                  <div className="mb-3">
                    <span className="text-muted d-block">Launch Date</span>
                    <span className="fw-bold">{new Date(website.launchDate).toLocaleDateString()}</span>
                  </div>
                )}
                {website.createdBy && (
                  <div className="mb-3">
                    <span className="text-muted d-block">Created By</span>
                    <span className="fw-bold">{website.createdBy.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetails;

