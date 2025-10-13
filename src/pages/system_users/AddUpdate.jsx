import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";

const AddUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    picture: "",
    role_id: "",
  });

  useEffect(() => {
    getRolesList();

    if (id) {
      getSingleData();
    }
  }, [id]);

  const getSingleData = async () => {
    setIsLoader(true);
    try {
      const response = await ApiService.request({
        method: "GET",
        url: `system-users/${id}`, // Replace with your API endpoint
      });
      const data = response.data;
      if (data.status) {
        setFormData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoader(false);
    }
  };

  const getRolesList = async () => {
    setIsLoader(true);
    try {
      const response = await ApiService.request({
        method: "GET",
        url: `roles-list`,
      });
      const data = response.data;
      if (data.status) {
        setRoles(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoader(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await ApiService.request({
        method: "POST",
        url: `system-users/createOrUpdate/${id || ""}`, // Replace with your API endpoint
        data,
      });

      if (response.data.status) {
        toast.success(response.data.message);
        navigate("/system-users/");
      } else {
        toast.error(response.data.message);
      }
      setIsLoader(false);
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setIsLoader(false);
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
            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
              {id ? "Edit System User" : "Add System User"}
            </h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
              <li className="breadcrumb-item text-muted">
                <Link to="/dashboard" className="text-muted text-hover-primary">
                  {"Dashboard"}{" "}
                </Link>
              </li>
              <li className="breadcrumb-item">
                <span className="bullet bg-gray-400 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-muted">
                <Link to="/auctions" className="text-muted text-hover-primary">
                  {"System Users"}{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="app-container container-xxl"
        >
          <div className="card">
            <div className="card-body pt-0">
              <form
                onSubmit={handleSubmit}
                className="form fv-plugins-bootstrap5 fv-plugins-framework"
              >
                <div className="row g-9 my-3">
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="required fs-6 fw-semibold mb-2">
                      {" "}
                      {"Name"}
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-solid"
                      placeholder={"Name"}
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="required fs-6 fw-semibold mb-2">
                      {" "}
                      {"Email"}
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-solid"
                      placeholder={"Email"}
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className=" fs-6 fw-semibold mb-2">
                      {" "}
                      {"Password"}
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-solid"
                      placeholder={"Password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label className="required fs-6 fw-semibold mb-2">
                      {" "}
                      {"Role"}
                    </label>
                    <select
                      value={formData.role_id}
                      name="role_id"
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Role</option>
                      {roles.map((role, index) => (
                        <option value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <br />

                <div className="row g-9 my-3">
                  <div className="text-center">
                    <Link to="/system-users" className="btn btn-light me-3">
                      Back
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-base"
                      disabled={isLoader}
                    >
                      <span className="indicator-label">
                        {isLoader ? (
                          <Loader size="20" color="white" text="Submitting" />
                        ) : (
                          "Submit"
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUpdate;
