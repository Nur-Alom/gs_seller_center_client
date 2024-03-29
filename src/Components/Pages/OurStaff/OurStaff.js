import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useFirebase from '../../Hooks/useFirebase';

const OurStaff = () => {
    const { user, admin } = useFirebase();
    const [staffs, setStaffs] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    // const [totalStaff, setTotalStaff] = useState(0);
    const [page, setPage] = useState(0);
    const size = 8;

    // Load Staff Info.
    useEffect(() => {
        fetch(`https://daily-bazar-95aq.onrender.com/staffs?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setStaffs(data.staffs);
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber)
                // fetch('https://daily-bazar-95aq.onrender.com/staffs')
                //     .then(res => res.json())
                //     .then(data => setTotalStaff(data.count))
            })
    }, [page]);


    return (
        <div className='px-6 mx-auto'>
            <h2 className='my-4 font-bold text-lg dark:text-white'>Our Staffs</h2>
            <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-md'>
                <div className='flex flex-col md:flex-row px-4 py-6 gap-4'>
                    <div className='w-full md:w-4/5 md:flex items-center justify-between grid grid-cols-1 gap-4'>
                        <input className='w-full focus:bg-white dark:focus:border-gray-100 bg-gray-200 dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-500 dark:text-white outline-0 rounded-md' type="search" placeholder='Search by Coupon code/name' />
                        <select className='w-full focus:bg-white bg-gray-200 dark:bg-gray-800 dark:text-white p-3 border border-gray-300 dark:border-gray-500 dark:focus:border-gray-100 outline-0 rounded-md' name="" id="">
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
                    <div className='w-full md:w-1/5'>
                        <NavLink type='button' to="/add-staff" className='w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-white p-3 rounded-md text-sm'>
                            + Add Staff
                        </NavLink>
                    </div>
                </div>
            </div>
            {staffs.length ?
                <div>
                    <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 dark:border-gray-600">
                        <table className="w-full whitespace-no-wrap">
                            <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                <tr>
                                    <td className="px-3 py-3">STAFF ID</td>
                                    <td className="px-3 py-3">STAFF NAME</td>
                                    <td className="px-3 py-3">STAFF EMAIL</td>
                                    <td className="px-3 py-3">STAFF CONTACT</td>
                                    <td className="px-3 py-3">STAFF JOINING DATE</td>
                                    <td className="px-3 py-3">STAFF ROLE</td>
                                    {admin === true && <td className="px-3 py-3">ACTIONS</td>}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                                {
                                    staffs.map(staff => staff.email !== user.email && <tr className='' key={staff.staffId}>
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
                                        {admin === true && <td className='py-3 text-sm'>
                                            <div className="flex pl-1">
                                                <NavLink to="" title='Edit Information' className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                </NavLink>
                                                <button title='Delete' className="p-2 cursor-pointer text-gray-400 hover:text-red-600">
                                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>}
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='flex items-center justify-between p-4 mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-b-lg'>
                        <div className='text-xs font-bold text-gray-600 dark:text-gray-300'>
                            SHOWING {(page * staffs.length) + 1}-{(page + 1) * staffs.length} OF {staffs.length}
                        </div>
                        <div className='text-xs font-bold bg-gray-100 dark:bg-gray-800 rounded'>
                            {
                                [...Array(pageCount).keys()]
                                    .map(number => <button
                                        key={number}
                                        onClick={() => setPage(number)}
                                        className={number === page ? 'px-3 py-2 bg-green-400 text-white border-gray-200 rounded outline-0' : 'px-3 py-2 border-gray-200 dark:text-gray-200 rounded outline-0'}>
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