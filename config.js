require("dotenv").config()

const PORT = process.env.PORT
const SECRET_KEY = process.env.JWT_SECRET


module.exports = {
    PORT,
    SECRET_KEY
}