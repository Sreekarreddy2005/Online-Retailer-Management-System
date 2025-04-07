// models/admin.js
const db = require('../db');
const bcrypt = require('bcrypt');

async function findAdminByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM admins WHERE email = ?', [email]);
    return rows[0];
}

async function createAdmin(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute('INSERT INTO admins (email, password, role) VALUES (?, ?, ?)', [email, hashedPassword, 'admin']); // Assuming an 'admin' role
    return result.insertId;
}

async function comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { findAdminByEmail, createAdmin, comparePassword };