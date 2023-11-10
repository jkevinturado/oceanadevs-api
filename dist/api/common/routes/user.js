"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controller/user");
const userRoutes = (0, express_1.Router)();
//get all user
userRoutes.get('/', user_1.getAllUser);
//get user by id
userRoutes.get('/:id', user_1.getUserById);
//create user
userRoutes.post('/', user_1.createUser);
//update user
userRoutes.put('/:id', user_1.updateUser);
//delete user
userRoutes.delete('/:id');
exports.default = userRoutes;
//# sourceMappingURL=user.js.map