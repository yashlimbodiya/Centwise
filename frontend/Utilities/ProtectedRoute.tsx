import { Outlet, Navigate } from "react-router-dom";
import React,{ ReactNode, useEffect, useState } from 'react';
import axios from 'axios';

interface ProtectedRouteProps {
    children: ReactNode;
  }

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => { 

    const [isAuthenticated, setIsAuthenticated] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/user/checkAuth');
                console.log(response.data.isAuthenticated);
                console.log(response.data);
                setIsAuthenticated(response.data.isAuthenticated);
            } catch (error) {
                // Handle error, perhaps redirect to the login page
                setIsAuthenticated('User Unauthenticated');
            }
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if (isAuthenticated === 'User Unauthenticated') {
        return <Navigate to="/user/signin" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
