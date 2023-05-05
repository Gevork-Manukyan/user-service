import { SECRET_KEY, JWT_EXPIRES_IN } from "../config"
const jwt = require("jsonwebtoken")

function generateToken (data: {email: string}) {
    return jwt.sign(data, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN})
}

function createUserJwt (user: {email: string}) {
    const payload = {
        email: user.email
    }

    return generateToken(payload)
}

function validateToken (token: string) {
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY)
        return decodedToken
    } catch (error) {
        return error
    }
}

export {
    createUserJwt,
    validateToken
}