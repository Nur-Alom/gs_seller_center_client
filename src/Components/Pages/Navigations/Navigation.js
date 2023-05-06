import React, { useState } from 'react';
import './Navigation.css';
import logoImg from '../../Images/logo.jpg';
import { NavLink } from 'react-router-dom';
import useFirebase from '../../Hooks/useFirebase';
import { useEffect } from 'react';
import { OffCanvas, OffCanvasMenu } from 'react-offcanvas';

const Navigation = ({ sidebar, changeSideBar }) => {
    const { logout } = useFirebase();
    const [page, setPage] = useState("");

    // Set Page Cooler.
    useEffect(() => {
        if (window.location.pathname === "/") {
            setPage("/");
        } else if (window.location.pathname === "/products") {
            setPage("products");
        } else if (window.location.pathname === "/category") {
            setPage("category");
        } else if (window.location.pathname === "/customers") {
            setPage("customers");
        } else if (window.location.pathname === "/orders") {
            setPage("orders");
        } else if (window.location.pathname === "/coupons") {
            setPage("coupons");
        } else if (window.location.pathname === "/our-staff") {
            setPage("our-staff");
        } else if (window.location.pathname === "/setting") {
            setPage("setting");
        }
    }, [page]);


    // useEffect(() => {
    //     if (sidebar) {
    //         setShow(true);
    //     } else {
    //         setShow(false);
    //     }
    // }, [sidebar]);


    const canvasOff = (value) => {
        if (value === "/") {
            setPage("/")
            changeSideBar();
        } else if (value === "products") {
            setPage("products")
            changeSideBar();
        } else if (value === "category") {
            setPage("category")
            changeSideBar();
        } else if (value === "customers") {
            setPage("customers")
            changeSideBar();
        } else if (value === "orders") {
            setPage("orders")
            changeSideBar();
        } else if (value === "coupons") {
            setPage("coupons")
            changeSideBar();
        } else if (value === "our-staff") {
            setPage("our-staff")
            changeSideBar();
        } else if (value === "setting") {
            setPage("setting")
            changeSideBar();
        }
    }


    return (
        <div>
            <OffCanvas
                width={500}
                transitionDuration={400}
                isMenuOpened={sidebar}
                effect='overlay'
                position={"left"}
            >
                <OffCanvasMenu>
                    <div className={'h-screen w-2/4 block absolute bg-white'}>
                        <div className='flex items-center px-6'>
                            <img className='w-8' src={logoImg} alt="" />
                            <span>
                                <h4 className='text-xl font-bold font-sans py-5'>G-Shop Seller</h4>
                            </span>
                        </div>
                        <ul className='font-sans'>
                            <li onClick={() => canvasOff("/")} className='relative'>
                                <NavLink className={page === "/" ? "px-6 py-5 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100" : "px-6 py-5 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-100"} to="/">
                                    {page === "/" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                                    </span>}
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                    <span className='px-3'>Dashboard</span>
                                </NavLink>
                            </li>
                            <li onClick={() => canvasOff("products")} className='relative'>
                                <NavLink className={page === "product" ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100" : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-100"} to="/products">
                                    {page === "products" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                                    </span>}
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                    <span className='px-3'>Products</span>
                                </NavLink>
                            </li>
                            <li onClick={() => canvasOff("category")} className='relative'>
                                <NavLink className={page === "category" ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100" : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-100"} to="/category">
                                    {page === "category" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                                    </span>}
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                    <span className='px-3'>Category</span>
                                </NavLink>
                            </li>
                            <li onClick={() => canvasOff("customers")} className='relative'>
                                <NavLink className={page === "customers" ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100" : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-100"} to="/customers">
                                    {page === "customers" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                                    </span>}
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    <span className='px-3'>Customers</span>
                                </NavLink>
                            </li>
                            <li onClick={() => canvasOff("orders")} className='relative'>
                                <NavLink className={page === "orders" ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100" : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-100"} to="/orders">
                                    {page === "orders" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                                    </span>}
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                                    <span className='px-3'>Orders</span>
                                </NavLink>
                            </li>
                            <li onClick={() => canvasOff("coupons")} className='relative'>
                                <NavLink className={page === "coupon" ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100" : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-100"} to="/coupons">
                                    {page === "coupons" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                                    </span>}
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
                                    <span className='px-3'>Coupon</span>
                                </NavLink>
                            </li>
                            <li onClick={() => canvasOff("our-staff")} className='relative'>
                                <NavLink className={page === "staff" ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100" : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-100"} to="/our-staff">
                                    {page === "our-staff" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                                    </span>}
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <span className='px-3'>Our Staff</span>
                                </NavLink>
                            </li>
                            <li onClick={() => canvasOff("setting")} className='relative'>
                                <NavLink className={page === "setting" ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-600 dark:text-gray-100" : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-500 hover:text-green-700 dark:hover:text-gray-200"} to="/setting">
                                    {page === "setting" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                                    </span>}
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                    <span className='px-3'>Setting</span>
                                </NavLink>
                            </li>
                        </ul>
                        <span className="absolute bottom-0 px-5 py-6 mt-3">
                            <button onClick={() => logout()} className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-10 py-3 rounded-lg text-white border border-transparent bg-green-600 hover:bg-green-700 w-full" type="button">
                                <span className="flex items-center">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="mr-3 text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40m64 160l80-80-80-80m-192 80h256"></path>
                                    </svg>
                                    <span className="text-sm">
                                        Log out
                                    </span>
                                </span>
                            </button>
                        </span>
                    </div>
                </OffCanvasMenu>
            </OffCanvas>

            {/* -------------------------------- */}

            <div className='hidden md:hidden lg:block'>
                <div className='flex items-center px-6'>
                    <img className='w-8' src={logoImg} alt="" />
                    <span>
                        <h4 className='text-xl font-bold font-sans py-5'>G-Shop Seller</h4>
                    </span>
                </div>
                <ul className='font-sans'>
                    <li className='relative'>
                        <NavLink onClick={() => setPage("/")} className={page === "/" ? "px-6 py-5 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100" : "px-6 py-5 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-100"} to="/">
                            {page === "/" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                            </span>}
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            <span className='px-3'>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className='relative'>
                        <NavLink onClick={() => setPage("products")} className={page === "product" ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100" : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-100"} to="/products">
                            {page === "products" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                            </span>}
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            <span className='px-3'>Products</span>
                        </NavLink>
                    </li>
                    <li className='relative'>
                        <NavLink onClick={() => setPage("category")} className={page === "category" ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100" : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-100"} to="/category">
                            {page === "category" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                            </span>}
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                            <span className='px-3'>Category</span>
                        </NavLink>
                    </li>
                    <li className='relative'>
                        <NavLink onClick={() => setPage("customers")} className={page === "customers" ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100" : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-100"} to="/customers">
                            {page === "customers" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                            </span>}
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            <span className='px-3'>Customers</span>
                        </NavLink>
                    </li>
                    <li className='relative'>
                        <NavLink onClick={() => setPage("orders")} className={page === "orders" ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100" : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-100"} to="/orders">
                            {page === "orders" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                            </span>}
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                            <span className='px-3'>Orders</span>
                        </NavLink>
                    </li>
                    <li className='relative'>
                        <NavLink onClick={() => setPage("coupons")} className={page === "coupon" ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100" : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-100"} to="/coupons">
                            {page === "coupons" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                            </span>}
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
                            <span className='px-3'>Coupon</span>
                        </NavLink>
                    </li>
                    <li className='relative'>
                        <NavLink onClick={() => setPage("our-staff")} className={page === "staff" ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-500 dark:text-gray-100" : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-gray-500 dark:text-gray-100"} to="/our-staff">
                            {page === "our-staff" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                            </span>}
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <span className='px-3'>Our Staff</span>
                        </NavLink>
                    </li>
                    <li className='relative'>
                        <NavLink onClick={() => setPage("setting")} className={page === "setting" ? "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200 text-green-600 dark:text-gray-100" : "px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 text-gray-500 hover:text-green-700 dark:hover:text-gray-200"} to="/setting">
                            {page === "setting" && <span className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg" aria-hidden="true">
                            </span>}
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                            <span className='px-3'>Setting</span>
                        </NavLink>
                    </li>
                </ul>
                <span className="lg:fixed bottom-0 px-5 py-6 mx-auto relative mt-3 block">
                    <button onClick={() => logout()} className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-10 py-3 rounded-lg text-white border border-transparent bg-green-600 hover:bg-green-700 w-full" type="button">
                        <span className="flex items-center">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="mr-3 text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40m64 160l80-80-80-80m-192 80h256"></path>
                            </svg>
                            <span className="text-sm">
                                Log out
                            </span>
                        </span>
                    </button>
                </span>
                {/* <div className='w-auto relative bottom-0 font-sans flex items-center justify-center'>
                    <button className='flex items-center bg-green-600 hover:bg-green-700 text-white rounded-md px-10 py-2'>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="mr-1 text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40m64 160l80-80-80-80m-192 80h256"></path>
                        </svg>
                        Logout
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default Navigation;