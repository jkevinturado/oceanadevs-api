"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getAllUser = exports.getUserById = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const common_1 = require("../../../helpers/common");
const BadRequestError_1 = __importDefault(require("../../../helpers/errors/BadRequestError"));
const users_1 = __importDefault(require("../../../database/models/users"));
const pagination_1 = require("../../../helpers/pagination");
const createUser = async (req, res, next) => {
    try {
        //validation here
        const { username, email, firstname, lastname, type } = req.body;
        const userDetails = {
            username,
            email,
            firstname,
            lastname,
            type: type || 'USER',
        };
        const password = `${firstname.trim().toLowerCase().slice(0, 2)}${lastname
            .trim()
            .toLowerCase()
            .slice(0, 2)}${(0, common_1.getRandomNumberByLength)(9999)}`;
        const existingUser = await users_1.default.findOne({ where: { username } });
        const hashPwd = await bcrypt_1.default.hash(password, 12);
        if (existingUser) {
            throw new BadRequestError_1.default({
                code: 409,
                message: 'Username already exists',
                logging: true,
            });
        }
        const userData = { ...userDetails, password: hashPwd };
        console.log(userData);
        await users_1.default.create(userData);
        res.status(201).json({ status: true, user: { ...userData, password } });
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await users_1.default.findByPk(id);
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await users_1.default.update(data, { where: { id } });
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
const getAllUser = async (req, res, next) => {
    try {
        const { page, rowsperpage } = req.params;
        const pageInt = parseInt(page);
        const rowsperpageInt = parseInt(rowsperpage);
        const { limit, offset } = (0, pagination_1.getPagination)(pageInt, rowsperpageInt);
        const usersData = await users_1.default.findAndCountAll({
            raw: true,
            order: [['createdAt', 'DESC']],
            offset,
            limit,
        });
        //sequelize must be findAndCountAll
        const data = (0, pagination_1.getPagingData)(usersData, pageInt, rowsperpageInt);
        console.log(data);
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUser = getAllUser;
//# sourceMappingURL=user.js.map