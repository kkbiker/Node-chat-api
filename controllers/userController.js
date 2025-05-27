const bcrypt = require('bcrypt');
const userModel = require('../models/userModel.js');

exports.getAllUser = async (req, res) => {
    const users = await userModel.getAllUsers();
    res.json(users);
};

exports.createUser = async (req, res) => {
    await userModel.createUser(req, res);
};

exports.getUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.getUser(email);

    if (!user) {
        console.log("ユーザーが存在しません。");
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            console.error('照準エラー:', err);
            return;
        }

        if (result) {
            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                companyId: user.company_id,
                is_master: user.is_master,
                create_at: user.create_at
            });
        } else {
            console.log("ログイン失敗");
        }
    });
}
