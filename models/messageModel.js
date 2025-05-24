// const db = require('../config/db');

// exports.getAllMessage = async () => {
//     const result = await db.query('SELECT message FROM messages ORDER BY id ASC;');
//     return result.rows;
// };

// exports.saveMessage = async (message) => {
//     db.query('INSERT INTO messages (message) VALUES ($1);', [message]);
// };

import sql from '../config/db.js';

export const getAllMessage = async () => {
    const rows = await sql`SELECT message FROM messages ORDER BY id ASC;`;
    return rows;
}

export const saveMessage = async (message) => {
    await sql`INSERT INTO messages (message) VALUES (${message});`;
};
