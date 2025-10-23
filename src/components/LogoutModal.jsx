import React from 'react';
import AuthService from '../services/AuthService';

const LogoutModal = ({ show, onClose, onConfirm }) => {
  const handleLogout = () => {
    AuthService.logout();
    onConfirm();
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="offcanvas-backdrop fade show"
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1040,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          transition: "all 0.3s ease-out",
        }}
      ></div>

      {/* Modal */}
      <div
        className="modal fade show"
        tabIndex="-1"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1045,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{
            maxWidth: "400px",
            width: "90%",
            margin: "0 auto",
          }}
        >
          <div
            className="modal-content"
            style={{
              borderRadius: "15px",
              border: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              backgroundColor: "#fff",
            }}
          >
            {/* Modal Header */}
            <div
              className="modal-header border-0"
              style={{
                padding: "25px 25px 0 25px",
                backgroundColor: "#fff",
                borderRadius: "15px 15px 0 0",
              }}
            >
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#f8f9fa",
                    border: "2px solid #e9ecef",
                  }}
                >
                  <i className="bi bi-box-arrow-right text-muted" style={{ fontSize: "20px" }}></i>
                </div>
                <div>
                  <h5 className="mb-0 fw-bold text-dark">Logout</h5>
                  <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                    Confirm your action
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div
              className="modal-body"
              style={{
                padding: "20px 25px 25px 25px",
                backgroundColor: "#fff",
              }}
            >
              <p className="text-muted mb-4" style={{ fontSize: "16px", lineHeight: "1.5" }}>
                Are you sure you want to logout? You will need to sign in again to access your account.
              </p>

              {/* Action Buttons */}
              <div className="d-flex gap-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary flex-fill"
                  onClick={onClose}
                  style={{
                    height: "45px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: "500",
                    border: "2px solid #e9ecef",
                    color: "#6c757d",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#f8f9fa";
                    e.target.style.borderColor = "#dee2e6";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.borderColor = "#e9ecef";
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger flex-fill"
                  onClick={handleLogout}
                  style={{
                    height: "45px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: "500",
                    backgroundColor: "#dc3545",
                    border: "2px solid #dc3545",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#c82333";
                    e.target.style.borderColor = "#c82333";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#dc3545";
                    e.target.style.borderColor = "#dc3545";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
