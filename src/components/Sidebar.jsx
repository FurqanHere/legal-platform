import React, { useEffect ,useState} from 'react';
import { useNavigate , NavLink  } from 'react-router-dom';
import AuthService from '../services/AuthService';
import logo from '../assets/images/logo.png'; 

const Sidebar = () => {

    const logout = () => {
        if (window.confirm('Are you sure? you want to logout.')) {
            AuthService.logout();
        }
    };
    const [openDropdown, setOpenDropdown] = useState(null); 

    const toggleDropdown = (dropdownId) => {
        setOpenDropdown(openDropdown === dropdownId ? null : dropdownId); // Toggle the dropdown
    };
    
    useEffect(() => {
        initializeSidebar();

        return () => cleanupSidebar();
    });


    const initializeSidebar = () => {

        const button = document.getElementById('kt_app_sidebar_mobile_toggle');
        if (button) {
            button.addEventListener('click', toggleSidebar);
        }

        const menuLinks = document.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', hideSidebar);
        });

    };

    const toggleSidebar = () => {
        const sidebar = document.getElementById('kt_app_sidebar');
        console.log(sidebar);
        sidebar.style.display = (sidebar.style.display === 'block') ? 'none' : 'block';
    };

    const hideSidebar = () => {
        const sidebar = document.getElementById('kt_app_sidebar');
        if (window.innerWidth <= 990) {
            sidebar.style.display = 'none';
        }
    };

    const cleanupSidebar = () => {
        const button = document.getElementById('kt_app_sidebar_mobile_toggle');
        if (button) {
            button.removeEventListener('click', toggleSidebar);
        }     

        const menuLinks = document.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            link.removeEventListener('click', hideSidebar);
        });
    };

    return (
        <div id="kt_app_sidebar" className="app-sidebar flex-column" data-kt-drawer="true" data-kt-drawer-name="app-sidebar" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="225px" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle">
            <div className="app-sidebar-logo px-6" style={{ backgroundColor: "#0D468C" }} id="kt_app_sidebar_logo">
                <NavLink  to="/dashboard">
                    <img alt="Logo" src={logo} className="text-center app-sidebar-logo-default" style={{ maxWidth: '270px', maxHeight: '50px' }} />
                    <img alt="Logo" src={logo} className="app-sidebar-logo-minimize" style={{ maxWidth: '100px', maxHeight: '30px' }} />
                </NavLink >
                {/* <div id="kt_app_sidebar_toggle" className="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate">
                    <span className="svg-icon svg-icon-2 rotate-180">
                        <i className="bi bi-list"></i>
                    </span>
                </div> */}
            </div>

            <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
                <div id="kt_app_sidebar_menu_wrapper" className="app-sidebar-wrapper hover-scroll-overlay-y my-5">
                    <div className="menu menu-column menu-rounded menu-sub-indention px-3" id="#kt_app_sidebar_menu" data-kt-menu="true" data-kt-menu-expand="false">
                        <div className="menu-item">
                            <NavLink  to="/dashboard" className="menu-link">
                                <span className="menu-icon">
                                    <span className="svg-icon svg-icon-2">
                                        <i className="bi bi-house-door-fill fs-5"></i>
                                    </span>
                                </span>
                                <span className="menu-title fs-6">Dashboard</span>
                            </NavLink >
                        </div>

                        <div className="menu-item pt-5">
                            <div className="menu-content">
                                <span className="menu-heading fw-bold text-uppercase fs-7">Navigation Links</span>
                            </div>
                        </div>

                        {/* <div  className="menu-item menu-accordion ">
                            <span className="menu-link" id="menuLink" onClick={() => toggleDropdown('realEstate')}>
                                <span className="menu-icon">
                                    <span className="svg-icon svg-icon-2">
                                        <i className="bi bi-card-checklist fs-5"></i>
                                    </span>
                                </span>
                                <span className="menu-title fs-6">Tests</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div  className={`menu-sub menu-sub-accordion ${openDropdown === 'realEstate' ? 'show' : ''}`}  >
                                <div className="menu-item">
                                    <NavLink  to="/tests" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6">All Tests</span>
                                    </NavLink >
                                </div>
                                <div className="menu-item">
                                    <NavLink  to="/sections" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6">Test Subsets</span>
                                    </NavLink >
                                </div>
                                <div className="menu-item">
                                    <NavLink  to="/agencies" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6">Attempts</span>
                                    </NavLink >
                                </div>
                                
                            </div>
                        </div> */}
                        
                        <div className="menu-item">
                            <NavLink  to="/companies" className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-building fs-5"></i>
                                </span>
                                <span className="menu-title fs-6">Employers Management</span>
                            </NavLink >
                        </div>



                        <div className="menu-item">
                            <NavLink  to="/jobs" className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-cast fs-5"></i>
                                </span>
                                <span className="menu-title fs-6">Jobs Management</span>
                            </NavLink >
                        </div>
                   

                        <div className="menu-item">
                            <NavLink  to="/users" className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-people-fill fs-5"></i>
                                </span>
                                <span className="menu-title fs-6">Employees Management</span>
                            </NavLink >
                        </div>


                        {/* <div className="menu-item">
                            <NavLink  to="/posts" className="menu-link">
                                <span className="menu-icon">
                                    <i class="bi bi-file-post fs-5"></i>
                                </span>
                                <span className="menu-title fs-6">Posts Management</span>
                            </NavLink >
                        </div> */}


                        {/* <div className="menu-item">
                            <NavLink  to="/transactions" className="menu-link">
                                <span className="menu-icon">
                                    <i className="bi bi-credit-card-fill fs-5"></i>
                                </span>
                                <span className="menu-title fs-6">Transactions Management</span>
                            </NavLink >
                        </div> */}

                      

                        <div  className="menu-item menu-accordion ">
                            <span className="menu-link" id="menuLink" onClick={() => toggleDropdown('dataManagement')}>
                                <span className="menu-icon">
                                    <span className="svg-icon svg-icon-2">
                                        <i className="bi bi-box-fill fs-5"></i>
                                    </span>
                                </span>
                                <span className="menu-title fs-6">Data Management</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div  className={`menu-sub menu-sub-accordion ${openDropdown === 'dataManagement' ? 'show' : ''}`}  >
                              
                                <div className="menu-item">
                                    <NavLink  to="/business_types" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6"> Business Types</span>
                                    </NavLink >
                                </div>
                                <div className="menu-item">
                                    <NavLink  to="/services" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6"> Services</span>
                                    </NavLink >
                                </div>
                                <div className="menu-item">
                                    <NavLink  to="/skills" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6"> Skils</span>
                                    </NavLink >
                                </div>
                                <div className="menu-item">
                                    <NavLink  to="/settings" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6"> App Settings</span>
                                    </NavLink >
                                </div>
                              
                            </div>
                        </div>

                    

                        <div  className="menu-item menu-accordion ">
                            <span className="menu-link" id="menuLink" onClick={() => toggleDropdown('accessControl')}>
                                <span className="menu-icon">
                                    <span className="svg-icon svg-icon-2">
                                        <i className="bi bi-gear-fill fs-5"></i>
                                    </span>
                                </span>
                                <span className="menu-title fs-6">Access Control</span>
                                <span className="menu-arrow"></span>
                            </span>
                            <div  className={`menu-sub menu-sub-accordion ${openDropdown === 'accessControl' ? 'show' : ''}`}  >
                                <div className="menu-item">
                                    <NavLink  to="/system-users" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6"> System Users</span>
                                    </NavLink >
                                </div>
                                <div className="menu-item">
                                    <NavLink  to="/roles" className="menu-link">
                                        <span className="menu-bullet">
                                            <span className="bullet bullet-dot"></span>
                                        </span>
                                        <span className="menu-title fs-6"> Roles</span>
                                    </NavLink >
                                </div>
                            </div>
                        </div>

                        <div className="menu-item">
                            <NavLink  to="/account" className="menu-link">
                                <span className="menu-icon">
                                    <span className="svg-icon svg-icon-2">
                                        <i className="bi bi-person-circle fs-5"></i>
                                    </span>
                                </span>
                                <span className="menu-title fs-6">Account </span>
                            </NavLink >
                        </div>

                        <div className="menu-item">
                            <span  className="menu-link" onClick={logout}>
                                <span className="menu-icon">
                                    <span className="svg-icon svg-icon-2 rotate-180">
                                        <i className="bi bi-box-arrow-left fs-5"></i>
                                    </span>
                                </span>
                                <span className="menu-title fs-6">Logout</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
