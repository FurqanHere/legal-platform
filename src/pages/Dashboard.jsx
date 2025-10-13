import React, { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import ApiService from "../services/ApiService";
import AreaChart from "../components/AreaChart";
import PieChart from "../components/PieChart";
import ProgressBarStats from "../components/ProgressBarStats";
import BarChart from "../components/BarChart";

const Dashboard = () => {
  const navigate = useNavigate();

  const [isLoader, setIsLoader] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    overview: {},
    statistics: {},
    charts: {},
    recent_activity: {},
    user_info: {}
  });
  const [current_month, setCurrentMonth] = useState("");

  const labels = [
    "Job Post",
    "Software Development",
    "Healthcare",
    "Accounting & Finance",
    "Marketing & Sales",
  ];
  const dataset = [21, 10, 7, 15, 3];

  useEffect(() => {
    const isAuthenticated = AuthService.getCurrentUser();
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to dashboard if authenticated
    }
    getDashboard();

    const now = new Date();
    const options = { month: "short", year: "numeric" }; // e.g., Dec, 2024
    const formattedDate = now.toLocaleDateString("en-US", options);
    setCurrentMonth(formattedDate);
  }, [navigate]);

  const getDashboard = async () => {
    try {
      setIsLoader(true);
      const response = await ApiService.request({
        method: "GET",
        url: "dashboard",
      });
      const data = response.data;
      if (data.status) {
        setDashboardData(data.data);
        // Store map_key if it exists in the response
        if (data.data.map_key) {
          localStorage.setItem("map_key", data.data.map_key);
        }
      } else {
        toast.error(data.message);
      }
      setIsLoader(false);
    } catch (error) {
      console.error("Dashboard API Error:", error);
      setIsLoader(false);
      toast.error("Failed to load dashboard data");
    }
  };

  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
        <div
          id="kt_app_toolbar_container"
          className="app-container container-fluid d-flex flex-stack"
        >
          <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
              Dashboard
            </h1>
            <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
              <li className="breadcrumb-item text-muted">
                <a href="/admin/" className="text-muted text-hover-primary">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <span className="bullet bg-gray-400 w-5px h-2px"></span>
              </li>
              <li className="breadcrumb-item text-muted"> Dashboard </li>
            </ul>
          </div>
          <div className="d-flex align-items-center gap-2 gap-lg-3"></div>
        </div>
      </div>

      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="app-container container-fluid"
        >
          <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
            <div className="col-xl-3 col-md-6 mb-4">
              <NavLink
                to="/companies"
                className="card border  shadow h-100 py-2"
              >
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="fs-6 fw-bold text-gray-900 text-uppercase mb-2">
                        Total Employers
                      </div>
                      <div className="h1 mb-0 font-weight-bold text-gray-900">
                        {dashboardData.overview?.total_companies || 0}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-building fs-3x text-gray-600"></i>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <NavLink to="/jobs" className="card border  shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="fs-6 fw-bold text-gray-900 text-uppercase mb-2">
                        Total Jobs
                      </div>
                      <div className="h1 mb-0 font-weight-bold text-gray-900">
                        {dashboardData.overview?.total_jobs || 0}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-cast fs-3x text-gray-600"></i>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <NavLink to="/users" className="card border  shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="fs-6 fw-bold text-gray-900 text-uppercase mb-2">
                        Total Employees
                      </div>
                      <div className="h1 mb-0 font-weight-bold text-gray-900">
                        {dashboardData.overview?.total_employees || 0}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-people-fill fs-3x text-gray-600"></i>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>

            {/* <div className="col-xl-3 col-md-6 mb-4">
              <NavLink
                to="/transactions"
                className="card border  shadow h-100 py-2"
              >
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="fs-6 fw-bold text-gray-900 text-uppercase mb-2">
                        Total Transactions
                      </div>
                      <div className="h1 mb-0 fw-bold text-gray-900">
                        {stats?.total_transactions}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-bar-chart-fill fs-3x text-gray-600"></i>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div> */}

            <div className="col-xl-3 col-md-6 mb-4">
              <NavLink to="/jobs" className="card border  shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="fs-6 fw-bold text-gray-900 text-uppercase mb-2">
                        Active Jobs
                      </div>
                      <div className="h1 mb-0 fw-bold text-gray-900">
                        {dashboardData.overview?.active_jobs || 0}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-cast fs-3x text-gray-600"></i>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <NavLink to="/jobs" className="card border  shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="fs-6 fw-bold text-gray-900 text-uppercase mb-2">
                        Expired Jobs
                      </div>
                      <div className="h1 mb-0 fw-bold text-gray-900">
                        {dashboardData.overview?.expired_jobs || 0}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-projector fs-3x text-gray-600"></i>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <NavLink to="/users" className="card border  shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="fs-6 fw-bold text-gray-900 text-uppercase mb-2">
                        
                        Shortlisted Candidates
                      </div>
                      <div className="h1 mb-0 font-weight-bold text-gray-900">
                        {dashboardData.overview?.shortlisted_candidates || 0}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="bi bi-projector-fill fs-3x text-gray-600"></i>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>

          <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
            <div className="col-md-6">
              <div className="card card-flush overflow-hidden">
                <div className="card-header pt-5">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold text-dark">
                      Employers Stats
                    </span>
                    <span className="text-gray-400 mt-1 fw-semibold fs-6">
                      Employers registered per month
                    </span>
                  </h3>
                  <div className="card-toolbar"></div>
                </div>
                <div className="card-body d-flex align-items-end">
                  <div
                    className="p-chart h-300px w-100"
                    style={{ position: "relative" }}
                  >
                    <BarChart
                      labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
                      label="Employers"
                      dataset={[0, 0, 0, 0, 0, 0]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-flush overflow-hidden">
                <div className="card-header pt-5">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold text-dark">
                      Role Distribution
                    </span>
                    <span className="text-gray-400 mt-1 fw-semibold fs-6">
                      System User Roles
                    </span>
                  </h3>
                  <div className="card-toolbar"></div>
                </div>
                <div className="card-body d-flex align-items-end">
                  <div
                    className="p-chart h-300px w-100 d-flex justify-content-center align-items-center"
                    style={{ position: "relative" }}
                  >
                    <PieChart
                      labels={dashboardData.charts?.role_distribution?.map(role => role.role_name) || []}
                      dataset={dashboardData.charts?.role_distribution?.map(role => role.count) || []}
                      label="Roles"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card card-flush overflow-hidden">
                <div className="card-header pt-5">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold text-dark">
                      {current_month} Jobs
                    </span>
                    <span className="text-gray-400 mt-1 fw-semibold fs-6">
                      This Month Jobs
                    </span>
                  </h3>
                  <div className="card-toolbar"></div>
                </div>
                <div className="card-body d-flex align-items-end">
                  <div
                    className="p-chart h-300px w-100 d-flex justify-content-center align-items-center"
                    style={{ position: "relative" }}
                  >
                    <AreaChart
                      labels={["Week 1", "Week 2", "Week 3", "Week 4"]}
                      label="Jobs"
                      dataset={[0, 0, 0, 0]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-flush overflow-hidden">
                <div className="card-header pt-5">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold text-dark">
                      Employee Stats
                    </span>
                    <span className="text-gray-400 mt-1 fw-semibold fs-6">
                      Employee registered per month
                    </span>
                  </h3>
                  <div className="card-toolbar"></div>
                </div>
                <div className="card-body d-flex align-items-end">
                  <div
                    className="p-chart h-300px w-100"
                    style={{ position: "relative" }}
                  >
                    <BarChart
                      labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
                      label="Employees"
                      dataset={[0, 0, 0, 0, 0, 0]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-flush overflow-hidden">
                <div className="card-header pt-5">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold text-dark">
                      Monthly Jobs
                    </span>
                    <span className="text-gray-400 mt-1 fw-semibold fs-6">
                      Jobs per month
                    </span>
                  </h3>
                  <div className="card-toolbar"></div>
                </div>
                <div className="card-body d-flex align-items-end">
                  <div
                    className="p-chart h-300px w-100"
                    style={{ position: "relative" }}
                  >
                    <BarChart
                      labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
                      label="Jobs"
                      dataset={[0, 0, 0, 0, 0, 0]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity and User Info Section */}
          <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
            <div className="col-md-6">
              <div className="card card-flush overflow-hidden">
                <div className="card-header pt-5">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold text-dark">
                      Recent System Users
                    </span>
                    <span className="text-gray-400 mt-1 fw-semibold fs-6">
                      Latest registered system users
                    </span>
                  </h3>
                </div>
                <div className="card-body">
                  {dashboardData.recent_activity?.recent_system_users?.map((user, index) => (
                    <div key={index} className="d-flex align-items-center mb-4">
                      <div className="symbol symbol-40px me-4">
                        <div className="symbol-label bg-light-primary">
                          <i className="bi bi-person-fill text-primary fs-2"></i>
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <div className="fw-bold text-gray-900">{user.name}</div>
                        <div className="text-muted fs-7">{user.email}</div>
                        <div className="badge badge-light-success">{user.role_id.name}</div>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center text-muted py-5">
                      No recent system users found
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card card-flush overflow-hidden">
                <div className="card-header pt-5">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold text-dark">
                      System Activity
                    </span>
                    <span className="text-gray-400 mt-1 fw-semibold fs-6">
                      Recent user activity
                    </span>
                  </h3>
                </div>
                <div className="card-body">
                  {dashboardData.recent_activity?.system_activity?.map((activity, index) => (
                    <div key={index} className="d-flex align-items-center mb-4">
                      <div className="symbol symbol-40px me-4">
                        <div className="symbol-label bg-light-info">
                          <i className="bi bi-clock-fill text-info fs-2"></i>
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <div className="fw-bold text-gray-900">{activity.user.name}</div>
                        <div className="text-muted fs-7">
                          Last activity: {new Date(activity.last_activity).toLocaleString()}
                        </div>
                        <div className="text-muted fs-8">
                          Login count: {activity.login_count}
                        </div>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center text-muted py-5">
                      No recent activity found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* User Info Section */}
          <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
            <div className="col-md-12">
              <div className="card card-flush overflow-hidden">
                <div className="card-header pt-5">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold text-dark">
                      Current User Information
                    </span>
                    <span className="text-gray-400 mt-1 fw-semibold fs-6">
                      Your account details
                    </span>
                  </h3>
                </div>
                <div className="card-body">
                  {dashboardData.user_info?.current_user ? (
                    <div className="row">
                      <div className="col-md-3">
                        <div className="d-flex flex-column">
                          <span className="text-muted fs-7 mb-1">Name</span>
                          <span className="fw-bold text-gray-900 fs-6">
                            {dashboardData.user_info.current_user.name}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="d-flex flex-column">
                          <span className="text-muted fs-7 mb-1">Email</span>
                          <span className="fw-bold text-gray-900 fs-6">
                            {dashboardData.user_info.current_user.email}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="d-flex flex-column">
                          <span className="text-muted fs-7 mb-1">Role</span>
                          <span className="badge badge-light-primary fs-6">
                            {dashboardData.user_info.current_user.role}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="d-flex flex-column">
                          <span className="text-muted fs-7 mb-1">Last Login</span>
                          <span className="fw-bold text-gray-900 fs-6">
                            {new Date(dashboardData.user_info.current_user.last_login).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted py-5">
                      No user information available
                    </div>
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

export default Dashboard;
