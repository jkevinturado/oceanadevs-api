"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_JWT = exports.CONFIG_URLS = exports.CONFIG_DB = exports.SERVER_PORT = exports.SERVER_ENV = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const SERVER_ENV = process.env.ENV;
exports.SERVER_ENV = SERVER_ENV;
const SERVER_PORT = process.env.PORT;
exports.SERVER_PORT = SERVER_PORT;
const CONFIG_DB = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false,
    dialect: process.env.DB_DIALECT,
};
exports.CONFIG_DB = CONFIG_DB;
const CONFIG_URLS = {
    frontend: process.env.FRONTEND_URL,
};
exports.CONFIG_URLS = CONFIG_URLS;
const CONFIG_JWT = {
    secret: process.env.JWT_SECRET || 'TESTKEY',
    option: { expiresIn: parseInt(process.env.JWT_EXPIRATION || '3600') },
    expiration: parseInt(process.env.JWT_EXPIRATION || '3600') || 3600,
};
exports.CONFIG_JWT = CONFIG_JWT;
//# sourceMappingURL=config.js.map