const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

// Import routes
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const userRoutes = require("./routes/users");
const retailerRoutes = require("./routes/retailers");
const loginRoutes = require("./routes/login");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/retailers", retailerRoutes);
app.use("/login", loginRoutes);

// API to clear the cart
app.delete("/api/cart/clear", (req, res) => {
    const sql = "DELETE FROM cart";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error clearing cart:", err);
            return res.status(500).json({ message: "Failed to clear cart" });
        }
        res.json({ message: "Cart cleared successfully" });
    });
});

// Default route
app.get("/", (req, res) => {
    res.send("Online Retailer Management System Backend Running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
