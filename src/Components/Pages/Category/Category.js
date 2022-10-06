import React from 'react';
import './Category.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Header from '../Header/Header';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [totalCategory, setTotalCategory] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 8;

    useEffect(() => {
        fetch('https://quiet-fortress-45073.herokuapp.com/categories')
            .then(res => res.json())
            .then(data => setTotalCategory(data.categories))

        fetch(`https://quiet-fortress-45073.herokuapp.com/categories?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setCategories(data.categories);
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
                    <h2 className='my-4 font-bold text-lg'>Categories</h2>
                    <div className='bg-white border border-gray-300 rounded-md'>
                        <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-8 px-4 py-6 items-center'>
                            <div>
                                <input className='w-full focus:bg-white bg-gray-200 p-3 border border-gray-300 outline-0 rounded-md' type="text" placeholder='Search by category type' />
                            </div>
                            <div>
                                <select className='w-full focus:bg-white bg-gray-200 p-3 border border-gray-300 outline-0 rounded-md' name="" id="">
                                    <option value="All" hidden>Categories</option>
                                    {
                                        categories.map(category => <option key={category.parent}>
                                            {category.parent}
                                        </option>
                                        )
                                    }
                                </select>
                            </div>
                            <div>
                                <button className='w-full bg-green-600 text-white p-3 rounded-md'>+ Add Categories</button>
                            </div>
                        </div>
                    </div>
                    {categories.length ?
                        <div>
                            <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 mt-4">
                                <table className="w-full whitespace-no-wrap">
                                    <thead className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                                        <tr>
                                            <td className="px-3 py-3">ID</td>
                                            <td className="px-3 py-3">ICON</td>
                                            <td className="px-3 py-3">PARENT</td>
                                            <td className="px-3 py-3">CHILDREN</td>
                                            <td className="px-3 py-3">TYPE</td>
                                            <td className="px-3 py-3">PUBLISHED</td>
                                            <td className="px-3 py-3">ACTIONS</td>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                                        {
                                            categories.map(category => <tr className='' key={category._id}>
                                                <td className='px-3 py-3 text-xs font-bold'>{category._id.slice(18, 24).toUpperCase()}</td>
                                                <td className='px-3 py-3 flex items-center justify-start text-sm'>
                                                    <img className='w-8 shadow-inner rounded-full p-1 mr-2' src={category.icon} alt="" />
                                                    {category.title}
                                                </td>
                                                <td className='px-3 py-3 text-sm'>{category.parent}</td>
                                                <td className='px-3 py-3 text-sm'>
                                                    {
                                                        category.children.map(ct => <span
                                                            key={ct}
                                                            className="bg-gray-200 text-gray-500 text-xs font-bold px-2 py-1 mx-1 rounded-full"
                                                        >
                                                            {ct}
                                                        </span>)
                                                    }
                                                </td>
                                                <td className='px-3 py-3 text-sm'>{category.type}</td>
                                                <td className='py-3 text-sm flex justify-center'>
                                                    {category.status === "Show" ?
                                                        <span title='Showing' className="cursor-pointer text-xl">
                                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
                                                            </svg>
                                                        </span>
                                                        :
                                                        <span title='Not Showing' className="cursor-pointer text-xl">
                                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-orange-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"></path>
                                                            </svg>
                                                        </span>}
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
                            <div className='flex items-center justify-between p-4 mb-6 bg-white border border-gray-200 rounded-b-lg'>
                                <div className='text-xs font-bold text-gray-600'>
                                    SHOWING 1-15 OF {totalCategory.length}
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

export default Category;