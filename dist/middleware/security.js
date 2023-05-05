"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthenticatedUser = exports.extractUserFromJwt = exports.extractJwtHeader = void 0;
const errors_1 = require("../utils/errors");
const config_1 = require("../config");
const jwt = require("jsonwebtoken");
// Extract the JWT from the request header
function extractJwtHeader({ headers }) {
    if (headers === null || headers === void 0 ? void 0 : headers.authorization) {
        const [scheme, token] = headers.authorization.split(" ");
        if (scheme.trim() === "Bearer") {
            return token;
        }
    }
    return null;
}
exports.extractJwtHeader = extractJwtHeader;
// Extract user from the JWT token
const extractUserFromJwt = (req, res, next) => {
    try {
        const token = extractJwtHeader(req);
        if (token) {
            res.locals.user = jwt.verify(token, config_1.SECRET_KEY);
        }
        return next();
    }
    catch (error) {
        return next();
    }
};
exports.extractUserFromJwt = extractUserFromJwt;
// Verify if a authenticated user exists
const requireAuthenticatedUser = (req, res, next) => {
    try {
        const { user } = res.locals;
        if (!(user === null || user === void 0 ? void 0 : user.email)) {
            throw new errors_1.UnauthorizedError();
        }
        return next();
    }
    catch (error) {
        return next(error);
    }
};
exports.requireAuthenticatedUser = requireAuthenticatedUser;
//# sourceMappingURL=security.js.map