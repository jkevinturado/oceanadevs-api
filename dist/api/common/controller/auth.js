"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.recoverPassword = exports.createPassword = exports.getUserSession = exports.logout = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const config_1 = require("../../../utils/config");
const BadRequestError_1 = __importDefault(require("../../../helpers/errors/BadRequestError"));
const users_1 = __importDefault(require("../../../database/models/users"));
const login = async (req, res, next) => {
    try {
        const { username, password: passwordField } = req.body;
        //function for validation
        console.log(username, passwordField);
        const user = await users_1.default.findOne({
            raw: true,
            attributes: [
                'id',
                'email',
                'username',
                'password',
                'firstname',
                'lastname',
                'type',
                'isActive',
            ],
            where: { username, isActive: true },
        });
        console.log(user);
        if (!user)
            throw new BadRequestError_1.default({
                code: 404,
                message: 'User not found',
                logging: true,
            });
        console.log(user.password, await bcrypt_1.default.hash(passwordField, 12));
        const passwordConfirm = await bcrypt_1.default.compare(passwordField, user.password);
        if (!passwordConfirm)
            throw new BadRequestError_1.default({
                code: 404,
                message: 'User not found, Incorrect password',
                logging: true,
            });
        let token = jsonwebtoken_1.default.sign({ email: username, userId: user.id }, config_1.CONFIG_JWT.secret, config_1.CONFIG_JWT.option);
        const token_expiration = (0, moment_1.default)()
            .add(config_1.CONFIG_JWT.expiration / 60, 'minutes')
            .format('YYYY-MM-DD HH:mm:ss');
        await users_1.default.update({
            token,
            token_expiration: new Date(token_expiration),
            lastlogined: new Date(),
        }, { where: { id: user.id } });
        res.status(200).json({ id: user.id, token });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        const { id } = req.params;
        await users_1.default.update({ token: null, token_expiration: null }, { where: { id } });
        res.status(200).json({ status: true });
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
const getUserSession = async (req, res, next) => {
    try {
        const { token } = req.params;
        const user = await users_1.default.findOne({
            raw: true,
            attributes: ['id', 'username', 'token_expiration', 'lastlogined'],
            where: {
                token,
                token_expiration: {
                    [sequelize_1.Op.gt]: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                },
            },
        });
        console.log(user);
        if (!user)
            throw new BadRequestError_1.default({
                code: 401,
                message: 'User session expired',
                logging: true,
            });
        res.status(200).json({ status: true });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserSession = getUserSession;
const createPassword = async (req, res, next) => {
    try {
        res.status(200).json({ status: true });
    }
    catch (error) {
        next(error);
    }
};
exports.createPassword = createPassword;
const recoverPassword = async (req, res, next) => {
    try {
        //verify the userid if existing and get user info
        //create the token and update the user token database
        //send email with link and token for reset password
        res.status(200).json({ status: true });
    }
    catch (error) {
        next(error);
    }
};
exports.recoverPassword = recoverPassword;
const resetPassword = async (req, res, next) => {
    try {
        //verify if the token is correct and reset the password
        res.status(200).json({ status: true });
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=auth.js.map