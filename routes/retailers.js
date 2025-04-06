// backend/routes/retailers.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

// Create retailers table if it doesn't exist
db.query(`
    CREATE TABLE IF NOT EXISTS retailers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        business_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    )
`, (err) => {
    if (err) console.error("Error creating retailers table:", err);
});

// Register a new retailer
router.post("/register", async (req, res) => {
    try {
        const { businessName, email, password } = req.body;
        
        // Check if retailer already exists
        db.query("SELECT * FROM retailers WHERE email = ?", [email], async (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            
            if (results.length > 0) {
                return res.status(400).json({ error: "Email already in use" });
            }
            
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Insert new retailer
            const sql = "INSERT INTO retailers (business_name, email, password) VALUES (?, ?, ?)";
            db.query(sql, [businessName, email, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                
                res.status(201).json({ message: "Retailer registered successfully" });
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;