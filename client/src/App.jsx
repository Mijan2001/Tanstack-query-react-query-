// App.jsx
import React from 'react';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/addProduct';

const App = () => {
    return (
        <div>
            <div className="flex justify-center">
                <AddProduct />

                <ProductList />

                <ProductDetails id={1} />
            </div>
        </div>
    );
};

export default App;
