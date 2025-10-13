import React, { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setPermissions, clearPermissions } from "../stores/permissionsSlice";
import logo from "../assets/images/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = AuthService.getCurrentUser();
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoader(true);

    try {
      const data = await AuthService.login(email, password);
      if (data.status) {
        toast.success(data.message);
        let user = data.data.user;
        user.auth_token = data.data.auth_token;

        localStorage.setItem("admin", JSON.stringify(user));
        
        // Handle permissions if they exist in the response
        if (data.data.permissions) {
          localStorage.setItem(
            "permissions",
            JSON.stringify(data.data.permissions)
          );
          setPermissions(data.data.permissions);
        }

        navigate("/dashboard");
        // window.location.href=process.env.REACT_APP_BASE_PATH+'/dashboard';
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <div className="page-body-wrapper full-page-wrapper bg-light">
      <div className="row w-100 m-0 full-page-wrapper">
        <div className="content-wrapper full-page-wrapper d-flex align-items-center auth">
          <div className="col-lg-4 mx-auto">
            <div className="text-center bg-base">
              <img alt="Logo" src={logo} className="w-100px p-4" />
            </div>
            <div className="card">
              <div className="card-body px-5 py-5">
                <div className="text-center my-3">
                  <h3 className="card-title mb-0 fs-2">Admin Login</h3>
                  <p>Welcome back! login to your account</p>
                </div>
                <br />

                <form onSubmit={handleLogin}>
                  <div className="form-group my-5">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control p_input"
                      placeholder="Email Address"
                    />
                  </div>

                  <div className="form-group my-5">
                    <label>Password *</label>
                    <div className="input-group" id="show_hide_password">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control p_input"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        autoComplete="off"
                      />
                      <div className="input-group-addon bg-light border px-3 py-3">
                        <button
                          type="button"
                          className="btn btn-transparent p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i
                            className={`text-dark fs-5  ${
                              showPassword ? "bi bi-eye" : "bi bi-eye-slash"
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-group d-flex align-items-center justify-content-between">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          style={{ opacity: 1 }}
                        />
                        Remember Me
                      </label>
                    </div>
                  </div>

                  <div className="text-center my-5">
                    <button
                      type="submit"
                      disabled={isLoader}
                      className="btn btn-base w-100 btn-block"
                    >
                      <span hidden={isLoader}>Sign In</span>
                      {isLoader && (
                        <Loader size="20" text="Signing" color="white" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
