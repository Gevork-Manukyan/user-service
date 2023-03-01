const User = require("../models/user.model")
const { BadRequestError } = require('../utils/errors');

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
    const existingUser = await User.findOne({ email })
    if (existingUser) throw new BadRequestError(`A user already exists with email: ${email}`);

    
    
    const user = new User({
        firstName,
        lastName,
        email,
        password,
    })


}

module.exports = {
    register
}