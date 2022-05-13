const superAdminService = require("../../../services/superAdminService");
const adminService = require("../../../services/adminService");
const memberService = require("../../../services/memberService");
const jwt = require("jsonwebtoken");
const secretKey = "secret";

const authorize = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split(" ")[1];
        const tokenPayload = jwt.verify(token, secretKey);
        if (tokenPayload.role === "Superadmin") {
            req.user = await superAdminService.findById(tokenPayload.user.id);
        } else if (tokenPayload.role === "Admin") {
            req.user = await adminService.findById(tokenPayload.user.id);
        } else {
            req.user = await memberService.findById(tokenPayload.user.id);
        }
        next();
    } catch (error) {
        res.status(401).send({
            message: "Unauthorized",
        });
        console.log(error.message);
    }
};

const superAdminAuthorize = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split(" ")[1];
        const tokenPayload = jwt.verify(token, secretKey);
        if (tokenPayload.role !== "Superadmin") {
            throw new Error();
        }
        next();
    } catch (error) {
        res.status(401).send({
            message: "Unauthorized",
        });
    }
};

const adminAuthorize = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split(" ")[1];
        const tokenPayload = jwt.verify(token, secretKey);
        if (tokenPayload.role === "Superadmin") {
            req.user = await superAdminService.findById(tokenPayload.user.id);
        } else if (tokenPayload.role === "Admin") {
            req.user = await adminService.findById(tokenPayload.user.id);
        } else {
            throw new Error()
        }
        next();
    } catch (error) {
        res.status(401).send({
            message: "Unauthorized",
        });
    }
};

const whoAmI = (req, res) => {
    res.status(200).json(req.user);
}

module.exports = {
    authorize,
    whoAmI,
    superAdminAuthorize,
    adminAuthorize
};