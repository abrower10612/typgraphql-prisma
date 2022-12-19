"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const isAuth = async ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error('not authenticated');
    }
    return next();
};
exports.isAuth = isAuth;