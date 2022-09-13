import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigations/Navigation';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className='flex'>
            <Navigation />
            <Outlet />
        </div>
    );
};

export default Dashboard;