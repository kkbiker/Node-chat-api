require('dotenv').config();
const transporter = require('../config/mail');
const ejs = require('ejs');
const path = require('path');
const { readFile } = require('fs/promises')

exports.sendmail = async (req, res) => {
    const { email } = req.body;

    const code = Math.floor(100000 + (Math.random() * 900000));
    
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "認証コード送信 -Vision Azzuro-",
            html: `<h2>認証番号</h2><p>以下の認証コードをご入力ください</p><h3>${code}</h3>`,
        });

        res.status(200).json({code: code});
    } catch (err) {
        res.status(500).json({err: "送信に失敗しました。"})
    }
}
