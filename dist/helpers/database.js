"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../utils/config");
const db = new sequelize_1.Sequelize(config_1.CONFIG_DB);
exports.default = db;
//# sourceMappingURL=database.js.map