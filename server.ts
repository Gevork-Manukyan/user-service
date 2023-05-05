import { NotFoundError } from "./utils/errors";
import { PORT } from "./config"
const express = require('express');
const security = require("./middleware/security")
const cors = require('cors')
const userRoutes = require("./routes/user.route")
const db = require("./db")
const app = express();


app.use(cors());
app.use(express.json());
app.use(security.extractUserFromJwt);

app.use("/user", userRoutes)


/** Handle 404 errors -- this matches everything */
app.use((req: any, res: any, next: any) => {
  return next(new NotFoundError())
})

/** Generic error handler; anything unhandled goes here. */
app.use((err: any, req: any, res: any, next: any) => {
  const status = err.status || 500
  const message = err.message

  return res.status(status).json({
    error: { message, status },
  })
})


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});