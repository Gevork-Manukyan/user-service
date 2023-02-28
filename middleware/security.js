const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("./config");


// Extract the JWT from the request header
function extractJwtHeader ({ headers }) {
    if (headers?.authorization) {
        const [scheme, token] = headers.authorization.split(" ");
        if (scheme.trim() === "Bearer") {
            return token;
        }
    }

    return null
}

// Extract user from the JWT token
const extractUserFromJwt = (req, res, next) => {

    try {
        const token = extractJwtHeader(req);
        if (token) {
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }

        return next(); 

    } catch (error) {
        return next();
    }
}