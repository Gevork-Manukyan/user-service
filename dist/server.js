"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./utils/errors");
const config_1 = require("./config");
const security = __importStar(require("./middleware/security"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(security.extractUserFromJwt);
app.use("/user", user_route_1.default);
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