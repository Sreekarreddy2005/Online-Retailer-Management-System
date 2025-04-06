import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BrowseProducts() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products", error));
    }, []);

    const addToCart = async (productId) => {
        try {
            await axios.post("http://localhost:5000/api/cart/add", { productId, quantity: 1 });
            alert("Product added to cart!");
        } catch (error) {
            console.error("Error adding to cart", error);
        }
    };

    return (
        <div>
            <h2>Browse Products</h2>
            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <button onClick={() => addToCart(product.id)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
}
