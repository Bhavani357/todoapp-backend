const db = require('../database');

const User = {
  create: (id, name, email, password) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`, [id, name, email, password], function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
    });
  },
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  },
};

module.exports = User;
