import React from 'react';
import './Watermark.css';

const Watermark = ({ children, text }) => {
    return (
        <div className="watermark-container">
            {children}
            <div className="watermark">{text || 'Default Watermark'}</div>
        </div>
    );
};

export default Watermark;
