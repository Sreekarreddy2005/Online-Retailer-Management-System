import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewCart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = () => {
        axios.get("http://localhost:5000/api/cart")
            .then((response) => setCartItems(response.data))
            .catch((error) => console.error("Error fetching cart items", error));
    };

    // Function to clear cart
    const clearCart = () => {
        axios.delete("http://localhost:5000/api/cart/clear")
            .then(() => {
                setCartItems([]); // Update UI
                alert("Cart has been cleared!");
            })
            .catch((error) => console.error("Error clearing cart", error));
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <button onClick={clearCart} style={clearCartButtonStyle}>Clear Cart</button>
                </>
            )}
        </div>
    );
}

// CSS for Clear Cart button
const clearCartButtonStyle = {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
};

