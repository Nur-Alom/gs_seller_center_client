import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigations/Navigation';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className='w-full flex'>
            <Navigation />
            <div className='flex flex-col flex-1 w-full h-screen'>
                <Header />
                <div className='h-full overflow-y-auto bg-slate-50'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;