const express = require("express");
const router = express.Router();
const db = require("../db"); // Assuming db.js handles MySQL connection

// Add a new product (Retailer functionality)
router.post("/add", (req, res) => {
    const { name, description, price } = req.body;
    const sql = "INSERT INTO products (name, description, price) VALUES (?, ?, ?)";
    db.query(sql, [name, description, price], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Product added successfully", productId: result.insertId });
    });
});

// Get all products (User browsing functionality)
router.get("/", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;
