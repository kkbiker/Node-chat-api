require('dotenv').config();
const transporter = require('../config/mail');
const ejs = require('ejs');
const path = require('path');
const { readFile } = require('fs/promises')

exports.sendmail = async (req, res) => {
    const { email } = req.body;

    // const templatePath = path.join(__dirname, '../templates/mailtemplate.ejs');
    // const template = await readFile(templatePath, 'utf-8');

    const code = Math.floor(100000 + (Math.random() * 900000));

    // const htmlcontent = ejs.render(template, {code});
    
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "認証コード送信 -Vision Azzuro-",
            text: code,
        });

        res.status(200).json({code: code});
    } catch (err) {
        res.status(500).json({err: "送信に失敗しました。"})
    }
}
