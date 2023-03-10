const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR }  = require('../config');
const User = require("../models/user.model")
const db = require("../db")
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
    const existingUser = fetchUserByEmail(email)
    if (existingUser) throw new BadRequestError(`A user already exists with email: ${email}`);

    // Encrypt Password
    const hashedPassword = bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = email.toLowerCase()
    

    // Save user to DB
    db.run(`INSERT INTO users(email, password, firstName, lastName)
            VALUES(?, ?, ?, ?);
            SELECT * FROM users WHERE id = last_insert_rowid();`, [normalizedEmail, hashedPassword, firstName, lastName], (err) => {
            if (err) {
                console.log(err.message);
            }
            
            console.log('Inserted data into "users" table.');
    });

    

}

async function fetchUserByEmail(email) {
    if (!email) {
        throw new BadRequestError('No email provided');
    }

    const query = ` SELECT * FROM users WHERE email = ? `;

    const result = db.run(query, [email.toLowerCase()]);

    // const user = result.rows[0];

    // return user;

}

module.exports = {
    register
}