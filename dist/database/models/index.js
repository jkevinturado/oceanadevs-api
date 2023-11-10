"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../../utils/config");
const database_1 = __importDefault(require("../../helpers/database"));
const users_1 = __importDefault(require("./users"));
users_1.default.build();
const db = {
    Sequelize: sequelize_1.Sequelize,
    sequelize: database_1.default,
};
// db.Sequelize.ini;
const dbInit = async () => {
    try {
        const isDev = config_1.SERVER_ENV === 'development' || config_1.SERVER_ENV === 'local';
        await db.sequelize.sync({ alter: isDev });
        console.log('Database Connected');
    }
    catch (error) {
        console.log('Error: Database connection: ', error);
    }
};
exports.default = dbInit;
//# sourceMappingURL=index.js.map