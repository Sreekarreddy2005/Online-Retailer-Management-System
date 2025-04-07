const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    // EXTREMELY INSECURE BYPASS FOR DEVELOPMENT - REMOVE COMPLETELY LATER
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === 'bypassAdminToken') { // Check for a specific bypass token
        req.user = { role: 'admin' };
        return next();
    }

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: 'Invalid token.' });
        }
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Unauthorized: Admin role required.' });
    }
};

module.exports = { authenticateToken, isAdmin };