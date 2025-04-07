// models/user.js
const db = require('../db');
const bcrypt = require('bcrypt');

async function findUserByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM customers WHERE email = ?', [email]);
    return rows[0];
}

async function createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute('INSERT INTO customers (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
    return result.insertId;
}

async function comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { findUserByEmail, createUser, comparePassword };