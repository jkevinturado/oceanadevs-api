"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../helpers/errors/customError");
const errorHandler = (error, req, res, next) => {
    if (error instanceof customError_1.CustomError) {
        const { statusCode, errors, logging } = error;
        console.log(`Handled Error:`);
        if (logging) {
            console.error(JSON.stringify({
                code: error.statusCode,
                errors: error.errors,
                stack: error.stack,
            }, null, 2));
        }
        return res.status(statusCode).send({ errors });
    }
    // Unhandled errors
    console.log(`Unhandled Error:`);
    console.error(JSON.stringify(error, null, 2));
    return res
        .status(500)
        .send({ errors: [{ message: 'Something went wrong' }] });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map