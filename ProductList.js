import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/products")
            .then(response => setProducts(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <div className="grid grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="font-bold">${product.price}</p>
                        <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
