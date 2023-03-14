const { PORT } = require("./config");
const express = require('express');
const security = require("./middleware/security")
const app = express();
const cors = require('cors')
const db = require("./db")
const userRoutes = require("./routes/user.route")


app.use(cors());
app.use(express.json());
app.use(security.extractUserFromJwt);

app.use("/user", userRoutes)


/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
  return next(new NotFoundError())
})

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message

  return res.status(status).json({
    error: { message, status },
  })
})


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});