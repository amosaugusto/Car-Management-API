const superAdminService = require("../../../services/superAdminService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "secret";

const createSuperAdmin = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const superAdmin = {
        email: req.body.email,
        password: hashedPassword,
    };
    try {
        await superAdminService.create(superAdmin);
        res.status(201).json({
            message: "SuperAdmin Created",
            data: superAdmin,
        });
    } catch (error) {
        res.status(400).send(error);
    }
};

const login = async (req, res) => {
    const email = req.body.email;
    const password = hashedPassword;

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
    createSuperAdmin
};