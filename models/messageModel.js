const sql = require('../config/db');

exports.getAllMessage = async () => {
    const rows = await sql`SELECT message FROM messages ORDER BY id ASC;`;
    return rows;
}

exports.saveMessage = async (message) => {
    await sql`INSERT INTO messages (message) VALUES (${message});`;
};
