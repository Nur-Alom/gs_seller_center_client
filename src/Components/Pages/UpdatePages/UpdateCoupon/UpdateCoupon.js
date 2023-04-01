import swal from '@sweetalert/with-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useFirebase from '../../../Hooks/useFirebase';

const UpdateCoupon = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { admin } = useFirebase();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [infoLoading, setInfoLoading] = useState(false);
    const [coupons, setCoupons] = useState({});
    const [upImg, setUpImg] = useState("");

    const { _id, logo, title, productType, endTime, minimumAmount, discountPercentage, createdAt, couponId, couponCode } = coupons;

    // Load Coupon
    useEffect(() => {
        fetch(`https://daily-bazar-95aq.onrender.com/coupon/${id}`)
            .then(res => res.json())
            .then(data => setCoupons(data))
    }, [id]);



    // Preview Image Before Upload.
    const PreviewImg = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            const imageData = reader.result.split(",")[1];
            setUpImg(imageData);
        };
    };


    // Add New Coupon Information.
    const onSubmit = data => {
        data.logo = upImg ? upImg : logo;
        data.title = data.title ? data.title : title;
        data.minimumAmount = data.minimumAmount ? parseInt(data.minimumAmount) : parseInt(minimumAmount);
        data.discountPercentage = data.discountPercentage ? parseInt(data.discountPercentage) : parseInt(discountPercentage);
        data.productType = data.productType ? data.productType : productType;
        data.couponCode = data.couponCode ? data.couponCode : couponCode;
        data.endTime = data.endTime ? data.endTime : endTime;
        data.couponId = couponId;
        data.createdAt = createdAt;
        data.updatedAt = new Date().toISOString();
        swal(<div>
            <h2 className='text-xl font-medium'>Are You Sure! Want to Update <span className='text-red-500'>{coupons.title}</span> Coupon?</h2>
        </div>,
            {
                icon: "warning",
                buttons: true,
                closeOnClickOutside: false,
            })
            .then((willDelete) => {
                if (admin && willDelete) {
                    setInfoLoading(true);
                    fetch(`https://daily-bazar-95aq.onrender.com/up-coupon/${_id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged === true) {
                                toastSuccess();
                                setInfoLoading(false);
                                navigate('/coupons');
                            } else {
                                toastError();
                            }
                        })
                } else if (willDelete) {
                    toast.info("CURD Operation Disabled for Demo Projects!!")
                }
            })
    };

    const toastSuccess = () => toast.success('Your Data Will Be Updated');
    const toastError = () => toast.error('Somethings Wants Wrong!! Please Try Again');



    return (
        <div className='px-6 mx-auto'>
            <div className='flex items-center justify-between border-b border-gray-300'>
                <h2 className='my-4 font-bold text-lg'>Update Coupon Information</h2>
                {infoLoading ?
                    <button disabled onClick={() => window.history.back()} className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                        Cancel
                    </button>
                    :
                    <button onClick={() => window.history.back()} className="font-medium outline-0 px-4 py-2 text-sm rounded-lg border border-gray-200 text-red-500 hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition-colors duration-500">
                        Cancel
                    </button>
                }
            </div>
            <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white mt-5 mb-8">
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="px-6 pt-8 flex-grow w-full h-full max-h-full">
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">1. Coupon Banner Image</label>
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
                                                <input {...register("logo")} onChange={e => PreviewImg(e)} className='image-upload-btn hidden' type="file" id='image-upload-btn' accept="image/*" />
                                            </div>
                                        </label>
                                        {upImg ?
                                            <div className="w-fit h-32 px-3 py-2 border border-gray-200 rounded-md">
                                                <img className='w-28 h-28' src={`data:image/*;base64,${upImg}`} alt="" id='ProfileImg' />
                                            </div>
                                            :
                                            <div className="w-fit h-32 px-3 py-2 border border-gray-200 rounded-md">
                                                <img className='w-28 h-28' src={`data:image/*;base64,${logo}`} alt="" id='ProfileImg' />
                                            </div>
                                        }
                                    </div>
                                    {errors.image && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.image.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">2. Campaign Name</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input defaultValue={title}  {...register("title")} className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0" type="text" placeholder="Coupon Title" />
                                    {errors.title && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.title.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">3. Campaign Code</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input defaultValue={couponCode} {...register("couponCode")} className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0" type="text" placeholder="Coupon Code" />
                                    {errors.couponCode && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.couponCode.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">4. Coupon Validity Time</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input defaultValue={endTime} {...register("endTime")} className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0" type="datetime-local" placeholder="Coupon validation end time" />
                                    {errors.endTime && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.endTime.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">5. Discount Percentage</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input defaultValue={discountPercentage} {...register("discountPercentage", { required: "* This field must have some value!!" })} className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0" type="number" placeholder="Discount percentage" />
                                    {errors.discountPercentage && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.discountPercentage.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">6. Minimum Amount</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <input defaultValue={minimumAmount} {...register("minimumAmount", { required: "* This field must have some value!!" })} className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0" type="number" placeholder="Minimum amount required" />
                                    {errors.minimumAmount && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.minimumAmount.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                                <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">7. Product Type</label>
                                <div className="col-span-8 sm:col-span-4">
                                    <select {...register("productType", { required: "* This field must have some value!!" })} className="block w-full px-3 py-1 text-sm rounded-md border border-gray-200 h-12 bg-gray-100 focus:bg-white outline-0">
                                        <option value={productType} hidden>{productType}</option>
                                        <option value="Grocery">Grocery</option>
                                        <option value="Foods">Foods</option>
                                        <option value="Cloths">Cloths</option>
                                        <option value="Health Care">Health Care </option>
                                        <option value="Medicine">Medicine </option>
                                        <option value="Books">Books </option>
                                        <option value="Bags">Bags</option>
                                        <option value="Sports &amp; Fitness">Sports &amp; Fitness </option>
                                        <option value="Home Accessories">Home Accessories</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Electronics">Electronics </option>
                                    </select>
                                    {errors.productType && <p className='text-red-600 font-light text-sm mt-1 mb-0 mx-0 w-fit rounded-sm'>{errors.productType.message}</p>}
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

export default UpdateCoupon;