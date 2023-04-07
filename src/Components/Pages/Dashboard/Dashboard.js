import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigations/Navigation';
import './Dashboard.css';

const Dashboard = () => {
    const [sidebar, setSidebar] = useState(false);

    const changeSideBar = () => {
        if (sidebar) {
            setSidebar(false);
        } else {
            setSidebar(true)
        }
    }


    return (
        <div className='w-full flex h-screen'>
            <Navigation
                sidebar={sidebar}
            />
            <div className='flex flex-col flex-1 w-full h-screen'>
                <Header
                    changeSideBar={changeSideBar}
                />
                <div className='h-full overflow-y-auto bg-slate-50'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;