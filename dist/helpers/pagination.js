"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagingData = exports.getPagination = void 0;
const getPagination = (page, rowsperpage) => {
    const newPage = +page - 1;
    const limit = rowsperpage ? +rowsperpage : 10;
    const offset = page ? newPage * rowsperpage : 0;
    return { limit, offset };
};
exports.getPagination = getPagination;
const getPagingData = (data, page, rowsperpage) => {
    console.log(data);
    const { count, rows } = data;
    let currentPage = page ? +page : 1;
    let totalPage = Math.ceil(count / rowsperpage);
    return { count, rows, totalPage, currentPage };
};
exports.getPagingData = getPagingData;
//# sourceMappingURL=pagination.js.map