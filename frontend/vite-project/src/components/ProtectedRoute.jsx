import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {

    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    // Check whether logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Check whether role is authorized
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;