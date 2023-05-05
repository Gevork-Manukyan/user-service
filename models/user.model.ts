import db from "../db"

interface PublicUser {
  id: number,
  email: string,
  password: string,
  firstName: string,
  lastName: string
}

// Create a User model
class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  static lastID: number;

  constructor(id: number, firstName: string, lastName: string, email: string, password: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  static createTable = (): void => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )`);
  }

  static create = (user: PublicUser): Promise<User> => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)', [user.firstName, user.lastName, user.email, user.password],  (err: Error) => {
        if (err) {
          reject(err);
        } else {
          resolve(new User(this.lastID, user.firstName, user.lastName, user.email, user.password));
        }
      });
    });
  }

  static findById = (id: number): Promise<User | null>  => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], function(err: Error, row: User) {
        if (err) {
          reject(err);
        } else if (row) {
          resolve(new User(row.id, row.firstName, row.lastName, row.email, row.password));
        } else {
          resolve(null);
        }
      });
    });
  }

  static findByEmail = (email: string): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], function(err: Error, row: User) {
        if (err) {
          reject(err);
        } else if (row) {
          resolve(new User(row.id, row.firstName, row.lastName, row.email, row.password));
        } else {
          resolve(null);
        }
      });
    });
  }

  static getAll = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', function(err: Error, rows: [User]) {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map((row: User) => new User(row.id, row.firstName, row.lastName, row.email, row.password)));
        }
      });
    });
  }

  update = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      db.run('UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE id = ?', [this.firstName, this.lastName, this.email, this.password, this.id], function(err: Error) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  delete = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      db.run('DELETE FROM users WHERE id = ?', [this.id], function(err: Error) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export default User