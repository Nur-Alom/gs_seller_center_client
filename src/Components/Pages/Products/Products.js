import React from 'react';
import Header from '../Header/Header';

const Products = () => {
    return (
        <div className='flex flex-col flex-1 w-full h-screen'>
            <Header />
            <div className='h-full overflow-y-auto'>
                <div className='px-6 mx-auto'>
                    <h2>Hello From Products</h2>
                </div>
            </div>
        </div>
    );
};

export default Products;