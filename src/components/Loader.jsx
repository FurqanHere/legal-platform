// components/Loader.js
import React from 'react';

const Loader = ({ text, size, color }) => {
    return (
        <div className={`text-center spinner-${size}  text-${color}`}>
             <span className="spinner-border spinner-border-sm "  role="status"></span>
             <span className="spin-text mx-2">{text}...</span>
        </div>
    );
};



export default Loader;
