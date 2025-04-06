import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Cart.css";

export default function ViewCart() {
    const [cartItems, setCartItems] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:5000/api/cart")
            .then((response) => setCartItems(response.data))
            .catch((error) => {
                console.error("Error fetching cart items", error);
                // Fallback to localStorage if API fails
                const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
                setCartItems(storedCart);
            });
    }, []);
    
    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            {item.name} - ${item.price} x {item.quantity}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}