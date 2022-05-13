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

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await memberService.findByEmail(email);
    if (!user) {
        return res.status(404).send({
            message: "Wrong Email",
        })
    }

    const status = await bcrypt.compare(password, user.password);
    if (!status) {
        return res.status(404).send({
            message: "Wrong Password",
        });
    }

    const token = jwt.sign({
        user
    }, secretKey);
    res.json({
        user,
        token
    });
};

module.exports = {
    login,
    createMember
};