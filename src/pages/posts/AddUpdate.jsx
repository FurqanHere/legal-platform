import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";
import { Dropdown } from "primereact/dropdown";
import ImageDropzone from "../../components/ImageDropzone.jsx";

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageLoader, setPageLoader] = useState(false);
  const [files, setFiles] = useState([]);
  const [companiesOptions, setCompaniesOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const [existingImages, setExistingImages] = useState([]);

  const validateForm = () => {
    let newErrors = {};

    // Title
    if (!formData.title.trim()) {
      newErrors.title = "Post title is required";
    }

    // Description
    if (!formData.description.trim()) {
      newErrors.description = "Post description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company_id: "",
    images: [],
  });

  // Fetch Companies
  useEffect(() => {
    (async () => {
      try {
        setIsLoader(true);
        const res = await ApiService.request({
          method: "GET",
          url: "companies-list",
        });

        const companies = res.data.data;
        setCompaniesOptions(companies);
      } catch (err) {
        console.error("Error fetching companies:", err);
        toast.error("Failed to load companies");
      } finally {
        setIsLoader(false);
      }
    })();
  }, []);

  const getSingleData = async () => {
    try {
      setPageLoader(true);
      const response = await ApiService.request({
        method: "GET",
        url: `posts/${id}`,
      });

      const data = response.data;
      if (data.status) {
        const post = data.data;
        setFormData({
          ...post,
          company_id: post.company_id?._id || "",
        });
        setExistingImages(post.images || []);
      } else {
        toast.error(data.message);
      }
      setPageLoader(false);
    } catch (error) {
      setPageLoader(false);
      console.error("Error fetching post detail:", error);
    }
  };

  useEffect(() => {
    if (id) getSingleData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoader(true);

    try {
      const form = new FormData();

      if (id) {
        form.append("_id", id);
      }

      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("company_id", formData.company_id);

      if (files && files.length > 0) {
        files.forEach((file) => {
          form.append("images", file);
        });
      }

      const response = await ApiService.request({
        method: "POST",
        url: `posts/createOrUpdate${id ? `/${id}` : ""}`,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      if (data.status) {
        toast.success(data.message);
        navigate("/posts");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoader(false);
    }
  };

  const handleFileChange = (newFiles) => {
    setFiles(newFiles);
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
              {id ? "Edit" : "Add New"} Post
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
                <a href="/posts" className="text-muted text-hover-primary">
                  Posts
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
            <div className="card-body pt-0">
              {/* Info Form */}
              <form
                encType="multipart/form-data"
                method="POST"
                className="form fv-plugins-bootstrap5 fv-plugins-framework"
                onSubmit={handleSubmit}
              >
                <div className="row g-9 my-3">
                  {/* Post Title */}
                  <div className="col-md-6 fv-row">
                    <label className="required fs-6 fw-semibold mb-2">
                      Post Title
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-solid ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Post Title"
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value,
                        })
                      }
                    />
                    {errors.title && (
                      <div className="invalid-feedback">{errors.title}</div>
                    )}
                  </div>

                  {/* Company */}
                  <div className="col-md-6 fv-row">
                    <label className="required fs-6 fw-semibold mb-2">
                      Company
                    </label>
                    <Dropdown
                      value={formData.company_id}
                      options={companiesOptions}
                      optionLabel="company_name"
                      optionValue="_id"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          company_id: e.value,
                        })
                      }
                      placeholder="Select Company"
                      filter
                      className={`${errors.company_id ? "is-invalid" : ""}`}
                    />
                    {errors.company_id && (
                      <div className="invalid-feedback">
                        {errors.company_id}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="col-md-12 fv-row">
                    <label className="required fs-6 fw-semibold mb-2">
                      Description
                    </label>
                    <textarea
                      className={`form-control form-control-solid ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Post Description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows="5"
                    />
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>

                  {/* Images */}
                  <div className="col-md-12 fv-row">
                    <label className="fs-6 fw-semibold mb-2">Images</label>
                    <ImageDropzone
                      setFiles={handleFileChange}
                      multiple={true}
                      accept="image/*"
                    />
                    {existingImages.length > 0 && (
                      <div className="mt-2">
                        {existingImages.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt="preview"
                            width={100}
                            className="me-2"
                          />
                        ))}
                      </div>
                    )}

                    <small className="text-muted">
                      Select one or multiple images for your post
                    </small>
                  </div>
                </div>

                {/* Actions */}
                <div className="text-center mt-3">
                  <button
                    type="button"
                    className="btn btn-light me-3"
                    onClick={() => navigate("/posts")}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
