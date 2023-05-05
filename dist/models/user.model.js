"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../db");
// Create a User model
class User {
    constructor(id, firstName, lastName, email, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
    static create(user) {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)', [user.firstName, user.lastName, user.email, user.password], (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(new User(this.lastID, user.firstName, user.lastName, user.email, user.password));
                }
            });
        });
    }
    static findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', [id], function (err, row) {
                if (err) {
                    reject(err);
                }
                else if (row) {
                    resolve(new User(row.id, row.firstName, row.lastName, row.email, row.password));
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email = ?', [email], function (err, row) {
                if (err) {
                    reject(err);
                }
                else if (row) {
                    resolve(new User(row.id, row.firstName, row.lastName, row.email, row.password));
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users', function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows.map((row) => new User(row.id, row.firstName, row.lastName, row.email, row.password)));
                }
            });
        });
    }
    update() {
        return new Promise((resolve, reject) => {
            db.run('UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE id = ?', [this.firstName, this.lastName, this.email, this.password, this.id], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    delete() {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM users WHERE id = ?', [this.id], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
User.createTable = () => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )`);
};
exports.default = User;
//# sourceMappingURL=user.model.js.map