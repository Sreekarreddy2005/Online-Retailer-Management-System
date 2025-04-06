// backend/routes/login.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

router.post("/", async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        // Add logging to debug
        console.log(`Login attempt: ${email}, role: ${role}`);
        
        // Determine table to query based on role
        const table = role === "retailer" ? "retailers" : "customers";
        const nameField = role === "retailer" ? "business_name as name" : "name";
        
        const query = `SELECT id, ${nameField}, email, password FROM ${table} WHERE email = ?`;
        console.log("Query:", query);
        
        // Query the database
        db.query(query, [email], async (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: err.message });
            }
            
            console.log(`User found: ${results.length > 0}`);
            
            if (results.length === 0) {
                return res.status(401).json({ error: "Email not found" });
            }
            
            const user = results[0];
            console.log("User found:", { id: user.id, email: user.email });
            
            try {
                // Compare passwords
                const isMatch = await bcrypt.compare(password, user.password);
                console.log("Password match:", isMatch);
                
                if (!isMatch) {
                    return res.status(401).json({ error: "Invalid password" });
                }
                
                // Create JWT token
                const token = jwt.sign(
                    { id: user.id, email: user.email, role },
                    process.env.JWT_SECRET || "MySuperSecretKey12345!",
                    { expiresIn: "1h" }
                );
                
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role
                    }
                });
            } catch (bcryptError) {
                console.error("Bcrypt error:", bcryptError);
                return res.status(500).json({ error: "Password comparison failed" });
            }
        });
    } catch (error) {
        console.error("General error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;