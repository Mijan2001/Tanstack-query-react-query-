import React, { useState } from 'react';

// for tanstacck query for Mutation(post , put , patch , delele)=========
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const AddProduct = () => {
    const queryClient = useQueryClient();
    const [state, setState] = useState({
        title: '',
        description: '',
        price: '',
        rating: '',
        thumbnail: ''
    });

    // for tanstack query for Mutation(post , put , patch , delele)=========
    const mutation = useMutation({
        mutationFn: newProduct =>
            axios.post('http://localhost:3000/products', newProduct),
        onSuccess: (data, variables, context) => {
            console.log('context : ', context);
            queryClient.invalidateQueries(['products']);
        },
        onMutate: variables => {
            return { greeting: 'Say Hello' };
        }
    });

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        setState({ ...state, [name]: value });
    };

    const submitData = event => {
        event.preventDefault();
        // random ekta id create korlma============
        const newData = { ...state, id: crypto.randomUUID().toString() };
        mutation.mutate(newData); // uporer mutation function call korlam
        setState({
            title: '',
            description: '',
            price: '',
            rating: '',
            thumbnail: ''
        });
    };

    if (mutation.isLoading) {
        return <div>Loading...</div>;
    }

    if (mutation.isError) {
        return <div>Error: {mutation.error.message}</div>;
    }

    return (
        <div className="w-1/5 flex flex-col bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
                Add a Product
            </h2>
            <form onSubmit={submitData}>
                <div className="flex flex-col mb-4">
                    <label
                        htmlFor="title"
                        className="mb-2 text-sm font-medium text-gray-600"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={state.title}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label
                        htmlFor="description"
                        className="mb-2 text-sm font-medium text-gray-600"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={state.description}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label
                        htmlFor="price"
                        className="mb-2 text-sm font-medium text-gray-600"
                    >
                        Price
                    </label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={state.price}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label
                        htmlFor="rating"
                        className="mb-2 text-sm font-medium text-gray-600"
                    >
                        Rating
                    </label>
                    <input
                        type="text"
                        id="rating"
                        name="rating"
                        value={state.rating}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label
                        htmlFor="thumbnail"
                        className="mb-2 text-sm font-medium text-gray-600"
                    >
                        Thumbnail
                    </label>
                    <input
                        type="text"
                        id="thumbnail"
                        name="thumbnail"
                        value={state.thumbnail}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
