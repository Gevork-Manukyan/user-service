require("dotenv").config()

const PORT = process.env.PORT
const SECRET_KEY = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
const BCRYPT_WORK_FACTOR = 13

export {
    PORT,
    SECRET_KEY,
    JWT_EXPIRES_IN,
    BCRYPT_WORK_FACTOR
}