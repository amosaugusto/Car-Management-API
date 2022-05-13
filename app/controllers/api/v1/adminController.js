const adminService = require("../../../services/adminService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "secret";

const createAdmin = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const admin = {
        email: req.body.email,
        password: hashedPassword,
    };
    try {
        await adminService.create(admin);
        res.status(201).json({
            message: "Admin Created",
            data: admin,
        });
    } catch (error) {
        res.status(400).send(error);
    }
};

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await adminService.findByEmail(email);
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
        role: "Admin"
    }, secretKey);

    res.json({
        user,
        token
    });
};
module.exports = {
    login,
    createAdmin
};