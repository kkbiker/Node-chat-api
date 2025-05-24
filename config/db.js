// require("dotenv").config();

// const { Pool } = require('pg');

// const Postgres = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT
// });

// module.exports = Postgres;

import 'dotenv/config';
import postgres from 'postgres';

const connection = process.env.SUPABASE_URL;
const sql = postgres(connection);

export default sql;
