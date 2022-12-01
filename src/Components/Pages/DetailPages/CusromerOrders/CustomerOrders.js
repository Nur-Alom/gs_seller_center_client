import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CustomerOrders = () => {
    const { id } = useParams();
    const [infoLoading, setInfoLoading] = useState(true);
    const [status, setStatus] = useState(false);
    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 10;



    // Load Orders.
    useEffect(() => {
        fetch(`https://gs-seller-center-server.up.railway.app/users/${id}`)
            .then(res => res.json())
            .then(data => {
                const email = data.email;
                fetch(`https://gs-seller-center-server.up.railway.app/order/user?page=${page}&&size=${size}&&email=${email}`)
                    .then(res => res.json())
                    .then(data => {
                        setOrders(data.orders);
                        fetch(`https://gs-seller-center-server.up.railway.app/order/user?email=${email}`)
                            .then(res => res.json())
                            .then(data => {
                                setTotalOrders(data.orders);
                                const count = data.orders.length;
                                const pageNumber = Math.ceil(count / size);
                                setPageCount(pageNumber);
                                setInfoLoading(false);
                            })
                    })
            })
    }, [id, page, status]);


    // Update Order Status Function.
    const updateOrderStatus = (value, id, order) => {
        fetch(`https://gs-seller-center-server.up.railway.app/up-order/${id}?status=${value}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true && data.matchedCount === 1) {
                    toastSuccess();
                    if (status === true) {
                        setStatus(false)
                    } else {
                        setStatus(true)
                    }
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
            <div className='flex items-center justify-between border-b border-gray-300'>
                <h2 className='my-4 font-bold text-lg'>Customers Order List</h2>
                {/* {infoLoading ?
                    <button disabled onClick={() => window.history.back()} className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                        Cancel
                    </button>
                    : */}
                <button onClick={() => window.history.back()} className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-green-500 bg-white text-green-500 hover:bg-green-700 hover:border-green-700 hover:text-white font-sans transition-colors duration-500">
                    Go Back
                </button>
                {/* } */}
            </div>
            {infoLoading ?
                <div className='text-center'>
                    <div className="loading">
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                    </div>
                </div>
                :
                <div>
                    {orders.length ?
                        <div>
                            <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 mt-4">
                                <table className="w-full whitespace-no-wrap">
                                    <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                        <tr>
                                            <td className="px-3 py-3">ORDER ID</td>
                                            <td className="px-3 py-3">TIME</td>
                                            <td className="px-3 py-3">SHIPPING ADDRESS</td>
                                            <td className="px-3 py-3">PHONE</td>
                                            <td className="px-3 py-3">METHOD</td>
                                            <td className="px-3 py-3">AMOUNT</td>
                                            <td className="px-3 py-3">STATUS</td>
                                            <td className="px-3 py-3">ACTIONS</td>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                        {
                                            orders.map(order => <tr className='' key={order._id}>
                                                <td className='px-3 py-3 font-sans text-xs font-bold'>
                                                    {order.orderId}
                                                </td>
                                                <td className='px-3 py-3 font-sans text-sm'>
                                                    {order.orderTime.slice(4, 10)}, {order.orderTime.slice(11, 15)}
                                                </td>
                                                <td className='px-3 py-3 font-sans text-sm'>
                                                    {order.city}, {order.street}
                                                </td>
                                                <td className='px-3 py-3 font-sans text-sm'>
                                                    {order.phoneNumber}
                                                </td>
                                                <td className='px-3 py-3 font-sans font-bold'>
                                                    {order.paymentMethod.type}
                                                </td>
                                                <td className='px-3 py-3 text-sm font-sans font-bold'>
                                                    ${order.grandTotal.toFixed(2)}
                                                </td>
                                                <td className='px-2 py-3 font-sans text-sm'>
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
                                                <td className='px-2 py-3 font-sans text-sm'>
                                                    <select onChange={(e) => updateOrderStatus(e.target.value, order._id, order)} className='bg-gray-100 p-1 border border-gray-300 focus:border-gray-500 outline-0 text-sm rounded-md items-center' name="" id="">
                                                        <option value={order.status} hidden>{order.status}</option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancel">Cancel</option>
                                                    </select>
                                                </td>
                                                {/* <td className='px-2 py-3 text-sm'>
                                    <div className="flex">
                                    <NavLink to={`/customer-order/${order._id}`} title='View Orders' className="py-2 px-1 mx-1 text-gray-400 hover:text-green-600">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>
                                        </svg>
                                        </NavLink>
                                        <button title='Delete' className="py-2 px-1 mx-1 text-gray-400 hover:text-red-600">
                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                                            </svg>
                                            </button>
                                            </div>
                                        </td> */}
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='flex items-center justify-between font-sans p-4 mb-6 bg-white border border-gray-200 rounded-b-lg'>
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
                                            </button>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div class="w-full bg-white rounded-md dark:bg-gray-800">
                            <div class="p-8 text-center">
                                <span class="flex justify-center my-30 text-red-500 font-semibold text-6xl">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z"></path>
                                    </svg>
                                </span>
                                <h2 class="font-medium text-base mt-4 text-gray-600">This Customer have no order Yet!</h2>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default CustomerOrders;