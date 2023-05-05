"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const errors_1 = require("../utils/errors");
const config_1 = require("../config");
const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const db = require("../db");
function register(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const requiredFields = ['email', 'password', 'firstName', 'lastName'];
        requiredFields.forEach((field) => {
            if (!(credentials === null || credentials === void 0 ? void 0 : credentials.hasOwnProperty(field))) {
                throw new errors_1.BadRequestError(`Missing ${field} in request body.`);
            }
        });
        const firstName = credentials.firstName;
        const lastName = credentials.lastName;
        const email = credentials.email;
        const password = credentials.password;
        // Check for valid inputs
        if (firstName.trim() === "" || lastName.trim() === "")
            throw new errors_1.BadRequestError(`Invalid first or last name.`);
        if (email.indexOf('@') <= 0)
            throw new errors_1.BadRequestError('Invalid Email.');
        if (password.trim() === "")
            throw new errors_1.BadRequestError('Invalid Password');
        // Check if user exists with this email
        const existingUser = yield User.findByEmail(email);
        if (existingUser)
            throw new errors_1.BadRequestError(`A user already exists with email: ${email}`);
        // Encrypt Password
        const hashedPassword = yield bcrypt.hash(password, config_1.BCRYPT_WORK_FACTOR);
        const normalizedEmail = email.toLowerCase();
        // Save user to DB
        const newUser = yield User.create({
            email: normalizedEmail,
            password: hashedPassword,
            firstName,
            lastName
        });
        return newUser;
    });
}
exports.register = register;
function login(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const requiredFields = ['email', 'password'];
        requiredFields.forEach((field) => {
            if (!(credentials === null || credentials === void 0 ? void 0 : credentials.hasOwnProperty(field))) {
                throw new errors_1.BadRequestError(`Missing ${field} in request body.`);
            }
        });
        const email = credentials.email.toLowerCase();
        const password = credentials.password;
        // Check if user exists with this email
        const existingUser = yield User.findByEmail(email);
        if (!existingUser)
            throw new errors_1.BadRequestError(`No user found with email: ${email}`);
        // Check password
        const isPasswordMatch = yield bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch)
            throw new errors_1.BadRequestError(`Invalid password`);
        //TODO: Check what object is being returned here
        return existingUser;
    });
}
exports.login = login;
//# sourceMappingURL=userController.js.map