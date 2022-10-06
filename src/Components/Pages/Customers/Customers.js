import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Header from '../Header/Header';

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 5;


    // Load User Info.
    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then(res => res.json())
            .then(data => setTotalUsers(data.users))


        fetch(`http://localhost:5000/users?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber)
            })
    }, [page]);



    return (
        <div className='flex flex-col flex-1 w-full h-screen'>
            <Header />
            <div className='h-full overflow-y-auto bg-slate-50'>
                <div className='px-6 mx-auto'>
                    <h2 className='my-4 font-bold text-lg'>Customers</h2>
                    <div className='bg-white border border-gray-300 rounded-md'>
                        <div className='px-4 py-6'>
                            <input className='w-full focus:bg-white bg-gray-100 p-3 border border-gray-300 outline-0 rounded-md text-sm font-bold' type="text" placeholder='Search by name/email/phone' />
                        </div>
                    </div>
                    {users.length ?
                        <div>
                            <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 mt-4">
                                <table className="w-full whitespace-no-wrap">
                                    <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                        <tr>
                                            <td className="px-3 py-3">USER ID</td>
                                            <td className="px-3 py-3">USER IMAGE</td>
                                            <td className="px-3 py-3">USER NAME</td>
                                            <td className="px-3 py-3">USER EMAIL</td>
                                            <td className="px-3 py-3">USER PHONE</td>
                                            <td className="px-3 py-3">ACTIONS</td>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                        {
                                            users.map(user => <tr className='' key={user._id}>
                                                <td className='px-3 py-3 text-xs font-bold'>{user._id.slice(6, 12).toUpperCase()}</td>
                                                <td className='px-3 py-3 flex items-center text-sm'>
                                                    <img className='w-12 h-12 shadow-inner rounded-full p-1 mr-2' src={`data:image/png;base64,${user.photoURL}`} alt="" />
                                                    {user.title}
                                                </td>
                                                <td className='px-3 py-3 text-sm'>{user.displayName}</td>
                                                <td className='px-3 py-3 text-sm'>{user.email}</td>
                                                <td className='px-3 py-3 text-sm'>{user.phoneNumber}</td>
                                                <td className='px-2 py-3 text-sm'>
                                                    <div className="flex">
                                                        <div title='Details' className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>
                                                            </svg>
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
                                    SHOWING 1-5 OF {totalUsers.length}
                                </div>
                                <div className='text-xs font-bold bg-gray-100 rounded'>
                                    {
                                        [...Array(pageCount).keys()]
                                            .map(number => <button
                                                key={number}
                                                onClick={() => setPage(number)}
                                                className={number === page ? 'px-3 py-2 bg-green-400 text-white border-gray-200 rounded outline-0' : 'px-3 py-2 border-gray-200 rounded outline-0'}>
                                                {number + 1}
                                            </button>
                                            )
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
            </div>
        </div>
    );
};

export default Customers;