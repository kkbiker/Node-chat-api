const bcrypt = require('bcrypt');
const sql = require('../config/db');

exports.getAllUsers = async () => {
    const rows = await sql`SELECT id, name FROM users;`;
    return rows;
};

exports.createUser = async (req, res) => {
    const { companyName, name, email, password, companyId } = req.body;

    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        if (companyId) {
            const rows = await sql`SELECT company_id FROM companies WHERE company_id = ${companyId};`;
            if (rows.length === 0) {
                return res.status(500).json({ message: "会社が登録されていません。" });
            }

            await sql`INSERT INTO users (name, email, password, company_id) VALUES (${name}, ${email}, ${hashPassword}, ${companyId});`;
            return res.status(201).json({ message: "ユーザー登録成功" });
        }

        if (!companyName || companyName.trim() === "") {
            return res.status(400).json({ message: "会社名が空です。" });
        }

        const exists = await sql`SELECT name FROM companies WHERE name = ${companyName};`;
        if (exists.length !== 0) {
            return res.status(409).json({ message: "会社が既に登録されています。" });
        }

        const rows = await sql`INSERT INTO companies (name) VALUES (${companyName}) RETURNING company_id;`;
        const newCompanyId = rows[0].company_id;

        await sql`INSERT INTO users (name, email, password, is_master, company_id) VALUES (${name}, ${email}, ${hashPassword}, true, ${newCompanyId});`;
        res.status(201).json({ message: "ユーザー登録成功" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "ユーザー登録失敗", err: err });
    }
};

exports.getUser = async (email) => {
    const rows = await sql`SELECT id, name, email, password, is_master, company_id, create_at FROM users WHERE email = ${email};`;
    return rows[0];
};
