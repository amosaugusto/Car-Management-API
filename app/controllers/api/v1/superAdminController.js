const superAdminService = require("../../../services/superAdminService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "secret";

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await superAdminService.findByEmail(email);
    if (!user) {
        return res.status(404).send({
            message: "Wrong Email",
        });
    }

    const status = await bcrypt.compare(password, user.password);
    if (!status) {
        return res.status(404).send({
            message: "Wrong Password",
        });
    }

    const token = jwt.sign({
        user,
        role: "Superadmin"
    }, secretKey);
    res.json({
        user,
        token
    });
};

module.exports = {
    login,
};