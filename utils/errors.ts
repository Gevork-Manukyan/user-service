class ExpressError extends Error {
  message: string;
  status: number;
  constructor(message: string, status: number) {
      super();
      this.message = message;
      this.status = status;
  }
}

/** 400 BAD REQUEST error. */
class BadRequestError extends ExpressError {
  constructor(message: string = "Bad Request") {
      super(message, 400);
  }
}

/** 401 UNAUTHORIZED error. */
class UnauthorizedError extends ExpressError {
  constructor(message: string = "Unauthorized") {
      super(message, 401);
  }
}

/** 403 FORBIDDEN error. */
class ForbiddenError extends ExpressError {
  constructor(message: string = "Forbidden") {
      super(message, 403);
  }
}

/** 404 NOT FOUND error. */
class NotFoundError extends ExpressError {
  constructor(message: string = "Not Found") {
      super(message, 404);
  }
}

export {
  ExpressError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
