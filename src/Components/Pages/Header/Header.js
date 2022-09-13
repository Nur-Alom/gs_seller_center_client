import React from 'react';
import user from '../../Images/Student.jpg';

const Header = () => {
    return (
        <div className='z-40 py-4 bg-white shadow-sm dark:bg-gray-800'>
            <div className="container flex items-center justify-end h-full px-6 mx-auto text-green-500 dark:text-green-500">
                <button className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none" aria-label="Menu">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-6 h-6" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="48" d="M88 152h336M88 256h336M88 360h336"></path>
                    </svg>
                </button>
                <ul className="flex justify-end items-center flex-shrink-0 space-x-6">
                    <li className="flex">
                        <button className="rounded-md focus:outline-none" aria-label="Toggle color mode">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M152.62 126.77c0-33 4.85-66.35 17.23-94.77C87.54 67.83 32 151.89 32 247.38 32 375.85 136.15 480 264.62 480c95.49 0 179.55-55.54 215.38-137.85-28.42 12.38-61.8 17.23-94.77 17.23-128.47 0-232.61-104.14-232.61-232.61z"></path>
                            </svg>
                        </button>
                    </li>
                    <li className="relative inline-block text-left">
                        <button className="relative align-middle rounded-md focus:outline-none"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 480a80.09 80.09 0 0073.3-48H182.7a80.09 80.09 0 0073.3 48zm144-192v-60.53C400 157 372.64 95.61 304 80l-8-48h-80l-8 48c-68.88 15.61-96 76.76-96 147.47V288l-48 64v48h384v-48z"></path></svg><span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">6</span>
                        </button>
                    </li>
                    <li className="relative inline-block text-left">
                        <button className="rounded-full dark:bg-gray-500 bg-green-500 text-white h-8 w-8 font-medium mx-auto focus:outline-none">
                            <div className="relative rounded-full inline-block w-8 h-8 align-middle" aria-hidden="true">
                                <img className="object-cover w-full h-full rounded-full" src={user} loading="lazy" alt='' />
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;