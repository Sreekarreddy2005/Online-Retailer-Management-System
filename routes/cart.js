const express = require("express");
const router = express.Router();
const db = require("../db");

// Add product to cart
router.post("/add", (req, res) => {
    const { productId, quantity } = req.body;
    const sql = "INSERT INTO cart (product_id, quantity) VALUES (?, ?)";
    db.query(sql, [productId, quantity], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Product added to cart", cartId: result.insertId });
    });
});

// Get all cart items
router.get("/", (req, res) => {
    const sql = `
        SELECT p.name, p.price, c.quantity, c.id as cart_id
        FROM cart c
        JOIN products p ON c.product_id = p.id
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;