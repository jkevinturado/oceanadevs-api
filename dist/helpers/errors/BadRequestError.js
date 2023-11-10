"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("./customError");
class BadRequestError extends customError_1.CustomError {
    constructor(params) {
        const { code, message, logging } = params || {};
        super(message || 'Bad request');
        this._code = code || BadRequestError._statusCode;
        this._logging = logging || false;
        this._context = params?.context || {};
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    get errors() {
        return [{ message: this.message, context: this._context }];
    }
    get statusCode() {
        return this._code;
    }
    get logging() {
        return this._logging;
    }
}
BadRequestError._statusCode = 400;
exports.default = BadRequestError;
//# sourceMappingURL=BadRequestError.js.map