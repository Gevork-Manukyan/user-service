const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("./config");


// create a function to extract the JWT from the request header
function extractJwtHeader ({ headers }) {
    if (headers?.authorization) {
        const [scheme, token] = headers.authorization.split(" ");
        if (scheme.trim() === "Bearer") {
            return token;
        }
    }

    return null
}
