"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./utils/errors");
const config_1 = require("./config");
const express = require('express');
const security = require("./middleware/security");
const cors = require('cors');
const userRoutes = require("./routes/user.route");
const db = require("./db");
const app = express();
app.use(cors());
app.use(express.json());
app.use(security.extractUserFromJwt);
app.use("/user", userRoutes);
/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
    return next(new errors_1.NotFoundError());
});
/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;
    return res.status(status).json({
        error: { message, status },
    });
});
app.listen(config_1.PORT, () => {
    console.log(`Server started on port ${config_1.PORT}`);
});
//# sourceMappingURL=server.js.map