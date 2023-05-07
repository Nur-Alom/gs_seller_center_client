import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useFirebase from '../../Hooks/useFirebase';
import defaultUser from '../../Images/user.png';

const Header = ({ changeSideBar }) => {
    const { user, logout } = useFirebase();
    const [dropdown, setDropdown] = useState(false);
    const [staffs, setStaffs] = useState({});
    const [theme, setTheme] = useState(localStorage.getItem('theme'));

    const light = 'light';
    const dark = 'dark';

    // Set Dark Mode.
    const changeDarkMode = () => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            localStorage.setItem('theme', light);
            setTheme('light');
        } else {
            localStorage.setItem('theme', dark);
            setTheme('dark');
        }
    }

    // Monitor Dark Mode.
    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        // // Whenever the user explicitly chooses light mode
        // localStorage.theme = 'light'

        // // Whenever the user explicitly chooses dark mode
        // localStorage.theme = 'dark'

        // // Whenever the user explicitly chooses to respect the OS preference
        // localStorage.removeItem('theme')
    }, [theme]);


    // Set Dropdown.
    const setDrop = () => {
        if (dropdown === true) {
            setDropdown(false);
        } else {
            setDropdown(true);
        };
    };


    // Load Staffs Info.
    useEffect(() => {
        fetch(`https://daily-bazar-95aq.onrender.com/staffs?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                const staffs = data?.staffs;
                const staffObj = staffs[0]
                setStaffs(staffObj)
            })
    }, [user.email]);


    return (
        <div className='display-invoice z-40 py-3 bg-white shadow-sm dark:bg-gray-800'>
            <div className="container flex items-center justify-between md:justify-between lg:justify-end h-full px-6 mx-auto text-green-500 dark:text-green-500">
                <div className='mt-1 items-center lg:hidden'>
                    <button title='Close' onClick={() => changeSideBar()} className='text-green-500 p-1 rounded-md focus:outline-none'>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-6 h-6" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="48" d="M88 152h336M88 256h336M88 360h336"></path>
                        </svg>
                    </button>
                </div>
                <ul className="flex justify-end items-center flex-shrink-0 space-x-6">
                    <li title='User Mail' className="flex">{user?.email}</li>
                    <li title='Theme' className="flex">
                        <button onClick={() => changeDarkMode()} className="rounded-md focus:outline-none" aria-label="Toggle color mode">
                            {theme === 'light' ? <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M152.62 126.77c0-33 4.85-66.35 17.23-94.77C87.54 67.83 32 151.89 32 247.38 32 375.85 136.15 480 264.62 480c95.49 0 179.55-55.54 215.38-137.85-28.42 12.38-61.8 17.23-94.77 17.23-128.47 0-232.61-104.14-232.61-232.61z"></path>
                            </svg> : <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 118a22 22 0 01-22-22V48a22 22 0 0144 0v48a22 22 0 01-22 22zm0 368a22 22 0 01-22-22v-48a22 22 0 0144 0v48a22 22 0 01-22 22zm113.14-321.14a22 22 0 01-15.56-37.55l33.94-33.94a22 22 0 0131.11 31.11l-33.94 33.94a21.93 21.93 0 01-15.55 6.44zM108.92 425.08a22 22 0 01-15.55-37.56l33.94-33.94a22 22 0 1131.11 31.11l-33.94 33.94a21.94 21.94 0 01-15.56 6.45zM464 278h-48a22 22 0 010-44h48a22 22 0 010 44zm-368 0H48a22 22 0 010-44h48a22 22 0 010 44zm307.08 147.08a21.94 21.94 0 01-15.56-6.45l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.55 37.56zM142.86 164.86a21.89 21.89 0 01-15.55-6.44l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.56 37.55zM256 358a102 102 0 11102-102 102.12 102.12 0 01-102 102z"></path></svg>}
                        </button>
                    </li>
                    <li title='Notification' className="relative inline-block text-left">
                        <button className="relative align-middle rounded-md focus:outline-none"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 480a80.09 80.09 0 0073.3-48H182.7a80.09 80.09 0 0073.3 48zm144-192v-60.53C400 157 372.64 95.61 304 80l-8-48h-80l-8 48c-68.88 15.61-96 76.76-96 147.47V288l-48 64v48h384v-48z"></path></svg><span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">6</span>
                        </button>
                    </li>
                    <li title='Options' className="relative inline-block text-left">
                        <button onClick={setDrop} className="rounded-full dark:bg-gray-500 bg-white text-white h-8 w-8 font-medium mx-auto focus:outline-none">
                            <div className="relative rounded-full inline-block w-8 h-8 align-middle" aria-hidden="true">
                                <img
                                    className="object-cover w-8 h-8 rounded-full"
                                    src={staffs?.photoURL ? `data:image/*;base64,${staffs?.photoURL}` : defaultUser} loading="eager" alt=''
                                />
                            </div>
                        </button>
                        <ul className={dropdown ? "origin-top-right absolute right-0 mt-2 w-56 shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none" : "origin-top-right absolute right-0 mt-2 w-56 shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none hidden"}>
                            <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                                <NavLink to="/">
                                    <span className="flex items-center text-sm">
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-4 h-4 mr-3" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect width="176" height="176" x="48" y="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="288" y="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="48" y="288" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect><rect width="176" height="176" x="288" y="288" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="20" ry="20"></rect>
                                        </svg>
                                        <span className='text-sm font-bold font-sans'>Dashboard</span>
                                    </span>
                                </NavLink>
                            </li>
                            <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                                <NavLink to="/update-profile">
                                    <span className="flex items-center text-sm">
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-4 h-4 mr-3" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z">
                                        </path>
                                        </svg>
                                        <span className='text-sm font-bold font-sans'>Edit Profile</span>
                                    </span>
                                </NavLink>
                            </li>
                            <li className="cursor-pointer justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                                <button className='w-full' onClick={() => logout()}>
                                    <span className="flex items-center text-sm">
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-4 h-4 mr-3" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40m64 160l80-80-80-80m-192 80h256">
                                            </path>
                                        </svg>
                                        <span className='text-sm font-bold font-sans'>Log out</span>
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;