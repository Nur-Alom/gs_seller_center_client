import React from 'react';
import Header from '../Header/Header';

const Products = () => {
    return (
        <div className='flex flex-col flex-1 w-full h-screen'>
            <Header />
            <div className='h-full overflow-y-auto bg-slate-50'>
                <div className='px-6 mx-auto'>
                    <h2 className='my-4 font-bold text-lg'>Products</h2>
                    <div className='mb-6'>
                        <div className='bg-white py-2 px-4 my-4 rounded-md border border-gray-200'>
                            <form className='items-center grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
                                <div className='bg-white'>
                                    <input className='border border-gray-300 bg-gray-200 px-2 py-2 rounded my-4 outline-0' type="text" placeholder='Search by Product Name' />
                                </div>
                                <div className='bg-gray-200 rounded border border-gray-300 py-2 outline-0'>
                                    <select className='bg-gray-200 px-2 rounded outline-0 w-full' name="" id="">
                                        <option value="All" hidden>Category</option>
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                        <option value="">5</option>
                                    </select>
                                </div>
                                <div className='bg-gray-200 rounded border border-gray-300 py-2 outline-0'>
                                    <select className='bg-gray-200 px-2 rounded outline-0 w-full' name="" id="">
                                        <option value="All" hidden>Price</option>
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                        <option value="">5</option>
                                    </select>
                                </div>
                                <div>
                                    <button className='bg-green-400 text-white font-bold w-full py-2 rounded-md' type="submit">
                                        Add Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='bg-white w-full px-4 py-4 rounded border border-gray-200'>
                        <div className='bg-white '>
                            <form className='flex items-center' action="">
                                <input className='w-3/4' type="file" name="" id="" />
                                <div className=''>
                                    <button className='bg-gray-400 text-white px-3 py-2 rounded mx-2'>Upload</button>
                                    <button className='bg-green-400 text-white px-3 py-2 rounded mx-2'>Download</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;