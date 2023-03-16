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
    const existingUser = await fetchUserByEmail(email)
    if (existingUser) throw new BadRequestError(`A user already exists with email: ${email}`);

    // Encrypt Password
    const hashedPassword = bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = email.toLowerCase()
    
    // Save user to DB
    const newUser = await insertIntoDB([normalizedEmail, hashedPassword, firstName, lastName])
    return newUser
}

async function fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError('No email provided');
    }
  
    // const query = `SELECT * FROM users;`;
    const query = `SELECT * FROM users WHERE email = ?`;
    
    return new Promise((resolve, reject) => {

        db.all(query, [email.toLowerCase()], (err, result) => {
            if (err) {
                reject(err);
            }
            
            resolve(result[0])
        });
    })
        
}

async function insertIntoDB(data) {
    db.run(`INSERT INTO users(email, password, firstName, lastName)
            VALUES(?, ?, ?, ?);`, data, (err, result) => {
            if (err) {
                console.log(err.message);
            }

            console.log('Inserted data into "users" table.');
    });

    return new Promise ((resolve, reject) => {

        db.get("SELECT * FROM users WHERE id = last_insert_rowid();", (err, result) => {
            if (err) reject(err)

            resolve(result)
        })
    })
    
}
  

module.exports = {
    register
}