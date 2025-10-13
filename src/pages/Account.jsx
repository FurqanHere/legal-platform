import React, { useState, useEffect } from 'react';
import {  useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import ApiService from "../services/ApiService";
import Loader from "../components/Loader"; 

const Account = () => {
  const navigate = useNavigate();
  const admin= JSON.parse(localStorage.getItem('admin'));

  const [tab, setTab] = useState("email");
  const [email, setEmail] = useState(admin.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false);


const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoader(true);
    try {
        const formData = {
            "email": email,
            "old_password": oldPassword,
            "new_password": newPassword,
            "confirm_password": confirmPassword,
          };
        console.log(formData);

        const response = await ApiService.request({
            method: "POST",
            url: "updateAccount", 
            data:formData
        });
        const data = response.data;
        if (data.status) {
            admin.email=email;
            console.log(admin);
            localStorage.setItem('admin', JSON.stringify(admin));
            toast.success(data.message);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            toast.error(data.message);
        }
        setIsLoader(false);
    } catch (error) {
        console.log(error);

        setIsLoader(false);
    }
   
};

  return (
    <div className="d-flex flex-column flex-column-fluid">
        <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
            <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex flex-stack">
                <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                        Account
                    </h1>
                    <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                        <li className="breadcrumb-item text-muted">
                            <a href="/TimeLogger/admin/" className="text-muted text-hover-primary">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <span className="bullet bg-gray-400 w-5px h-2px"></span>
                        </li>
                        <li className="breadcrumb-item text-muted">Account</li>
                    </ul>
                </div>
                <div className="d-flex align-items-center gap-2 gap-lg-3"></div>
            </div>
        </div>

        <div id="kt_app_content" className="app-content flex-column-fluid">
            <div id="kt_app_content_container" className="app-container container-fluid">
                <div className="card">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button
                            className={`nav-link fs-lg-5 ${tab === "email" ? "active" : ""}`}
                            onClick={() => setTab("email")}
                            id="nav-profile-tab"
                            type="button"
                        >
                            <i className="bi bi-envelope"></i> Change Email
                        </button>
                        <button
                            className={`nav-link fs-lg-5 ${tab === "password" ? "active" : ""}`}
                            onClick={() => setTab("password")}
                            id="nav-contact-tab"
                            type="button"
                        >
                            <i className="bi bi-key"></i> Change Password
                        </button>
                        </div>
                    </nav>
                    <div className="card-body pt-0">
                        <div className="mb-8 text-center"></div>
                        <div className="row g-9 mb-8">
                        <div className="col-md-12">
                            <div className="tab-content mt-5" id="nav-tabContent">
                            {tab === "email" && (
                                <div className="tab-pane fade show active">
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="d-flex flex-column">
                                    <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                        <span className="required">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control form-control-solid"
                                        placeholder="Enter Email"
                                    />
                                    </div>
                                    <button
                                    type="submit"
                                    className="btn btn-base my-5"
                                    disabled={isLoader}
                                    >
                                    <span className="indicator-label">
                                        {!isLoader ? "Update Email" : <Loader size="20" text="Updating" />}
                                    </span>
                                    </button>
                                </form>
                                </div>
                            )}
                            {tab === "password" && (
                                <div className="tab-pane fade show active">
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="row">
                                    <div className="col-md-12">
                                        <label className="required fs-6 fw-semibold mb-2">
                                        Current Password
                                        </label>
                                        <input
                                        type="password"
                                        required
                                        className="form-control form-control-solid"
                                        placeholder="Enter Your Old Password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                        <br />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="required fs-6 fw-semibold mb-2">
                                        New Password
                                        </label>
                                        <input
                                        type="password"
                                        required
                                        className="form-control form-control-solid"
                                        placeholder="Enter New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="required fs-6 fw-semibold mb-2">
                                        Confirm Password
                                        </label>
                                        <input
                                        type="password"
                                        required
                                        className="form-control form-control-solid"
                                        placeholder="Enter Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    </div>
                                    <button
                                    type="submit"
                                    className="btn btn-base my-5"
                                    disabled={isLoader}
                                    >
                                    <span className="indicator-label">
                                        {!isLoader ? "Update Password" : <Loader size="20" text="Updating" />}
                                    </span>
                                    </button>
                                </form>
                                </div>
                            )}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default Account;
