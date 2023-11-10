"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const config_1 = require("./utils/config");
//database
const index_1 = __importDefault(require("./database/models/index"));
//api
const index_2 = __importDefault(require("./api/common/routes/index"));
//middleware
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use('/api', index_2.default);
app.use(errorHandler_1.default);
app.listen(config_1.SERVER_PORT, () => {
    (0, index_1.default)();
    console.log(`server listing to port ${config_1.SERVER_PORT} | environment: ${config_1.SERVER_ENV}`);
});
//# sourceMappingURL=index.js.map