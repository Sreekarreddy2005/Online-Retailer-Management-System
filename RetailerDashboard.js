import React, { useState } from "react";
import axios from "axios";

export default function RetailerDashboard() {
    const [product, setProduct] = useState({ name: "", description: "", price: "" });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/products/add", product);
            alert(response.data.message);
        } catch (error) {
            console.error("Error adding product", error);
        }
    };

    return (
        <div>
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
                <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}
