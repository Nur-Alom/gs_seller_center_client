import React from 'react';
import empty from '../../Images/undraw_empty_re_opql (1).svg';
import './Category.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import swal from '@sweetalert/with-react';
import { useForm } from 'react-hook-form';
import useFirebase from '../../Hooks/useFirebase';

const Category = () => {
    const { admin } = useFirebase();
    const { register, handleSubmit } = useForm();
    const [infoLoading, setInfoLoading] = useState(true);
    const [status, setStatus] = useState(false);
    const [deleteCount, setDeleteCount] = useState(false);
    const [search, setSearch] = useState(false);
    const [categories, setCategories] = useState([]);
    const [totalCategory, setTotalCategory] = useState([]);
    const [category, setCategory] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 8;


    // Load Category.
    useEffect(() => {
        fetch(`https://daily-bazar-95aq.onrender.com/categories?page=${page}&&size=${size}&&category=${category}`)
            .then(res => res.json())
            .then(data => {
                setCategories(data.categories);
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);
                fetch('https://daily-bazar-95aq.onrender.com/categories')
                    .then(res => res.json())
                    .then(data => {
                        setTotalCategory(data.categories);
                        setInfoLoading(false);
                    })
            })
    }, [page, category, status, deleteCount]);


    // Search Specific Category By Type.
    const onSubmit = (value) => {
        if (value.search !== "") {
            setSearch(true);
            fetch(`https://daily-bazar-95aq.onrender.com/categories`)
                .then(res => res.json())
                .then(data => {
                    const searchData = data.categories.filter(data => data.type.toLowerCase().includes(value.search.toLowerCase()));
                    if (searchData.length) {
                        setCategories(searchData);
                        setSearch(false);
                    } else {
                        setSearch(false);
                        toast.error("Search info doesn't match any customer's profile!! please try again")
                    }
                })
        } else if (value.search === "") {
            fetch(`https://daily-bazar-95aq.onrender.com/categories?page=${page}&&size=${size}&&category=${category}`)
                .then(res => res.json())
                .then(data => {
                    setCategories(data.categories);
                    const count = data.count;
                    const pageNumber = Math.ceil(count / size);
                    setPageCount(pageNumber);
                    fetch('https://daily-bazar-95aq.onrender.com/categories')
                        .then(res => res.json())
                        .then(data => {
                            setTotalCategory(data.categories);
                            setInfoLoading(false);
                        })
                })
        }
    };


    // Sweet Alert.
    const sweetAlert = (category) => {
        swal(<div>
            <h2 className='text-xl font-medium'>Are You Sure! Want to Delete <span className='text-red-500'>{category.parent}</span> Record?</h2>
            <p className='mt-3 text-black text-md text-center'>Do you really want to delete these records? You can't view this in your list anymore if you delete!</p>
            {/* <div className='text-center mt-2'>
                <button className='bg-gray-400 hover:bg-gray-500 text-white text-sm font-medium px-4 py-2 mx-1 rounded-lg transition-colors duration-300 outline-0'>No, Keep it</button>
                <button className='bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 mx-1 rounded-lg transition-colors duration-300 outline-0' type='submit'>Yes, Delete it</button>
            </div> */}
        </div>,
            {
                icon: "warning",
                buttons: true,
                closeOnClickOutside: false,
            })
            .then((willDelete) => {
                if (admin && willDelete) {
                    deleteCategory(category._id)
                } else if (willDelete) {
                    toast.info("CURD Operation Disabled for Demo Projects!!")
                }
            });
    };


    // Update Product Status.
    const upStatus = (category) => {
        fetch(`https://daily-bazar-95aq.onrender.com/up-category-status/${category._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(category)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    if (status === true) {
                        setStatus(false);
                    } else {
                        setStatus(true);
                    }
                    toast.success("Status Update Successfully!!");
                }
                else {
                    toastError();
                }
            })
    };


    // Delete Category Function.
    const deleteCategory = (id) => {
        fetch(`https://daily-bazar-95aq.onrender.com/delete-cat/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    if (deleteCount === true) {
                        setDeleteCount(false);
                    } else {
                        setDeleteCount(true);
                    }
                    toastSuccess();
                }
                else {
                    toastError();
                }
            });
    };


    const toastSuccess = () => toast.success("Category Delete Successfully!!");
    const toastError = () => toast.error("Somethings wants wrong!! please try again.");


    return (
        <div className='px-6 mx-auto'>
            <h2 className='my-4 font-bold font-sans text-lg dark:text-white'>Categories</h2>
            <div className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-800 rounded-md font-sans'>
                <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 px-4 py-4 items-center'>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex justify-between items-center'>
                        <input {...register("search")} className='w-full focus:bg-white dark:focus:border-gray-100 bg-gray-200 dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-500 dark:text-white outline-0 rounded-md' type="search" placeholder='Search by category type' />
                        {search &&
                            <svg className="ml-2 mr-4 h-6 w-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="green" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="green" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        }
                    </form>
                    <div className='w-full'>
                        <select onChange={(e) => setCategory(e.target.value)} className='w-full focus:bg-white bg-gray-200 dark:bg-gray-800 dark:text-white p-3 border border-gray-300 dark:border-gray-500 dark:focus:border-gray-100 outline-0 rounded-md' name="" id="">
                            <option value="All" hidden>Categories</option>
                            {
                                totalCategory.map(category => <option key={category.parent}>
                                    {category.parent}
                                </option>
                                )
                            }
                        </select>
                    </div>
                    <div className='w-full md:py-3'>
                        <NavLink type='button' to="/add-category" className='w-full bg-green-500 hover:bg-green-600 duration-500 text-white py-3 rounded-md border border-green-500 hover:border-green-600 text-center'>
                            + Add Categories
                        </NavLink>
                    </div>
                </div>
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
                <div className='font-sans'>
                    {categories.length ?
                        <div>
                            <div className="w-full overflow-x-auto rounded-t-lg border border-gray-200 dark:border-gray-600 mt-4">
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
                                                    <img className='w-8 hidden sm:block shadow-inner rounded-full p-1 mr-2' src={`data:image/*;base64,${category.icon}`} alt="" />
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
                                                <td className='py-3 px-3 text-sm'>
                                                    {category.status === "Show" ?
                                                        <button onClick={() => upStatus(category)} title='Showing' className="text-xl flex justify-center text-center m-auto">
                                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
                                                            </svg>
                                                        </button>
                                                        :
                                                        <button onClick={() => upStatus(category)} title='Not Showing' className="text-xl flex justify-center text-center m-auto">
                                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-orange-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"></path>
                                                            </svg>
                                                        </button>
                                                    }
                                                </td>
                                                <td className='px-2 py-3 text-sm'>
                                                    <div className="flex">
                                                        <NavLink to={`/up-category/${category._id}`} title='Edit' className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                        </NavLink>
                                                        <div onClick={() => sweetAlert(category)} title='Delete' className="p-2 cursor-pointer text-gray-400 hover:text-red-600">
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
                            <div className='flex items-center justify-between p-4 mb-6 bg-white dark:bg-gray-700  border border-gray-200 dark:border-gray-600 rounded-b-lg'>
                                <div className='text-xs font-bold text-gray-600 dark:text-gray-300'>
                                    SHOWING {(page * categories.length) + 1}-{(page + 1) * categories.length} OF {totalCategory.length}
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
                        <div className='text-center font-sans text-sm font-semibold py-6'>
                            <div className='w-full'>
                                <img className='w-2/5 mx-auto' src={empty} alt="" />
                            </div>
                            <p className='inline-flex items-center pt-4 text-gray-600 font-sans text-2xl font-semibold'>
                                No Category Found!!
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-emoji-frown-fill mx-2 text-gray-700" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
                                </svg>
                            </p>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default Category;