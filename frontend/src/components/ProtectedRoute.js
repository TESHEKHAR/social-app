import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { decodeToken } from '../Utility/tokenUtils';

const ProtectedRoute = ({ children }) => {
    const urlParams = new URLSearchParams(window.location.search);
    const token2 = urlParams.get('token');

    useEffect(() => {
        if (token2) {
            localStorage.setItem('Token', token2);
            window.location.href = '/dashboard'; 
        }
    }, [token2]);

    const token = localStorage.getItem('Token');
    const User = decodeToken(token);

    if (!token || (User && User.role !== "user" && User.role !== "admin")) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;
