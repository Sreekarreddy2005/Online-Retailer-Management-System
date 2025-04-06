// backend/routes/users.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("User registration attempt:", { name, email });
        
        // Check if user already exists
        db.query("SELECT * FROM customers WHERE email = ?", [email], async (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: err.message });
            }
            
            if (results.length > 0) {
                console.log("Email already exists");
                return res.status(400).json({ error: "Email already in use" });
            }
            
            // Hash password
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                console.log("Password hashed successfully");
                
                // Insert new user
                const sql = "INSERT INTO customers (name, email, password) VALUES (?, ?, ?)";
                db.query(sql, [name, email, hashedPassword], (err, result) => {
                    if (err) {
                        console.error("Error inserting user:", err);
                        return res.status(500).json({ error: err.message });
                    }
                    
                    console.log("User registered successfully:", result.insertId);
                    res.status(201).json({ 
                        message: "User registered successfully",
                        userId: result.insertId 
                    });
                });
            } catch (hashError) {
                console.error("Error hashing password:", hashError);
                return res.status(500).json({ error: "Could not secure password" });
            }
        });
    } catch (error) {
        console.error("General error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;