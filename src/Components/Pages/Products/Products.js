import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Products = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [totalProduct, setTotalProduct] = useState([]);
    const [page, setPage] = useState(0);
    const size = 15;


    // Load Products.
    useEffect(() => {
        fetch('https://quiet-fortress-45073.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setTotalProduct(data.products))

        fetch(`https://quiet-fortress-45073.herokuapp.com/products?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);
            })
    }, [page]);


    // Load categories.
    useEffect(() => {
        fetch('https://quiet-fortress-45073.herokuapp.com/categories')
            .then(res => res.json())
            .then(data => setCategories(data.categories))
    }, []);

    return (
        <div className='px-6 mx-auto'>
            <h2 className='my-4 font-bold text-lg'>Products</h2>
            <div className='mb-6'>
                <div className='bg-white py-2 px-4 my-4 rounded-md border border-gray-200'>
                    <form className='items-center grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
                        <div className='bg-white'>
                            <input className='w-full border border-gray-300 bg-gray-200 focus:bg-white px-3 py-3 rounded my-4 outline-0' type="text" placeholder='Search by Product Name' />
                        </div>
                        <div className='bg-gray-200 focus:bg-white rounded border border-gray-300 outline-0'>
                            <select className='bg-gray-200 focus:bg-white px-2 py-3 rounded outline-0 w-full' name="" id="">
                                <option value="All" hidden>Category</option>
                                {
                                    categories.map(category => <option key={category.parent}>{category.parent}</option>)
                                }
                            </select>
                        </div>
                        <div className='bg-gray-200 focus:bg-white rounded border border-gray-300 outline-0'>
                            <select className='bg-gray-200 focus:bg-white px-2 py-3 rounded outline-0 w-full' name="" id="">
                                <option value="All" hidden>Price</option>
                                <option value="">Low To High</option>
                                <option value="">High To Low</option>
                            </select>
                        </div>
                        <NavLink to="/add-products" className='bg-green-500 hover:bg-green-600 duration-500 text-white text-center py-3 rounded-md'>
                            +Add Product
                        </NavLink>
                    </form>
                </div>
            </div>
            <div className='bg-white w-full px-4 py-4 rounded border border-gray-200'>
                <div className='bg-white '>
                    <form className='flex items-center justify-between' action="">
                        <div className='w-3/4'>
                            <label htmlFor="csv-file-input">
                                <input className='hidden csv-file-input' type="file" accept="text/csv, .csv, application/vnd.ms-excel" name="" id="csv-file-input" />
                                <div className='text-center border border-dashed border-green-600 rounded p-3 cursor-pointer'>
                                    <span className='text-sm text-gray-500'>Drop CSV File</span>
                                </div>
                            </label>
                        </div>
                        <div className=''>
                            <button className='bg-gray-200 hover:bg-gray-400 duration-500 py-3 px-5 rounded mx-2'>Upload</button>
                            <button className='bg-green-500 hover:bg-green-600 duration-500 text-white py-3  px-5 rounded mx-2'>Download</button>
                        </div>
                    </form>
                </div>
            </div>
            {products.length ?
                <div>
                    <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200">
                        <table className="w-full whitespace-no-wrap">
                            <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                <tr>
                                    <td className="px-3 py-3">SKU</td>
                                    <td className="px-3 py-3">PRODUCT NAME</td>
                                    <td className="px-3 py-3">CATEGORY</td>
                                    <td className="px-3 py-3">PRICE</td>
                                    <td className="px-3 py-3">STOCK</td>
                                    <td className="px-3 py-3">STATUS</td>
                                    <td className="px-3 py-3">DISCOUNT</td>
                                    <td className="px-3 py-3">DETAILS</td>
                                    <td className="px-3 py-3">PUBLISHED</td>
                                    <td className="px-3 py-3">ACTIONS</td>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">

                                {
                                    products.map(product => <tr className='' key={product._id}>
                                        <td className='px-3 py-3 text-xs font-bold'>{product._id.slice(18, 24).toUpperCase()}</td>
                                        <td className='px-3 py-3 flex items-center justify-start text-sm'>
                                            <img className='w-8 shadow-inner rounded-full p-1 mr-2' src={product.image} alt="" />
                                            {product.title}
                                        </td>
                                        <td className='px-3 py-3 text-sm'>{product.parent}</td>
                                        <td className='px-3 py-3 text-sm font-bold'>${product.price}</td>
                                        <td className='px-3 py-3 text-sm'>{product.quantity < 0 ? 0 : product.quantity}</td>
                                        <td className='px-3 py-3 text-sm'>
                                            {product.quantity > 0 ?
                                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">Selling</span>
                                                :
                                                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-800">Sold Out</span>
                                            }
                                        </td>
                                        <td className='px-3 py-3 text-sm font-bold'>
                                            {product.discount > 0 &&
                                                <span>{Math.ceil(product.discount)}% OFF </span>
                                            }
                                        </td>
                                        <td className='px-3 py-3 text-sm'>
                                            <span title='Details' className="cursor-pointer text-lg flex justify-center text-center hover:text-green-500">
                                                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>
                                                </svg>
                                            </span>
                                        </td>
                                        <td className='px-3 py-3 text-sm'>
                                            {product.status === "Show" ?
                                                <span title='Showing' className="cursor-pointer text-xl flex justify-center text-center">
                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
                                                    </svg>
                                                </span>
                                                :
                                                <span title='Not Showing' className="cursor-pointer text-xl flex justify-center text-center">
                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-orange-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"></path>
                                                    </svg>
                                                </span>}
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
                            SHOWING 1-15 OF {totalProduct.length}
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

export default Products;