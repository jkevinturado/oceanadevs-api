"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const authRoute = (0, express_1.Router)();
authRoute.post('/login', auth_1.login);
authRoute.put('/logout/:id', auth_1.logout);
authRoute.get('/usersession/:token', auth_1.getUserSession);
authRoute.post('/createpassword/:username', auth_1.createPassword);
authRoute.post('/changepassword/:username', auth_1.createPassword);
authRoute.get('/recoverpassword', auth_1.recoverPassword);
authRoute.post('/resetpassword/:token', auth_1.resetPassword);
exports.default = authRoute;
//# sourceMappingURL=auth.js.map