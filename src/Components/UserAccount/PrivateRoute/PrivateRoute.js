import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
    let location = useLocation();
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <div className="text-center font-bold text-xl my-64">
                Loading...
            </div>
        )
    }
    if (user?.email) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} />;
};

export default PrivateRoute;