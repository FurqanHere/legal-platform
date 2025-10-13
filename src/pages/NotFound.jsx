import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <button className='btn btn-primary' onClick={handleGoBack}>
                Go Back
            </button>
        </div>
    );
};

export default NotFound;
