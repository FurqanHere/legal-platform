import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";
import Loader from "../../components/Loader";
import ImageUpload from "../../components/ImageUpload";

const AddUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [isLoader, setIsLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    category: "other",
    status: "active",
    technologies: [],
    features: [],
    client: {
      name: "",
      email: "",
      phone: ""
    },
    seo: {
      title: "",
      description: "",
      keywords: []
    },
    analytics: {
      googleAnalyticsId: "",
      googleTagManagerId: ""
    },
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: ""
    }
  });
  const [logoFile, setLogoFile] = useState(null);
  const [screenshotFiles, setScreenshotFiles] = useState([]);

  useEffect(() => {
    if (isEdit) {
      fetchWebsiteData();
    }
  }, [id]);

  const fetchWebsiteData = async () => {
    setIsLoader(true);
    try {
      const response = await ApiService.request({
        method: "GET",
        url: `websites/${id}`
      });
      
      const data = response.data;
      if (data.status) {
        setFormData(data.data);
      } else {
        toast.error(data.message);
        navigate("/websites");
      }
    } catch (error) {
      console.error("Error fetching website:", error);
      navigate("/websites");
    } finally {
      setIsLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [field]: items
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoader(true);

    try {
      const submitData = new FormData();
      
      // Append form data
      Object.keys(formData).forEach(key => {
        if (key === 'client' || key === 'seo' || key === 'analytics' || key === 'socialMedia') {
          Object.keys(formData[key]).forEach(subKey => {
            if (formData[key][subKey]) {
              submitData.append(`${key}.${subKey}`, formData[key][subKey]);
            }
          });
        } else if (Array.isArray(formData[key])) {
          formData[key].forEach(item => {
            submitData.append(`${key}[]`, item);
          });
        } else if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      // Append files
      if (logoFile) {
        submitData.append('logo', logoFile);
      }
      screenshotFiles.forEach(file => {
        submitData.append('screenshots', file);
      });

      const response = await ApiService.request({
        method: isEdit ? "PUT" : "POST",
        url: isEdit ? `websites/${id}` : "websites",
        data: submitData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const data = response.data;
      if (data.status) {
        toast.success(data.message);
        navigate("/websites");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error saving website:", error);
    } finally {
      setIsLoader(false);
    }
  };

  const categoryOptions = [
    { value: "business", label: "Business" },
    { value: "portfolio", label: "Portfolio" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "blog", label: "Blog" },
    { value: "corporate", label: "Corporate" },
    { value: "other", label: "Other" }
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "maintenance", label: "Maintenance" }
  ];

  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div className="toolbar" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
          <div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
            <h1 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">
              {isEdit ? "Edit Website" : "Add Website"}
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
              <li className="breadcrumb-item text-muted">{isEdit ? "Edit" : "Add"}</li>
            </ul>
          </div>
        </div>
      </div>

      <div id="kt_content_container" className="container-xxl">
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <h3 className="fw-bolder m-0">Website Information</h3>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-5">
                    <label className="form-label required">Website Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-5">
                    <label className="form-label required">Website URL</label>
                    <input
                      type="url"
                      className="form-control"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-5">
                    <label className="form-label required">Category</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      {categoryOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-5">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="form-label required">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-5">
                    <label className="form-label">Technologies (comma separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.technologies.join(', ')}
                      onChange={(e) => handleArrayChange('technologies', e.target.value)}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-5">
                    <label className="form-label">Features (comma separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.features.join(', ')}
                      onChange={(e) => handleArrayChange('features', e.target.value)}
                      placeholder="Responsive Design, SEO Optimized"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-5">
            <div className="card-header">
              <div className="card-title">
                <h3 className="fw-bolder m-0">Client Information</h3>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-5">
                    <label className="form-label">Client Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="client.name"
                      value={formData.client.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-5">
                    <label className="form-label">Client Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="client.email"
                      value={formData.client.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-5">
                    <label className="form-label">Client Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="client.phone"
                      value={formData.client.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-5">
            <div className="card-header">
              <div className="card-title">
                <h3 className="fw-bolder m-0">SEO & Analytics</h3>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-5">
                    <label className="form-label">SEO Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="seo.title"
                      value={formData.seo.title}
                      onChange={handleChange}
                      maxLength="60"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-5">
                    <label className="form-label">Google Analytics ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="analytics.googleAnalyticsId"
                      value={formData.analytics.googleAnalyticsId}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="form-label">SEO Description</label>
                <textarea
                  className="form-control"
                  name="seo.description"
                  value={formData.seo.description}
                  onChange={handleChange}
                  rows="3"
                  maxLength="160"
                />
              </div>

              <div className="mb-5">
                <label className="form-label">SEO Keywords (comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.seo.keywords.join(', ')}
                  onChange={(e) => handleArrayChange('seo.keywords', e.target.value)}
                  placeholder="web design, development, responsive"
                />
              </div>
            </div>
          </div>

          <div className="card mt-5">
            <div className="card-header">
              <div className="card-title">
                <h3 className="fw-bolder m-0">Social Media & Files</h3>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-5">
                    <label className="form-label">Facebook URL</label>
                    <input
                      type="url"
                      className="form-control"
                      name="socialMedia.facebook"
                      value={formData.socialMedia.facebook}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-5">
                    <label className="form-label">Twitter URL</label>
                    <input
                      type="url"
                      className="form-control"
                      name="socialMedia.twitter"
                      value={formData.socialMedia.twitter}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-5">
                    <label className="form-label">Instagram URL</label>
                    <input
                      type="url"
                      className="form-control"
                      name="socialMedia.instagram"
                      value={formData.socialMedia.instagram}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-5">
                    <label className="form-label">LinkedIn URL</label>
                    <input
                      type="url"
                      className="form-control"
                      name="socialMedia.linkedin"
                      value={formData.socialMedia.linkedin}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-5">
                    <label className="form-label">Website Logo</label>
                    <ImageUpload
                      onFileSelect={setLogoFile}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024} // 5MB
                    />
                    {formData.logo && (
                      <div className="mt-2">
                        <small className="text-muted">Current logo:</small>
                        <img src={formData.logo} alt="Current logo" className="img-thumbnail ms-2" style={{maxHeight: '50px'}} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-5">
                    <label className="form-label">Screenshots</label>
                    <ImageUpload
                      onFileSelect={setScreenshotFiles}
                      accept="image/*"
                      multiple={true}
                      maxSize={5 * 1024 * 1024} // 5MB
                    />
                    {formData.screenshots && formData.screenshots.length > 0 && (
                      <div className="mt-2">
                        <small className="text-muted">Current screenshots:</small>
                        <div className="d-flex flex-wrap gap-2 mt-1">
                          {formData.screenshots.map((screenshot, index) => (
                            <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} className="img-thumbnail" style={{maxHeight: '50px'}} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-light me-3"
                onClick={() => navigate("/websites")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoader}
              >
                {isLoader ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {isEdit ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    {isEdit ? "Update Website" : "Create Website"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpdate;

