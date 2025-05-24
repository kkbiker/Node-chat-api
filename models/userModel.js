// const db = require('../config/db');

// exports.getAllUsers = async () => {
//     const result = await db.query('SELECT id, name FROM users;');
//     return result.rows;
// };

// exports.createUser = async (name) => {
//     await db.query('INSERT INTO users (name) VALUES ($1);', [name]);
// };

// exports.getUser = async (name) => {
//     const result = ('SELECT id, name FROM users WHERE name = ($1);', [name]);
// };

import sql from '../config/db.js';

export const getAllUsers = async () => {
    const rows = await sql`SELECT id, name FROM users;`;
    return rows;
};

export const createUser = async (name) => {
    await sql`INSERT INTO users (name) VALUES (${name});`;
};

export const getUser = async (name) => {
    const rows = await sql`SELECT id, name FROM users WHERE name = (${name});`;
    return rows[0];
};
