import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Header from '../Header/Header';

const Coupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [totalCoupons, setTotalCoupons] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 5;

    // Load coupons.
    useEffect(() => {
        fetch(`https://quiet-fortress-45073.herokuapp.com/coupons`)
            .then(res => res.json())
            .then(data => setTotalCoupons(data.coupons))


        fetch(`https://quiet-fortress-45073.herokuapp.com/coupons?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setCoupons(data.coupons);
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
                    <h2 className='my-4 font-bold text-lg'>Coupons</h2>
                    <div className='bg-white border border-gray-200 rounded-md'>
                        <div className='lg:flex md:flex-row sm:flex-col px-4 py-6 items-center gap-2'>
                            <div className='w-4/5'>
                                <input className='w-full focus:bg-white bg-gray-100 p-3 border border-gray-300 outline-0 text-sm rounded-md' type="text" placeholder='Search by Coupon code/name' />
                            </div>
                            <div className='w-1/5'>
                                <button className='w-full flex justify-center items-center bg-green-600 text-white p-3 rounded-md'>
                                    + Add Coupon
                                </button>
                            </div>
                        </div>
                    </div>
                    {coupons.length ?
                        <div>
                            <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 mt-4">
                                <table className="w-full whitespace-no-wrap">
                                    <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                        <tr>
                                            <td className="px-3 py-3">COUPON ID</td>
                                            <td className="px-3 py-3">START DATE</td>
                                            <td className="px-3 py-3">END DATE</td>
                                            <td className="px-3 py-3">CAMPAIGNS NAME</td>
                                            <td className="px-3 py-3">CODE</td>
                                            <td className="px-3 py-3">PERCENTAGE</td>
                                            <td className="px-3 py-3">PRODUCT TYPE</td>
                                            <td className="px-3 py-3">STATUS</td>
                                            <td className="px-3 py-3">ACTION</td>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                        {
                                            coupons.map(coupon => <tr className='' key={coupon._id}>
                                                <td className='px-3 py-3 text-xs font-bold'>{coupon._id.slice(18, 24).toUpperCase()}</td>
                                                <td className='px-3 py-3 items-center text-sm'>
                                                    {new Date(coupon.createdAt).toDateString().slice(4, 10)},
                                                    {new Date(coupon.createdAt).toDateString().slice(10, 15)}
                                                </td>
                                                <td className='px-3 py-3 text-sm'>
                                                    {new Date(coupon.endTime).toDateString().slice(4, 10)},
                                                    {new Date(coupon.endTime).toDateString().slice(10, 15)}
                                                </td>
                                                <td className='px-3 py-3 text-sm'>{coupon.title}</td>
                                                <td className='px-3 py-3 text-sm font-semibold'>{coupon.couponCode}</td>
                                                <td className='px-2 py-3 text-sm font-semibold'>{coupon.discountPercentage}%</td>
                                                <td className='px-3 py-3 text-sm'>{coupon.productType}</td>
                                                <td className='px-2 py-3 text-sm'>
                                                    {new Date(coupon.endTime) < Date.now() ?
                                                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100 dark:text-white dark:bg-yellow-600">Expired</span>
                                                        :
                                                        <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-600 bg-green-100 dark:text-white dark:bg-yellow-600">Active</span>
                                                    }
                                                </td>
                                                <td className='px-2 py-3 text-sm'>
                                                    <div className="flex">
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
                            <div className='flex items-center justify-between p-4 mb-6 bg-white border border-gray-200  rounded-b-lg'>
                                <div className='text-xs font-bold text-gray-600'>
                                    SHOWING 1-5 OF {totalCoupons.length}
                                </div>
                                <div className='text-xs font-bold bg-gray-100 rounded'>
                                    {
                                        [...Array(pageCount).keys()]
                                            .map(number => <button
                                                key={number}
                                                onClick={() => setPage(number)}
                                                className={number === page ? 'px-3 py-2 bg-green-400 text-white border-gray-200 rounded outline-0' : 'px-3 py-2 border-gray-200 rounded outline-0'}>
                                                {number + 1}
                                            </button>)
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className='text-center'>
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

export default Coupons;