import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// sever er database theke json data fetch kora========
// http://localhost:3000/products/1 ei url e hit korar jonno ei vabe likhte pari

const retrieveProducts = async ({ queryKey }) => {
    const response = await axios.get(
        `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
    );
    return response.data;
};

const ProductDetails = ({ id }) => {
    const {
        data: product,
        error,
        isLoading
    } = useQuery({
        queryKey: ['products', id], // queryKey is a unique identifier for the query
        queryFn: retrieveProducts, // queryFn is the function that will be called to fetch the data
        refetchInterval: 1000 // refetchInterval is the interval in milliseconds at which the query will be refetched
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="w-1/5 flex flex-col bg-white shadow-md p-4 rounded-lg">
            <div className="bg-gray-200">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="p-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    {product.title}
                </h1>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-semibold text-green-600">
                        ${product.price}
                    </span>
                    <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
