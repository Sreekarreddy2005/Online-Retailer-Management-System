import React, { useState } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";

const UserDashboard = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const updateCart = (updatedCart) => {
        setCart(updatedCart);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">User Dashboard</h2>
            <ProductList addToCart={addToCart} />
            <Cart cart={cart} updateCart={updateCart} />
        </div>
    );
};

export default UserDashboard;
