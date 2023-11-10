"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../helpers/database"));
const User = database_1.default.define('users', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: false,
    },
    username: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    firstname: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('ADMIN', 'USER'),
        allowNull: false,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    newlyRegistered: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    token: {
        type: sequelize_1.DataTypes.TEXT,
    },
    token_expiration: {
        type: sequelize_1.DataTypes.DATE,
    },
    resetpwd_token: {
        type: sequelize_1.DataTypes.TEXT,
    },
    resetpwd_token_expiration: {
        type: sequelize_1.DataTypes.DATE,
    },
    changepassworddate: {
        type: sequelize_1.DataTypes.DATE,
    },
    lastlogined: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    timestamps: true,
});
exports.default = User;
//# sourceMappingURL=users.js.map