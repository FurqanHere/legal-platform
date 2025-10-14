import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, matchRoutes, useNavigate, Navigate } from 'react-router-dom';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import routes from './routes'; // Import your routes config
import AuthService from '../services/AuthService'; // For auth checks
import { selectStoredPermissions } from '../stores/permissionsSlice'; 
import { toast } from 'react-toastify';

const Layout = () => {
    
    const location = useLocation();
    const navigate = useNavigate();

    // Get the current route's meta data
    const matchedRoutes = matchRoutes(routes, location);
    const currentRoute = matchedRoutes?.[0]?.route;
    const meta = currentRoute?.meta || {};

    // Extract meta fields
    const hideHeader = meta.hideHeader || false;
    const requiresAuth = meta.requiresAuth || false;
    const permission = meta.permission || null;

    // Check permissions (if needed)
    const hasPermission = permission 
        ? selectStoredPermissions().includes(permission) 
        : true;

    // Auth check (optional, if not handled in AppRouter)
    // COMMENTED OUT: Authentication check to allow direct access to dashboard
    // const isAuthenticated = AuthService.getCurrentUser();

    // if (requiresAuth && !isAuthenticated) {
    //     return <Navigate to="/login" />;
    // }

    // if (!hasPermission) {
    //     toast.error("You don't have permssion to access this!");
    //     navigate(-1); 
    // }

    return (
        <div className="d-flex flex-column flex-root app-root" id='kt_app_root'>
            <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
            {/* Conditionally render the header based on the hideHeader prop */}
            {!hideHeader && (
                 <div>
                    <Header />
                    <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
                        <Sidebar />
                         <Outlet />
                    </div>

                </div>
            )}
            {hideHeader && (
                <main>
                     <Outlet />
                </main>
            )}
           
            </div>
        </div>
    );
};

export default Layout;
