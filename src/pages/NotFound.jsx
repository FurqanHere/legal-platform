import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="not-found-container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 className='not-found-title text-black'>404 - Not Found</h1>
            <p className="not-found-description">The page you are looking for does not exist.</p>
            <button className='btn not-found-button bg-white text-black' onClick={handleGoBack}>
                Go Back
            </button>
        </div>
    );
};

export default NotFound;
