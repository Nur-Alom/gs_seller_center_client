import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Header/Header';

const AddStaff = () => {
    const [upImg, setUpImg] = useState("");

    // Preview Image Before Upload.
    const PreviewImg = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            const imageData = reader.result.split(",")[1];
            setUpImg(imageData);
        };
    };


    return (
        <div className='flex flex-col flex-1 w-full h-screen'>
            <Header />
            <div className='h-full overflow-y-auto bg-slate-50'>
                <div className='px-6 mx-auto'>
                    <div className='flex items-center justify-between border-b border-gray-300'>
                        <h2 className='my-4 font-bold text-lg'>Add New Staff</h2>
                        <NavLink to="/our-staff" className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                            Cancel
                        </NavLink>
                    </div>
                    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white mt-5 mb-8">
                        <div>
                            <form>
                                <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">1. Staff Image</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <div className="w-full grid md:grid-cols-2 sm:grid-cols-1 gap-4 items-center text-center">
                                                <label title='Upload Image' htmlFor="image-upload-btn" className='img-upload-btn'>
                                                    <div className="h-32 px-6 py-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer" role="button" tabIndex="0">
                                                        <span className="mx-auto flex justify-center">
                                                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-3xl text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>
                                                            </svg>
                                                        </span>
                                                        <p className="text-sm mt-2">Drag your image here</p>
                                                        <em className="text-xs text-gray-400">(Only *.jpeg and *.png images will be accepted)</em>
                                                        <input onChange={e => PreviewImg(e)} className='image-upload-btn hidden' type="file" name="image" id="image-upload-btn" accept="image/*" />
                                                    </div>
                                                </label>
                                                {upImg &&
                                                    <div className="w-fit h-32 px-3 py-2 border border-gray-200 rounded-md">
                                                        <img className='w-28 h-28' src={`data:image/*;base64,${upImg}`} alt="" id='ProfileImg' />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">2. Name</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <input className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0" type="text" name='name' placeholder='Staff Name' />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">3. Email</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <input className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0" type="email" name="email" placeholder='Email' />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">4. Password</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <input className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0" type="password" name="password" placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">5. Contact Number</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <input className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0" type="number" name="phone" placeholder="Phone number" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">6. Joining Date</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <input className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0" type="date" label="Joining Date" name="joiningDate" placeholder="Staff Joining Date" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                        <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">7. Staff Role</label>
                                        <div className="col-span-8 sm:col-span-4">
                                            <select className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0" name="role">
                                                <option value="" hidden="">Staff role</option>
                                                <option value="Admin">Admin</option>
                                                <option value="CEO">CEO</option>
                                                <option value="Manager">Manager</option>
                                                <option value="Accountant">Accountant</option>
                                                <option value="Driver"> Driver </option>
                                                <option value="Security Guard">Security Guard</option>
                                                <option value="Deliver Person">Delivery Person</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="my-10 text-right">
                                        <NavLink to="/our-staff" className="font-bold outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500 ml-4">
                                            Cancel
                                        </NavLink>
                                        <button className="font-bold outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-green-500 hover:bg-green-200 hover:border-green-300 hover:text-green-600 transition-colors duration-500 ml-4" type="submit">
                                            Add Staff
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStaff;