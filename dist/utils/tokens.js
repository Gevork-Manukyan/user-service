"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.createUserJwt = void 0;
const config_1 = require("../config");
const jwt = require("jsonwebtoken");
function generateToken(data) {
    return jwt.sign(data, config_1.SECRET_KEY, { expiresIn: config_1.JWT_EXPIRES_IN });
}
function createUserJwt(user) {
    const payload = {
        email: user.email
    };
    return generateToken(payload);
}
exports.createUserJwt = createUserJwt;
function validateToken(token) {
    try {
        const decodedToken = jwt.verify(token, config_1.SECRET_KEY);
        return decodedToken;
    }
    catch (error) {
        return error;
    }
}
exports.validateToken = validateToken;
//# sourceMappingURL=tokens.js.map