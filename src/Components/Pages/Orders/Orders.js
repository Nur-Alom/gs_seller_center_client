import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(false);
    const [totalOrders, setTotalOrders] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 10;

    // Load Orders.
    useEffect(() => {
        fetch(`https://daily-bazar-95aq.onrender.com/orders`)
            .then(res => res.json())
            .then(data => setTotalOrders(data.orders))


        fetch(`https://daily-bazar-95aq.onrender.com/orders?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data.orders);
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber)
            })
    }, [page, status]);


    // Update Order Status Function.
    const updateOrderStatus = (value, id, order) => {
        fetch(`https://daily-bazar-95aq.onrender.com/up-order/${id}?status=${value}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true && data.matchedCount === 1) {
                    if (status === true) {
                        setStatus(false)
                    } else {
                        setStatus(true)
                    }
                    toastSuccess();
                }
                else {
                    toastError();
                }
            })
    };

    const toastSuccess = () => toast.success("Order Status Updated Successfully!!");
    const toastError = () => toast.error("Somethings wants wrong!! please try again.");


    return (
        <div className='px-6 mx-auto'>
            <h2 className='my-4 font-bold text-lg'>Orders</h2>
            <div className='bg-white border border-gray-200 rounded-md'>
                <div className='grid md:grid-cols-4 sm:grid-cols-1 gap-3 px-4 py-6 items-center'>
                    <div>
                        <input className='w-full focus:bg-white bg-gray-100 p-3 border border-gray-300 outline-0 text-sm rounded-md' type="text" placeholder='Search by phone' />
                    </div>
                    <div>
                        <select className='w-full focus:bg-white bg-gray-100 p-3 border border-gray-300 outline-0 text-sm rounded-md' name="" id="">
                            <option value="" hidden>By Status</option>
                            <option value="">Pending</option>
                            <option value="">Processing</option>
                            <option value="">Delivered</option>
                            <option value="">Cancel</option>
                        </select>
                    </div>
                    <div>
                        <select className='w-full focus:bg-white bg-gray-100 p-3 border border-gray-300 outline-0 text-sm rounded-md' name="" id="">
                            <option value="" hidden>By Time</option>
                            <option value="">Last 5 dyes orders</option>
                            <option value="">Last 7 dyes orders</option>
                            <option value="">Last 15 dyes orders</option>
                            <option value="">Last 30 dyes orders</option>
                        </select>
                    </div>
                    <div>
                        <button className='flex justify-center items-center w-full bg-green-600 text-white p-3 rounded-md'>
                            Download
                            <span className="ml-2 text-base">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56m0 64.1l64 63.9 64-63.9M256 224v224.03"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            {orders.length ?
                <div>
                    <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 mt-4">
                        <table className="w-full whitespace-no-wrap">
                            <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                <tr>
                                    <td className="px-3 py-3">ORDER ID</td>
                                    <td className="px-3 py-3">DATE</td>
                                    <td className="px-3 py-3">SHIPPING ADDRESS</td>
                                    <td className="px-3 py-3">PHONE</td>
                                    <td className="px-3 py-3">METHOD</td>
                                    <td className="px-3 py-3">AMOUNT</td>
                                    <td className="px-3 py-3">STATUS</td>
                                    <td className="px-3 py-3">ACTION</td>
                                    <td className="px-3 py-3">INVOICE</td>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                {
                                    orders.map(order => <tr className='' key={order._id}>
                                        <td className='px-3 py-3 text-xs font-bold'>{order.orderId.toUpperCase()}</td>
                                        <td className='px-3 py-3 items-center text-sm'>
                                            {order.orderTime.slice(4, 16)}
                                        </td>
                                        <td className='px-3 py-3 text-sm'>{order.city},{order.district}</td>
                                        <td className='px-3 py-3 text-sm'>{order.phoneNumber}</td>
                                        <td className='px-3 py-3 text-sm font-semibold'>{order.paymentMethod.type}</td>
                                        <td className='px-2 py-3 text-sm font-semibold'>${order.grandTotal.toFixed(2)}</td>
                                        <td className='px-2 py-3 text-sm'>
                                            {order.status === "Pending" &&
                                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600">Pending</span>
                                            }
                                            {order.status === "Processing" &&
                                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-blue-500 bg-blue-100 dark:text-white dark:bg-blue-800">Processing</span>
                                            }
                                            {order.status === "Delivered" &&
                                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">Delivered</span>
                                            }
                                            {order.status === "Cancel" &&
                                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100 dark:text-white dark:bg-red-600">Cancel</span>
                                            }
                                        </td>
                                        <td className='px-2 py-3 text-sm'>
                                            <select onChange={(e) => updateOrderStatus(e.target.value, order._id, order)} className='bg-gray-100 p-1 border border-gray-300 focus:border-gray-500 outline-0 text-sm rounded-md items-center' name="" id="">
                                                <option value={order.status} hidden>{order.status}</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancel">Cancel</option>
                                            </select>
                                        </td>
                                        <td className='px-2 py-3 text-sm'>
                                            <div title='View Invoice' className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>
                                                </svg>
                                            </div>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='flex items-center justify-between p-4 mb-6 bg-white border border-gray-200 rounded-b-lg'>
                        <div className='text-xs font-bold text-gray-600'>
                            SHOWING {(page * orders.length) + 1}-{(page + 1) * orders.length} OF {totalOrders.length}
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
    );
};

export default Orders;