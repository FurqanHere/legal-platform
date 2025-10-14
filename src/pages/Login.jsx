import React, { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setPermissions, clearPermissions } from "../stores/permissionsSlice";
import logoImg from "../assets/images/login-img.png";
import logo from "../assets/images/logo.png";
import G from "../assets/images/G.png";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // COMMENTED OUT: Authentication check to allow direct access
    // const isAuthenticated = AuthService.getCurrentUser();
    // if (isAuthenticated) {
    //   navigate("/dashboard");
    // }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoader(true);

    // COMMENTED OUT: Authentication logic to allow direct access to dashboard
    // try {
    //   const data = await AuthService.login(email, password);
    //   if (data.status) {
    //     toast.success(data.message);
    //     let user = data.data.user;
    //     user.auth_token = data.data.auth_token;

    //     localStorage.setItem("admin", JSON.stringify(user));
        
    //     // Handle permissions if they exist in the response
    //     if (data.data.permissions) {
    //       localStorage.setItem(
    //         "permissions",
    //         JSON.stringify(data.data.permissions)
    //       );
    //       setPermissions(data.data.permissions);
    //     }

    //     navigate("/dashboard");
    //     // window.location.href=process.env.REACT_APP_BASE_PATH+'/dashboard';
    //   } else {
    //     toast.error(data.message);
    //   }
    // } catch (error) {
    //   console.error("Login failed:", error);
    //   toast.error("Login failed. Please check your credentials.");
    // } finally {
    //   setIsLoader(false);
    // }

    // DIRECT NAVIGATION TO DASHBOARD - NO AUTHENTICATION REQUIRED
    setTimeout(() => {
      toast.success("Login successful!");
      navigate("/dashboard");
      setIsLoader(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      {/* Left Panel - Illustration Section */}
      <div className="left-panel">
        {/* Background Image */}
        <div 
          className="left-panel-bg"
          style={{ backgroundImage: `url(${logoImg})` }}
        />
        
        {/* Content Overlay */}
        <div className="left-panel-content">
          <h1 className="left-panel-title text-white">
            Perspiciatis unde omnis iste
          </h1>
          <p className="left-panel-description text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </p>
        </div>
        
        {/* Pagination Dots */}
        <div className="pagination-dots">
          <div className="pagination-dot"></div>
          <div className="pagination-dot-inactive"></div>
          <div className="pagination-dot-inactive"></div>
          <div className="pagination-dot-inactive"></div>
        </div>
      </div>

      {/* Right Panel - Login Form Section */}
      <div className="right-panel">
        {/* Logo */}
        <div>
          <img 
            alt="Legal Platform Logo" 
            src={logo} 
            className="login-logo"
          />
        </div>

        {/* Login Form */}
        <div>
          <h2 className="login-title">
            Login
          </h2>
          
          <form onSubmit={handleLogin} className="login-form">
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="noon@company.com"
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">
                Password
              </label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Password"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoader}
              className="login-button"
            >
              {isLoader ? (
                <Loader size="20" text="Signing" color="white" />
              ) : (
                <>
                  Login
                  <span className="login-button-arrow">→</span>
                </>
              )}
            </button>

            {/* Google Login Button */}
            <button
              type="button"
              className="google-button"
            >
              <span className="google-icon">
                <img src={ G } alt="" className="w-35px h-35px" />
              </span>
              Continue With Google
            </button>
          </form>
        </div>

        {/* Copyright */}
        <div className="copyright">
          © 2025 Legal Platform. All rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
