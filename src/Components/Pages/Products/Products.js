import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Header from '../Header/Header';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('./product.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])


    return (
        <div className='flex flex-col flex-1 w-full h-screen'>
            <Header />
            <div className='h-full overflow-y-auto bg-slate-50'>
                <div className='px-6 mx-auto'>
                    <h2 className='my-4 font-bold text-lg'>Products</h2>
                    <div className='mb-6'>
                        <div className='bg-white py-2 px-4 my-4 rounded-md border border-gray-200'>
                            <form className='items-center grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
                                <div className='bg-white'>
                                    <input className='border border-gray-300 bg-gray-200 px-2 py-2 rounded my-4 outline-0' type="text" placeholder='Search by Product Name' />
                                </div>
                                <div className='bg-gray-200 rounded border border-gray-300 py-2 outline-0'>
                                    <select className='bg-gray-200 px-2 rounded outline-0 w-full' name="" id="">
                                        <option value="All" hidden>Category</option>
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                        <option value="">5</option>
                                    </select>
                                </div>
                                <div className='bg-gray-200 rounded border border-gray-300 py-2 outline-0'>
                                    <select className='bg-gray-200 px-2 rounded outline-0 w-full' name="" id="">
                                        <option value="All" hidden>Price</option>
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                        <option value="">5</option>
                                    </select>
                                </div>
                                <div>
                                    <button className='bg-green-400 text-white font-bold w-full py-2 rounded-md' type="submit">
                                        Add Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='bg-white w-full px-4 py-4 rounded border border-gray-200'>
                        <div className='bg-white '>
                            <form className='flex items-center justify-between' action="">
                                <div className='w-3/4'>
                                    <input className='hidden' type="file" accept="text/csv, .csv, application/vnd.ms-excel" name="" id="" />
                                    <div className='text-center border border-dashed border-green-600 rounded p-3 cursor-pointer'>
                                        <span className='text-sm text-gray-500'>Drop CSV File</span>
                                    </div>
                                </div>
                                <div className=''>
                                    <button className='bg-gray-400 text-white py-3 px-5 rounded mx-2'>Upload</button>
                                    <button className='bg-green-400 text-white py-3 px-5 rounded mx-2'>Download</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="w-full overflow-x-scroll rounded-t-lg border border-gray-200">
                        <table class="w-full whitespace-no-wrap">
                            <thead class="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                <tr>
                                    <td class="px-3 py-3">SKU</td>
                                    <td class="px-3 py-3">PRODUCT NAME</td>
                                    <td class="px-3 py-3">CATEGORY</td>
                                    <td class="px-3 py-3">PRICE</td>
                                    <td class="px-3 py-3">STOCK</td>
                                    <td class="px-3 py-3">STATUS</td>
                                    <td class="px-3 py-3">DISCOUNT</td>
                                    <td class="px-3 py-3">DETAILS</td>
                                    <td class="px-3 py-3">PUBLISHED</td>
                                    <td class="px-3 py-3">ACTIONS</td>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">

                                {
                                    products.slice(0, 15).map(product => <tr className='' key={product._id}>
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
                                                <span class="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">Selling</span>
                                                :
                                                <span class="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-800">Sold Out</span>
                                            }
                                        </td>
                                        <td className='px-3 py-3 text-sm'>{product.discount.toFixed(2)}</td>
                                        <td className='px-3 py-3 text-sm'>
                                            <span title='Details' class="cursor-pointer text-lg flex justify-center text-center hover:text-green-500">
                                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>
                                                </svg>
                                            </span>
                                        </td>
                                        <td className='px-3 py-3 text-sm'>
                                            {product.status === "Show" ?
                                                <span title='Showing' class="cursor-pointer text-xl flex justify-center text-center">
                                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
                                                    </svg>
                                                </span>
                                                :
                                                <span title='Not Showing' class="cursor-pointer text-xl flex justify-center text-center">
                                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="text-orange-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"></path>
                                                    </svg>
                                                </span>}
                                        </td>
                                        <td className='py-3 text-sm'>
                                            <div class="flex justify-center">
                                                <div title='Edit' class="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                                                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                </div>
                                                <div title='Delete' class="p-2 cursor-pointer text-gray-400 hover:text-red-600">
                                                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* <div className='flex items-center justify-between p-4 mb-6 bg-white border border-gray-200 rounded-b-lg'>
                        <div className='text-xs font-bold text-gray-600'>SHOWING 1-15 OF {products.length}</div>
                        <div className='text-xs font-bold text-gray-600'>Hello</div>
                    </div> */}
                    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between p-4 mb-6 bg-white border border-gray-200 rounded-b-lg">
                        <div>
                            <p class="text-xs font-bold text-gray-600">
                                SHOWING
                                <span> 1</span>
                                -
                                <span>15 </span>
                                OF
                                <span> {products.length}</span>
                            </p>
                        </div>
                        <div>
                            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <a title='Previous' href="/" class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                    <span class="sr-only">Previous</span>
                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                                <a href="/" aria-current="page" class="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20">1</a>
                                <a href="/" class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">2</a>
                                <a href="/" class="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">3</a>
                                <span class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">...</span>
                                <a href="/" class="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">8</a>
                                <a href="/" class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">9</a>
                                <a href="/" class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">10</a>
                                <a title='Next' href="/" class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                    <span class="sr-only">Next</span>
                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;