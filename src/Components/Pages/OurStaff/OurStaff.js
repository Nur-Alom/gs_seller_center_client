import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const OurStaff = () => {
    const [staffs, setStaffs] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [totalStaff, setTotalStaff] = useState([]);
    const [page, setPage] = useState(0);
    const size = 8;

    // Load Staff Info.
    useEffect(() => {
        fetch('https://gs-seller-center-server.up.railway.app/staffs')
            .then(res => res.json())
            .then(data => setTotalStaff(data.staffs))

        fetch(`https://gs-seller-center-server.up.railway.app/staffs?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setStaffs(data.staffs)
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber)
            })
    }, [page]);


    return (
        <div className='px-6 mx-auto'>
            <h2 className='my-4 font-bold text-lg'>Our Staffs</h2>
            <div className='bg-white border border-gray-200 rounded-md'>
                <div className='lg:flex md:flex-row sm:flex-col px-4 py-6 items-center gap-4'>
                    <div className='w-4/5 md:flex items-center justify-between gap-4'>
                        <input className='w-full focus:bg-white bg-gray-100 p-3 border border-gray-300 outline-0 text-sm rounded-md' type="text" placeholder='Search by Coupon code/name' />
                        <select className='bg-gray-100 focus:bg-white px-2 py-3 rounded outline-0 w-full border border-gray-300 text-sm' name="" id="">
                            <option value="" hidden>Staff Role</option>
                            <option value="">CEO</option>
                            <option value="">ADMIN</option>
                            <option value="">MANAGER</option>
                            <option value="">ACCOUNTANT</option>
                            <option value="">DRIVER</option>
                            <option value="">SECURITY GUARD</option>
                            <option value="">DELIVERY MAN</option>
                        </select>
                    </div>
                    <div className='w-1/5'>
                        <NavLink to="/add-staff" className='w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-white p-3 rounded-md text-sm'>
                            + Add Staff
                        </NavLink>
                    </div>
                </div>
            </div>
            {staffs.length ?
                <div>
                    <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200">
                        <table className="w-full whitespace-no-wrap">
                            <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                <tr>
                                    <td className="px-3 py-3">STAFF ID</td>
                                    <td className="px-3 py-3">STAFF NAME</td>
                                    <td className="px-3 py-3">STAFF EMAIL</td>
                                    <td className="px-3 py-3">STAFF CONTACT</td>
                                    <td className="px-3 py-3">STAFF JOINING DATE</td>
                                    <td className="px-3 py-3">STAFF ROLE</td>
                                    <td className="px-3 py-3">ACTIONS</td>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">

                                {
                                    staffs.map(staff => <tr className='' key={staff.staffId}>
                                        <td className='px-3 py-3 text-xs font-bold'>{staff.staffId.toUpperCase()}</td>
                                        <td className='px-3 py-3 flex items-center justify-start text-sm'>
                                            <img className='w-14 h-14 shadow-inner rounded-full p-1 mr-2' src={`data:image/*;base64,${staff.photoURL}`} alt="" />
                                            {staff.displayName}
                                        </td>
                                        <td className='px-3 py-3 text-sm'>{staff.email}</td>
                                        <td className='px-3 py-3 text-sm'>{staff.contact}</td>
                                        <td className='px-3 py-3 text-sm'>
                                            {staff.joiningDate &&
                                                <span>
                                                    {new Date(staff.joiningDate).toDateString().slice(4, 10)},
                                                    {new Date(staff.joiningDate).toDateString().slice(10, 15)}
                                                </span>
                                            }
                                        </td>
                                        <td className='px-3 py-3 text-sm font-semibold'>
                                            {staff.role}
                                        </td>
                                        <td className='py-3 text-sm'>
                                            <div className="flex justify-center">
                                                <div title='Edit' className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                </div>
                                                <div title='Delete' className="p-2 cursor-pointer text-gray-400 hover:text-red-600">
                                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='flex items-center justify-between p-4 mb-6 bg-white border border-gray-200 rounded-b-lg'>
                        <div className='text-xs font-bold text-gray-600'>
                            SHOWING 1-8 OF {totalStaff.length}
                        </div>
                        <div className='text-xs font-bold bg-gray-100 rounded'>
                            {
                                [...Array(pageCount).keys()]
                                    .map(number => <button
                                        key={number}
                                        onClick={() => setPage(number)}
                                        className={number === page ? 'px-3 py-2 bg-green-400 text-white border-gray-200 rounded' : 'px-3 py-2 border-gray-200 rounded'}>
                                        {number + 1}
                                    </button>)
                            }
                        </div>
                    </div>
                </div>
                :
                <div className="text-center">
                    <div className="loading">
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                    </div>
                </div>
            }
        </div>
    );
};

export default OurStaff;