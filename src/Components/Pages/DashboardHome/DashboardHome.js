import React from 'react';
import Header from '../Header/Header';
import './DashboardHome.css';

const DashboardHome = () => {
    return (
        <div className='flex flex-col flex-1 w-full h-screen'>
            <Header />
            <div className='h-full overflow-y-auto'>
                <div className='px-6 mx-auto'>
                    <p className='my-6 font-bold text-lg'>Dashboard Overview</p>
                    <div className='grid gap-4 mb-8 md:grid-cols-3 xl:grid-cols-3'>
                        <div className='rounded-lg text-white text-center bg-teal-500 px-4 py-8'>
                            <svg className='m-auto text-3xl' stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 5l-8-4-8 4 8 4 8-4zM8 2.328l5.345 2.672-5.345 2.672-5.345-2.672 5.345-2.672zM14.398 7.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199zM14.398 10.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199z"></path>
                            </svg>
                            <p className='text-l mt-2 mb-1'>Today Order</p>
                            <h4 className='text-2xl font-bold'>$86.00</h4>
                        </div>
                        <div className='rounded-lg text-white text-center bg-blue-500 px-4 py-8'>
                            <svg className='m-auto text-3xl' stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            <p className='text-l mt-2 mb-1'>This Month</p>
                            <h4 className='text-2xl font-bold'>$4775.00</h4>
                        </div>
                        <div className='rounded-lg text-white text-center bg-green-600 px-4 py-8'>
                            <svg className='m-auto text-3xl' stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 2h-13c-0.825 0-1.5 0.675-1.5 1.5v9c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-9c0-0.825-0.675-1.5-1.5-1.5zM1.5 3h13c0.271 0 0.5 0.229 0.5 0.5v1.5h-14v-1.5c0-0.271 0.229-0.5 0.5-0.5zM14.5 13h-13c-0.271 0-0.5-0.229-0.5-0.5v-4.5h14v4.5c0 0.271-0.229 0.5-0.5 0.5zM2 10h1v2h-1zM4 10h1v2h-1zM6 10h1v2h-1z"></path>
                            </svg>
                            <p className='text-l mt-2 mb-1'>Total Order</p>
                            <h4 className='text-2xl font-bold'>$76579.00</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;