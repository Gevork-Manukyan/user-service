const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('users.db', (err: Error) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the users database.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS users(
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName  TEXT NOT NULL,
  email     TEXT NOT NULL UNIQUE,
  password  TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err: Error) => {
  if (err) {
    console.log(err.message)
  }
})

export default db