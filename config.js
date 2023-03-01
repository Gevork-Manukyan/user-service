require("dotenv").config()

const PORT = process.env.PORT
const SECRET_KEY = process.env.JWT_SECRET
const BCRYPT_WORK_FACTOR = 13

module.exports = {
    PORT,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR
}