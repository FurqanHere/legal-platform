import React, { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setPermissions, clearPermissions } from "../stores/permissionsSlice";
import logoImg from "../assets/images/login-img.png";
import logoImg2 from "../assets/images/logoImg2.png";
import logo from "../assets/images/logo.png";
import G from "../assets/images/G.png";
import notificationProfile from "../assets/images/notification-profile.png";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Slider data
  const sliderData = [
    {
      id: 1,
      title: "Perspiciatis unde omnis iste",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      image: logoImg
    },
    {
      id: 2,
      title: "Legal Solutions Made Simple",
      description: "Connect with experienced lawyers and get expert legal advice for all your business needs",
      image: logoImg2
    },
    {
      id: 3,
      title: "Expert Legal Guidance",
      description: "Access a network of qualified attorneys ready to help you navigate complex legal challenges",
      image: logoImg
    },
    {
      id: 4,
      title: "Secure & Confidential",
      description: "Your legal matters are handled with the highest level of security and confidentiality",
      image: logoImg2
    }
  ];

  useEffect(() => {
    // COMMENTED OUT: Authentication check to allow direct access
    // const isAuthenticated = AuthService.getCurrentUser();
    // if (isAuthenticated) {
    //   navigate("/dashboard");
    // }
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === sliderData.length - 1 ? 0 : prevSlide + 1
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [sliderData.length]);

  // Handle dot click
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

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
      {/* Left Panel - Slider Section */}
      <div className="left-panel">
        {/* Slider Container */}
        <div className="slider-container">
          {/* Background Image */}
          <div 
            key={currentSlide}
            className="left-panel-bg"
            style={{ backgroundImage: `url(${sliderData[currentSlide].image})` }}
          />
          
          {/* Content Overlay */}
          <div className="left-panel-content">
            <h1 className="left-panel-title text-white">
              {sliderData[currentSlide].title}
            </h1>
            <p className="left-panel-description text-white">
              {sliderData[currentSlide].description}
            </p>
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="pagination-dots">
          {sliderData.map((_, index) => (
            <div
              key={index}
              className={`pagination-dot ${
                index === currentSlide ? 'active' : 'inactive'
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
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
