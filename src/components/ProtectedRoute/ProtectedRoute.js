import React from 'react';
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {

    const location = useLocation();
    const protectedRoutes = ["/movies", "/saved-movies", "/profile"];

    // Если пользователь неавторизован и пытается получить доступ к защищенному маршруту, перенаправляем его на главную страницу
    if (!loggedIn && protectedRoutes.includes(location.pathname)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
