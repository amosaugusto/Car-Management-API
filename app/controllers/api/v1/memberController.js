const memberService = require("../../../services/memberService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "secret";

const createMember = async (req, res) => {
    const existedUser = await memberService.findByEmail(req.body.email);
    if (existedUser) {
        return res.status(400).send({
            message: "Email has been used",
        });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const member = {
        email: req.body.email,
        password: hashedPassword,
    };
    try {
        await memberService.create(member);
        res.status(201).json({
            message: "Member Created",
            data: member,
        });
    } catch (error) {
        res.status(400).send(erro);
    }
};

module.exports = {
    login,
    createMember
};