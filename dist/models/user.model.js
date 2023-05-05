"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
// Create a User model
class User {
    constructor(id, firstName, lastName, email, password) {
        this.update = () => {
            return new Promise((resolve, reject) => {
                db_1.default.run('UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE id = ?', [this.firstName, this.lastName, this.email, this.password, this.id], function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        };
        this.delete = () => {
            return new Promise((resolve, reject) => {
                db_1.default.run('DELETE FROM users WHERE id = ?', [this.id], function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        };
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}
_a = User;
User.createTable = () => {
    db_1.default.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )`);
};
User.create = (user) => {
    return new Promise((resolve, reject) => {
        db_1.default.run('INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)', [user.firstName, user.lastName, user.email, user.password], (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(new User(_a.lastID, user.firstName, user.lastName, user.email, user.password));
            }
        });
    });
};
User.findById = (id) => {
    return new Promise((resolve, reject) => {
        db_1.default.get('SELECT * FROM users WHERE id = ?', [id], function (err, row) {
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
};
User.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db_1.default.get('SELECT * FROM users WHERE email = ?', [email], function (err, row) {
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
};
User.getAll = () => {
    return new Promise((resolve, reject) => {
        db_1.default.all('SELECT * FROM users', function (err, rows) {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows.map((row) => new User(row.id, row.firstName, row.lastName, row.email, row.password)));
            }
        });
    });
};
exports.default = User;
//# sourceMappingURL=user.model.js.map