import { UnauthorizedError } from "../utils/errors";
import { SECRET_KEY } from "../config"
const { jwt } = require("jsonwebtoken")


// Extract the JWT from the request header
function extractJwtHeader({ headers }: { headers: {authorization: string} }) {
  if (headers?.authorization) {
    const [scheme, token] = headers.authorization.split(" ");
    if (scheme.trim() === "Bearer") {
      return token;
    }
  }

  return null;
}

// Extract user from the JWT token
const extractUserFromJwt = (req: any, res: any, next: any) => {
  try {
    const token = extractJwtHeader(req);
    if (token) {
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }

    return next();
  } catch (error) {
    return next();
  }
};

// Verify if a authenticated user exists
const requireAuthenticatedUser = (req: any, res: any, next: any) => {
  try {
    const { user } = res.locals;
    if (!user?.email) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

export {
    extractJwtHeader,
    extractUserFromJwt,
    requireAuthenticatedUser
}