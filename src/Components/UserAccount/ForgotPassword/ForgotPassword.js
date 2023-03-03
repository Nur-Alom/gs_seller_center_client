import React from 'react';
import { useForm } from 'react-hook-form';
import logo from '../../Images/logo.jpg';

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const loading = false;

    // User Login Function.
    const onSubmit = data => {
        console.log(data);
    };


    return (
        <div className='text-center my-auto lg:my-12 md:my-60'>
            <div className="flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src={logo}
                            alt=""
                        />
                        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Forgot Your Password Hare!
                        </h2>
                        <p className="mt-2 text-center text-sm font-bold text-gray-600">
                            GS-SELLER-CENTER
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="">
                            <div className='my-6 text-left'>
                                <label htmlFor="" className='text-sm font-bold items-start'>
                                    Your Email Address
                                </label>
                                <input
                                    {...register("email", { required: "Email is required*" })}
                                    type="email"
                                    autoComplete="email"
                                    className={errors.email ? "relative block w-full appearance-none rounded border border-red-300 px-3 py-2 mt-2 text-gray-900 placeholder-red-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm" : "relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                                    placeholder="Email Address"
                                />
                                {errors.email && <span className='text-sm text-red-600 mt-1'>{errors.email.message}</span>}
                            </div>
                            {/* <div className='my-2 text-left'>
                                <label htmlFor="" className='text-sm font-bold items-start'>
                                    New Password
                                </label>
                                <input
                                    {...register("new_password")}
                                    type="password"
                                    required
                                    className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="New Password"
                                />
                            </div>
                            <div className='my-2 text-left'>
                                <input
                                    {...register("new_password")}
                                    type="password"
                                    required
                                    className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Re-Type New Password"
                                />
                        </div>*/}
                        </div>
                        <div className='flex gap-4'>
                            <button onClick={() => window.history.back()} className="w-full bg-green-500 text-sm text-white py-2 px-4 rounded-md hover:bg-green-600 duration-300">
                                Back to login
                            </button>
                            {loading ?
                                <button
                                    type="submit"
                                    className="w-full justify-center items-center inline-flex rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 outline-0">
                                    Forgot Password
                                    <svg class="ml-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </button>
                                :
                                <button
                                    type="submit"
                                    className="w-full justify-center items-center inline-flex rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 outline-0">
                                    Forgot Password
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;