import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useFirebase from '../../Hooks/useFirebase';
import logo from '../../Images/logo.jpg';

const Login = () => {
    const { loginUser, loading } = useFirebase();
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // User Login Function.
    const onSubmit = data => {
        loginUser(data?.email, data?.password, location, navigate);
    };


    return (
        <div className='text-center lg:my-12 md:my-64'>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src={logo}
                            alt=""
                        />
                        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-sm font-bold text-gray-600">
                            GS-SELLER-CENTER
                        </p>
                    </div>
                    <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="">
                            <div className="text-left mb-2">
                                <label htmlFor="" className="text-sm font-bold">
                                    Email address
                                </label>
                                <input
                                    {...register("email", { required: "Enter Your Email Please*" })}
                                    type="email"
                                    autoComplete="email"
                                    className="relative block w-full appearance-none rounded-none rounded-t-sm border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                />
                                {errors.email && <span className='text-sm text-red-600 mt-1'>{errors.email.message}</span>}
                            </div>
                            <div className="text-left mb-2">
                                <label htmlFor="" className="text-sm font-bold">
                                    Password
                                </label>
                                <input
                                    {...register("password", { required: "Enter Your Password Please*" })}
                                    type="password"
                                    autoComplete="current-password"
                                    className="relative block w-full appearance-none rounded-none rounded-b-sm border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                                {errors.password && <span className='text-sm text-red-600 mt-1'>{errors.password.message}</span>}
                            </div>
                        </div>
                        <div className="text-sm text-right">
                            <NavLink to="/forgot_password" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </NavLink>
                        </div>
                        <div>
                            {loading ?
                                <button type="submit" className="w-full justify-center items-center inline-flex rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 outline-0">
                                    Sign in
                                    <svg class="ml-2 h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </button>
                                :
                                <button type="submit" className="w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 outline-0 ">
                                    Sign in
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;