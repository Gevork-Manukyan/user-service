const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR }  = require('../config');
const User = require("../models/user.model")
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require('../utils/errors');

async function register (credentials) {
    const requiredFields = ['email', 'password', 'firstName', 'lastName'];
    requiredFields.forEach((field) => {
        if (!credentials?.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body.`);
        }
    })

    const firstName = credentials.firstName
    const lastName = credentials.lastName
    const email = credentials.email
    const password = credentials.password

    // Check for valid inputs
    if (firstName.trim() === "" || lastName.trim() === "") throw new BadRequestError(`Invalid first or last name.`)
    if (email.indexOf('@') <= 0) throw new BadRequestError('Invalid Email.');
    if (password.trim() === "") throw new BadRequestError('Invalid Password')

    // Check if user exists with this email
    const existingUser = await User.findByEmail(email)
    if (existingUser) throw new BadRequestError(`A user already exists with email: ${email}`);

    // Encrypt Password
    const hashedPassword = bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = email.toLowerCase()
    
    // Save user to DB
    // const newUser = await insertIntoDB([normalizedEmail, hashedPassword, firstName, lastName])
    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password
    })
    return newUser
}

async function login(credentials) {
    const requiredFields = ['email', 'password'];
    requiredFields.forEach((field) => {
        if (!credentials?.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body.`);
        }
    })

    const email = credentials.email
    const password = credentials.password

    // Check if user exists with this email
    const existingUser = await User.findByEmail(email)
    if (!existingUser) throw new BadRequestError(`No user found with email: ${email}`);

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password)
    if (!isPasswordMatch) throw new BadRequestError(`Invalid password`);

    return existingUser
}
  

module.exports = {
    register,
    login
}