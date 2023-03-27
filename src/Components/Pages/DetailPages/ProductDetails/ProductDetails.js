import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(false);

    // Load Products.
    useEffect(() => {
        setLoading(true);
        fetch(`https://daily-bazar-95aq.onrender.com/product/${id}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
    }, [id]);


    const { _id, image, title, status, sku, price, quantity, description, type, tag } = products;
    return (
        <div className='px-6 mx-auto'>
            <h2 className='my-4 font-bold text-lg'>Product Details</h2>
            <div className='my-4'>
                {loading ?
                    <div className="text-center">
                        <div className="loading">
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                        </div>
                    </div>
                    :
                    <div className='flex items-start justify-start rounded-md'>
                        <div className='w-full'>
                            <img className='rounded-lg' src={`data:image/*;base64,${image}`} alt="" />
                        </div>
                        <div className='w-full text-left pl-8 py-8'>
                            <p className='font-sans text-sm text-gray-500 font-semibold'>
                                Status:
                                {status === "Show" ?
                                    <span className='text-green-500'> This product Showing</span>
                                    :
                                    <span className='text-red-500'> This product Hidden</span>
                                }
                            </p>
                            <h2 className='font-sans text-heading text-lg md:text-xl lg:text-2xl font-semibold dark:text-gray-400 mt-4'>{title}</h2>
                            <p className='font-sans uppercase font-bold text-gray-500 dark:text-gray-400 text-sm mt-1'>
                                SKU:
                                <span className='font-sans font-bold text-gray-500 dark:text-gray-500'> {sku}</span>
                            </p>
                            <h2 className='font-sans text-2xl font-bold mt-5'>${price}</h2>
                            <span className='flex mb-3 mt-2'>
                                {quantity > 0 ?
                                    <span className="font-sans inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                                        <span className="font-bold">In Stock</span>
                                    </span>
                                    :
                                    <span className="font-sans inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-800">
                                        <span className="font-bold">Stock Out</span>
                                    </span>
                                }
                                <span className='font-sans text-sm text-gray-500 dark:text-gray-400 font-medium pl-4'>Quantity: {quantity}</span>
                            </span>
                            <p className='font-sans text-sm leading-6 text-gray-500 dark:text-gray-400 md:leading-7'>{description}</p>
                            <div className='mt-4 mb-12'>
                                <p className="font-sans font-semibold py-1 text-gray-500 text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">Category: </span>{type}
                                </p>
                                <span className='font-sans'>
                                    {
                                        tag?.map(tg => <span className="bg-gray-200 mr-2 border-0 text-gray-500 rounded-full inline-flex items-center justify-center px-2 py-1 text-xs font-semibold mt-2 dark:bg-gray-700 dark:text-gray-300">
                                            {tg}
                                        </span>)
                                    }
                                </span>
                            </div>
                            <NavLink className='bg-green-600 hover:bg-green-700 text-sm text-white font-semibold font-sans px-4 py-2 duration-300 rounded-md' to={`/up-product/${_id}`}>
                                Edit Product
                            </NavLink>
                        </div>
                    </div>}
            </div>
        </div>
    );
};

export default ProductDetails;