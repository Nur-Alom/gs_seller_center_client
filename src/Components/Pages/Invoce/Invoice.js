import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../../Images/logo.jpg';
import './Invoice.css';

const Invoice = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState({});

    // Load Order Data.
    useEffect(() => {
        setLoading(true);
        fetch(`https://daily-bazar-95aq.onrender.com/order/${id}`, {
            // headers: {
            //     'authorization': `Bearer ${localStorage.getItem("Auth_Token")}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
    }, [id]);


    return (
        <div>
            <div className='display-invoice px-6 mx-auto'>
                <h2 className='my-4 font-bold text-lg dark:text-white'>Orders</h2>
                <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl mb-8'>
                    <div className='py-3 md:py-6 px-4 md:px-6'>
                        {loading ?
                            <div className='text-center'>
                                <div className="my-10">
                                    <div className="loading-bar"></div>
                                    <div className="loading-bar"></div>
                                    <div className="loading-bar"></div>
                                    <div className="loading-bar"></div>
                                </div>
                            </div>
                            :
                            <div className=''>
                                <div id='invoice' className=''>
                                    <div className=''>
                                        <div className='flex flex-col md:flex-row justify-between'>
                                            <h2 className='font-bold font-sans text-xl dark:text-white'>
                                                INVOICE
                                                <p className='text-xs mt-1 text-gray-500 dark:text-gray-400'>
                                                    STATUS:
                                                    <span className='mx-2'>
                                                        {orders.status === "Pending" &&
                                                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600">Pending</span>
                                                        }
                                                        {orders.status === "Processing" &&
                                                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-blue-500 bg-blue-100 dark:text-white dark:bg-blue-800">Processing</span>
                                                        }
                                                        {orders.status === "Delivered" &&
                                                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">Delivered</span>
                                                        }
                                                        {orders.status === "Cancel" &&
                                                            <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100 dark:text-white dark:bg-red-600">Cancel</span>
                                                        }
                                                    </span>
                                                </p>
                                            </h2>
                                            <div className='text-start md:text-end mt-4 md:mt-0'>
                                                <img className='w-8 h-8' src={logo} alt="" />
                                                <small className='font-sans text-gray-600 dark:text-gray-400'>Cecilia Chapman, 561-4535 Nulla LA, <br /> United States 96522</small>
                                            </div>
                                        </div>
                                        <hr className='my-6' />
                                        <div className='flex flex-col md:flex-row justify-between'>
                                            <span className='text-start'>
                                                <h4 className='text-sm font-bold text-gray-700 dark:text-gray-400 font-sans'>DATE.</h4>
                                                <p className='text-sm text-gray-600 dark:text-gray-300 font-sans'>{orders?.orderTime?.slice(4, 15)}</p>
                                            </span>
                                            <span className='text-start mt-4 md:mt-0'>
                                                <h4 className='text-sm font-bold text-gray-700 dark:text-gray-400 font-sans'>INVOICE NO.</h4>
                                                <p className='text-sm text-gray-600 dark:text-gray-300 font-sans'>#000215</p>
                                            </span>
                                            <span className='text-start mt-4 md:mt-0 md:text-end'>
                                                <h4 className='text-sm font-bold text-gray-700 dark:text-gray-400 font-sans'>INVOICE TO.</h4>
                                                <span className='text-sm text-gray-600 dark:text-gray-300 font-sans'>{orders?.displayName}</span>
                                                <br />
                                                <span className='text-sm text-gray-600 dark:text-gray-300 font-sans'>{orders?.city}, {orders?.district}</span>
                                                <br />
                                                <span className='text-sm text-gray-600 dark:text-gray-300 font-sans'>{orders?.street}, {orders?.zipCode}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='my-8 w-full overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg'>
                                        <table className="w-full whitespace-no-wrap">
                                            <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-800">
                                                <tr className=''>
                                                    <td className='px-4 py-3'>SR.</td>
                                                    <td className='px-4 py-3'>PRODUCT NAME</td>
                                                    <td className='px-4 py-3 text-center'>QUANTITY</td>
                                                    <td className='px-4 py-3 text-center'>ITEM PRICE</td>
                                                    <td className='px-4 py-3 text-center'>AMOUNT</td>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400 text-serif text-sm ">
                                                {orders?.cart?.map(ord =>
                                                    <tr className='dark:border-gray-700 dark:text-gray-400' key={ord._id}>
                                                        <td className='px-4 py-3 whitespace-nowrap font-normal text-gray-500 dark:text-gray-400 text-left'>{orders.orderId}</td>
                                                        <td className='px-4 py-3 whitespace-nowrap font-normal text-gray-500 dark:text-gray-400'>{ord.title}</td>
                                                        <td className='px-4 py-3 whitespace-nowrap font-bold text-center'>{ord.quantity}</td>
                                                        <td className='px-4 py-3 whitespace-nowrap font-bold text-center'>${ord.price.toFixed(2)}</td>
                                                        <td className='px-4 py-3 whitespace-nowrap text-center font-bold text-red-500 dark:text-green-500'><strong>${ord.price * ord.quantity}.00</strong></td>
                                                    </tr>)}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='flex flex-col md:flex-row justify-between px-7 py-8 bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-600 rounded-lg'>
                                        <span>
                                            <h2 className='text-sm text-gray-700 dark:text-gray-400 font-bold font-sans'>PAYMENT METHOD</h2>
                                            <p className='text-sm text-gray-500 dark:text-gray-300 font-bold'>{orders?.payMethod}CARD</p>
                                        </span>
                                        <span className='mt-4 md:mt-0'>
                                            <h2 className='text-sm text-gray-700 dark:text-gray-400 font-bold font-sans'>SUB TOTAL</h2>
                                            <p className='text-sm text-gray-500 dark:text-gray-300 font-bold'>${orders?.subTotal?.toFixed(2)}</p>
                                        </span>
                                        <span className='mt-4 md:mt-0'>
                                            <h2 className='text-sm text-gray-700 dark:text-gray-400 font-bold font-sans'>SHIPPING COAST</h2>
                                            <p className='text-sm text-gray-500 dark:text-gray-300 font-bold'>${orders?.shippingCoast?.toFixed(2)}</p>
                                        </span>
                                        <span className='mt-4 md:mt-0'>
                                            <h2 className='text-sm text-gray-700 dark:text-gray-400 font-bold font-sans'>DISCOUNT</h2>
                                            <p className='text-sm text-gray-500 dark:text-gray-300 font-bold'>${orders?.discount?.toFixed(2)}</p>
                                        </span>
                                        <span className='mt-4 md:mt-0'>
                                            <h2 className='text-sm text-gray-700 dark:text-gray-400 font-bold font-sans'>TOTAL AMOUNT</h2>
                                            <p className='text-xl font-sans font-bold text-red-500 dark:text-green-500 block'>${orders?.grandTotal?.toFixed(2)}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {!loading && <div className='mt-6 mb-5 text-right'>
                    <button className='text-sm font-sans inline-flex items-center justify-between bg-green-600 hover:bg-green-800 dark:hover:bg-gray-600 dark:bg-gray-900 border border-green-600 hover:border-green-800 dark:border-gray-600 px-3 py-2 rounded-md text-white gap-2' onClick={() => window.print('invoice')}>
                        PRINT INVOICE
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                    </button>
                </div>}
            </div>
            <div className='print-invoice py-3 md:py-6 px-4 md:px-6 bg-white'>
                <div className='bg-white'>
                    <div id='invoice' className='bg-white'>
                        <div className='bg-white'>
                            <div className='flex justify-between'>
                                <h2 className='font-bold font-sans text-xl'>
                                    INVOICE
                                    <p className='text-xs mt-1 text-gray-500'>
                                        STATUS:
                                        <span className='mx-2'>
                                            {orders.status === "Pending" &&
                                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 dark:text-white dark:bg-yellow-600">Pending</span>
                                            }
                                            {orders.status === "Processing" &&
                                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-blue-500 bg-blue-100 dark:text-white dark:bg-blue-800">Processing</span>
                                            }
                                            {orders.status === "Delivered" &&
                                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">Delivered</span>
                                            }
                                            {orders.status === "Cancel" &&
                                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-red-100 dark:text-white dark:bg-red-600">Cancel</span>
                                            }
                                        </span>
                                    </p>
                                </h2>
                                <div className='text-end'>
                                    <img className='w-8 h-8' src={logo} alt="" />
                                    <small className='font-sans text-gray-600'>Cecilia Chapman, 561-4535 Nulla LA, <br /> United States 96522</small>
                                </div>
                            </div>
                            <hr className='my-6' />
                            <div className='flex justify-between'>
                                <span className='text-start'>
                                    <h4 className='text-sm font-bold text-gray-700 font-sans'>DATE.</h4>
                                    <p className='text-sm text-gray-600 font-sans'>{orders?.orderTime?.slice(4, 15)}</p>
                                </span>
                                <span className='text-start'>
                                    <h4 className='text-sm font-bold text-gray-700 font-sans'>INVOICE NO.</h4>
                                    <p className='text-sm text-gray-600 font-sans'>#000215</p>
                                </span>
                                <span className='text-end'>
                                    <h4 className='text-sm font-bold text-gray-700 font-sans'>INVOICE TO.</h4>
                                    <span className='text-sm text-gray-600 font-sans'>{orders?.displayName}</span>
                                    <br />
                                    <span className='text-sm text-gray-600 font-sans'>{orders?.city}, {orders?.district}</span>
                                    <br />
                                    <span className='text-sm text-gray-600 font-sans'>{orders?.street}, {orders?.zipCode}</span>
                                </span>
                            </div>
                        </div>
                        <div className='my-8 w-full overflow-hidden border border-gray-200 rounded-lg'>
                            <table className="w-full whitespace-no-wrap">
                                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100">
                                    <tr className=''>
                                        <td className='px-4 py-3'>SR.</td>
                                        <td className='px-4 py-3'>PRODUCT NAME</td>
                                        <td className='px-4 py-3 text-center'>QUANTITY</td>
                                        <td className='px-4 py-3 text-center'>ITEM PRICE</td>
                                        <td className='px-4 py-3 text-center'>AMOUNT</td>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100 text-gray-700 text-serif text-sm ">
                                    {orders?.cart?.map(ord =>
                                        <tr className='' key={ord._id}>
                                            <td className='px-4 py-3 whitespace-nowrap font-normal text-gray-500 text-left'>{orders.orderId}</td>
                                            <td className='px-4 py-3 whitespace-nowrap font-normal text-gray-500'>{ord.title}</td>
                                            <td className='px-4 py-3 whitespace-nowrap font-bold text-center'>{ord.quantity}</td>
                                            <td className='px-4 py-3 whitespace-nowrap font-bold text-center'>${ord.price.toFixed(2)}</td>
                                            <td className='px-4 py-3 whitespace-nowrap text-center font-bold text-red-500'><strong>${ord.price * ord.quantity}.00</strong></td>
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex justify-between px-7 py-8 bg-gray-100 rounded-lg'>
                            <span>
                                <h2 className='text-sm text-gray-700 font-bold font-sans'>PAYMENT METHOD</h2>
                                <p className='text-sm text-gray-500 font-bold'>{orders?.payMethod}CARD</p>
                            </span>
                            <span>
                                <h2 className='text-sm text-gray-700 font-bold font-sans'>SUB TOTAL</h2>
                                <p className='text-sm text-gray-500 font-bold'>${orders?.subTotal?.toFixed(2)}</p>
                            </span>
                            <span>
                                <h2 className='text-sm text-gray-700 font-bold font-sans'>SHIPPING COAST</h2>
                                <p className='text-sm text-gray-500 font-bold'>${orders?.shippingCoast?.toFixed(2)}</p>
                            </span>
                            <span>
                                <h2 className='text-sm text-gray-700 font-bold font-sans'>DISCOUNT</h2>
                                <p className='text-sm text-gray-500 font-bold'>${orders?.discount?.toFixed(2)}</p>
                            </span>
                            <span>
                                <h2 className='text-sm text-gray-700 font-bold font-sans'>TOTAL AMOUNT</h2>
                                <p className='text-xl font-sans font-bold text-red-500 block'>${orders?.grandTotal?.toFixed(2)}</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Invoice;