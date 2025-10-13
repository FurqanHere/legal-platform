import React, { useState ,useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthService from '../services/AuthService';
import logo from '../assets/images/logo.png'; 
import ApiService from "../services/ApiService";
import { toast } from 'react-toastify';
import moment from 'moment';


const Header = () => {

    const [user] = useState(JSON.parse(localStorage.getItem('admin')));
    const [notifications, setNotifications] = useState([]);


    const logout = () => {
        if (window.confirm('Are you sure? you want to logout.')) {
            AuthService.logout();
        }
    };
    useEffect(() => {
        // getNotifications();
    }, []); 

    const getNotifications = async () => {
        try {
            const response = await ApiService.request({
                method: "GET",
                url: "getNotifications", // Replace with your API endpoint
            });
            const data = response.data;
            if (data.status) {
                setNotifications(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
       
    };
    const clearAllNotifications = async () => {
        try {
            const response = await ApiService.request({
                method: "POST",
                url: "clearAllNotifications", // Replace with your API endpoint
            });
            const data = response.data;
            if (data.status) {
                setNotifications([]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
       
    };

    return (
        <div id="kt_app_header" className="app-header" style={{ backgroundColor: '#0D468C' }}>
            <div className="app-container container-fluid d-flex align-items-stretch justify-content-between" id="kt_app_header_container">
                <div className="d-flex align-items-center d-lg-none ms-n2 me-2" title="Show sidebar menu">
                    <div className="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_sidebar_mobile_toggle">
                        {/* SVG Icon here */}
                        <i className="bi bi-list text-light fs-3"></i>

                    </div>
                </div>
                <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                    <Link to="/dashboard" className="d-lg-none rounded">
                        <img alt="Logo" src={logo} className="h-50px" style={{ maxHeight: '30px' }} />
                    </Link>
                </div>
                {/* <div className="search">
                    <i className="bi bi-search" style={{position:'absolute',top:'24px', marginLeft:'10px'}}></i>
                    <input type="search" name="search" placeholder="Search..." className="form-control h-50 ps-10 mt-4"></input>
                </div> */}

                <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1" id="kt_app_header_wrapper">
                    <div className="app-header-menu app-header-mobile-drawer align-items-stretch">
                        <div className="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0" id="kt_app_header_menu" data-kt-menu="true">
                            {/* Add Menu Items */}
                        </div>
                    </div>
                    <div className="app-navbar flex-shrink-0">
                    <div className="app-navbar-item ms-1 ms-lg-3">
                        </div>

                        <div className="app-navbar-item ms-1 ms-lg-3">
                            <div className="btn btn-icon btn-custom btn-active-primary btn-active-color-primary w-35px h-35px w-md-40px h-md-40px position-relative notification-dropdown">
                                <i className='bi bi-bell-fill text-gray-200 fs-2'></i>
                                <span className="bullet bullet-dot h-20px w-20px position-absolute translate-middle top-5 start-75 bg-danger text-white"> 
                                   <small>{notifications.length}</small> </span>
                            </div>
                            <div className="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px notification-submenu" style={{ zIndex: 107, position: 'fixed', inset: '0 auto auto auto', margin: 0, top:'55px', right:'10px' }}>
                                <div className="d-flex flex-column mt-5 px-2">
                                    <h4 className="text-dark fw-bold">Notifications</h4>
                                    <hr className="p-0 m-0" />
                                    <div className="table" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        <table className="table fs-6">
                                            <tbody>
                                            { notifications.map((not, index) => (
                                            <tr  className='border border-bottom bg-light' key={index}>
                                                <td > 
                                                     <span  className="text-dark fs-5" >{not.title}</span> <br />
                                                     <span  className="text-dark" >{not.message}</span> 
                                                </td>
                                                <td width={'40px'} className='p-0'> 
                                                    <small >{moment(not.createdAt).fromNow()}</small>
                                                </td>
                                            </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="text-center mt-5 mb-5" style={{ display: notifications.length > 0 ? 'block' : 'none' }}>
                                        <button className="btn btn-sm btn-base px-6" onClick={clearAllNotifications}>{('clear_all')}</button>
                                    </div>
                                    <div className="text-center mt-5 mb-5" style={{ display: notifications.length === 0 ? 'block' : 'none' }}>
                                        <h6 className="px-6"> No data found!</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="app-navbar-item ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
                            <div className="cursor-pointer symbol symbol-35px symbol-md-40px profile-dropdown">
                            <img src={user?.picture} alt="user" />
                            </div>
                            <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px profile-submenu"
                             style={{ zIndex: 107, position: 'fixed', inset: '0 auto auto auto', margin: 0,top:'55px', right:'10px' }}>
                                <div className="menu-item px-3">
                                    <div className="menu-content d-flex align-items-center px-3">
                                        <div className="symbol symbol-50px me-5">
                                            <img alt="Logo" src={user?.picture} />
                                        </div>
                                        <div className="d-flex flex-column">
                                            <div className="fw-bold d-flex align-items-center fs-5"> {user.name} </div>
                                            <Link to="#" className="fw-semibold text-muted text-hover-primary fs-7"> {user.email} </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="separator my-2"></div>
                                <div className="menu-item px-5 my-1">
                                    <Link to="/account" className="menu-link px-5"> {('Account Settings')}</Link>
                                </div>
                                <div className="menu-item px-5">
                                    <button  onClick={logout} className="menu-link px-5 btn btn-transparent">{('Logout')}</button>
                                </div>
                            </div>
                        </div>
                        <div className="app-navbar-item d-none ms-2 me-n3" title="Show header menu">
                            <div className="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_header_menu_toggle">
                                {/* SVG Icon */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
