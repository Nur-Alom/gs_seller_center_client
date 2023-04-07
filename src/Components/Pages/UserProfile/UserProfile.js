import React from 'react';
import { useState } from 'react';
import useFirebase from '../../Hooks/useFirebase';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import swal from '@sweetalert/with-react';

const UserProfile = () => {
    const { admin, user } = useFirebase();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [infoLoading, setInfoLoading] = useState(false);
    const [staff, setStaff] = useState({});
    const [upImg, setUpImg] = useState("");

    // Load Coupon
    useEffect(() => {
        fetch(`https://daily-bazar-95aq.onrender.com/staff?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setStaff(data)
                }
            })
    }, [user?.email]);


    // Preview Image Before Upload.
    const PreviewImg = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            const imageData = reader.result.split(",")[1];
            setUpImg(imageData);
        };
    };


    // Update Profile Information.
    const onSubmit = data => {
        data.photoURL = upImg ? upImg : staff.photoURL;
        data.displayName = data.displayName ? data.displayName : staff.displayName;
        data.contact = data.contact ? data.contact : staff.contact;
        data.email = data.email ? data.email : staff.email;
        data.role = data.role ? data.role : staff.role;
        data.joiningDate = staff.joiningDate;
        data.staffId = staff.staffId;
        data.createdAt = staff.createdAt;
        data.password = staff.password;
        data.updatedAt = new Date().toISOString();
        swal(<div>
            <h2 className='text-xl font-medium'>Are You Sure! Want to Update Your Information?</h2>
        </div>,
            {
                icon: "warning",
                buttons: true,
                closeOnClickOutside: false,
            })
            .then((willDelete) => {
                if (willDelete) {
                    toast.info("CURD Operation Disabled for Demo Projects!!")
                }
                // if (willDelete) {
                //     setInfoLoading(true);
                //     fetch(`https://daily-bazar-95aq.onrender.com/up-staff/${staff._id}`, {
                //         method: 'PUT',
                //         headers: {
                //             'content-type': 'application/json'
                //         },
                //         body: JSON.stringify(data)
                //     })
                //         .then(res => res.json())
                //         .then(data => {
                //             if (data.acknowledged === true) {
                //                 toastSuccess();
                //                 setInfoLoading(false);
                //             } else {
                //                 toastError();
                //             }
                //         })
                // } else if (willDelete) {
                //     toast.info("CURD Operation Disabled for Demo Projects!!")
                // }
            })
    };

    // const toastSuccess = () => toast.success('Your Data Will Be Updated');
    // const toastError = () => toast.error('Somethings Wants Wrong!! Please Try Again');


    return (
        <div className='px-6 mx-auto'>
            <div className='flex items-center justify-between border-b border-gray-300'>
                <h2 className='my-4 font-bold text-lg'>Update Profile Information</h2>
                {/* {infoLoading ?
                    <button disabled onClick={() => window.history.back()} className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                        Cancel
                    </button>
                    :
                    <button onClick={() => window.history.back()} className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                        Cancel
                    </button>
                } */}
            </div>
            <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white mt-5 mb-8">
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="px-6 pt-8 flex-grow w-full h-full max-h-full">
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">1. Profile Picture</label>
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
                                                <input {...register("photoURL")} onChange={e => PreviewImg(e)} className='image-upload-btn hidden' type="file" id='image-upload-btn' accept="image/*" />
                                            </div>
                                        </label>
                                        {upImg ?
                                            <div className="w-fit h-32 px-3 py-2 border border-gray-200 rounded-md">
                                                <img className='w-28 h-28' src={`data:image/*;base64,${upImg}`} alt="" id='ProfileImg' />
                                            </div>
                                            :
                                            <div className="w-fit h-32 px-3 py-2 border border-gray-200 rounded-md">
                                                <img className='w-28 h-28' src={`data:image/*;base64,${staff.photoURL}`} alt="" id='ProfileImg' />
                                            </div>
                                        }
                                    </div>
                                    {errors.photoURL && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.photoURL.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">2. Name</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input defaultValue={staff.displayName}  {...register("displayName")} className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0" type="text" placeholder="Name" />
                                    {errors.displayName && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.displayName.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">3. Email</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input defaultValue={staff.email} {...register("email")} className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0" type="text" placeholder="Email" />
                                    {errors.email && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.email.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">4. Contact Number</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input defaultValue={staff.contact} {...register("contact")} className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0" type="number" placeholder="Contact" />
                                    {errors.contact && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.contact.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">5. Role</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <select {...register("role")} className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0">
                                        <option value={staff.role} hidden>{staff.role}</option>
                                        <option value="Admin">Admin</option>
                                        <option value="CEO">CEO</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Delivery Person">Delivery Person</option>
                                    </select>
                                </div>
                            </div>
                            <div className="my-10 text-right">
                                {infoLoading ?
                                    <button disabled className="inline-flex items-center font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 transition-colors duration-500 ml-4" type="submit">
                                        <svg stroke="white" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-xxl text-green-500 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>
                                        </svg>
                                        Update
                                        <svg className="ml-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </button>
                                    :
                                    <button className="inline-flex items-center font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600 transition-colors duration-500 ml-4">
                                        <svg stroke="white" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-xxl text-green-500 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>
                                        </svg>
                                        Update
                                    </button>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;