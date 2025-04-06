const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Change if you use a different user
    password: "Sreekar@2005", // Add your MySQL password if applicable
    database: "online_retailer",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

module.exports = db;
