import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// sever er database theke json data fetch kora========
const retrieveProducts = async ({ queryKey }) => {
    const response = await axios.get(`http://localhost:3000/${queryKey[0]}`);
    return response.data;
};

const ProductList = () => {
    const [page, setPage] = useState(1);
    const {
        data: products,
        error,
        isLoading
    } = useQuery({
        queryKey: ['products'], // queryKey is a unique identifier for the query
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
        <div className="w-3/5 flex flex-col bg-white shadow-md p-4 rounded-lg">
            <h1 className="text-2xl my-2">Product List</h1>
            <ul className="flex flex-wrap justify-center items-center">
                {products &&
                    products.map(product => (
                        <li
                            key={product.id}
                            className="flex flex-col items-center m-2 rounded-sm"
                        >
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="object-cover h-32 w-full rounded-sm"
                            />
                            <p className="text-lg text-center my-2">
                                {product.title}
                            </p>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default ProductList;
