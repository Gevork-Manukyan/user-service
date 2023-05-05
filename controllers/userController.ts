import { BadRequestError } from '../utils/errors'
import { BCRYPT_WORK_FACTOR } from '../config'
import User from "../models/user.model"
const bcrypt = require('bcrypt');

interface RegisterUser {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}
async function register (credentials: RegisterUser): Promise<RegisterUser> {
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
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = email.toLowerCase()
    
    // Save user to DB
    const newUser = await User.create({
        id: 0,
        email: normalizedEmail,
        password: hashedPassword,
        firstName,
        lastName
    })
    
    return newUser
}

interface LoginCredentials {
    email: string,
    password: string
}
type LoginUserResponse = {
    email: string,
    firstName: string,
    lastName: string
}
async function login(credentials: LoginCredentials): Promise<LoginUserResponse> {
    const requiredFields = ['email', 'password'];
    requiredFields.forEach((field) => {
        if (!credentials?.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body.`);
        }
    })

    const email = credentials.email.toLowerCase()
    const password = credentials.password

    // Check if user exists with this email
    const existingUser = await User.findByEmail(email)
    if (!existingUser) throw new BadRequestError(`No user found with email: ${email}`);

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, existingUser.password)
    if (!isPasswordMatch) throw new BadRequestError(`Invalid password`);

    //TODO: Check what object is being returned here
    return existingUser
}
  

export {
    register,
    login
}