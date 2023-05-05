"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCRYPT_WORK_FACTOR = exports.JWT_EXPIRES_IN = exports.SECRET_KEY = exports.PORT = void 0;
require("dotenv").config();
const PORT = process.env.PORT;
exports.PORT = PORT;
const SECRET_KEY = process.env.JWT_SECRET;
exports.SECRET_KEY = SECRET_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
exports.JWT_EXPIRES_IN = JWT_EXPIRES_IN;
const BCRYPT_WORK_FACTOR = 13;
exports.BCRYPT_WORK_FACTOR = BCRYPT_WORK_FACTOR;
//# sourceMappingURL=config.js.map