const db = require('../database');

const Todo = {
  create: (id, title, description, status, user_id) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO todos (id, title, description, status, user_id) VALUES (?, ?, ?, ?, ?)`, [id, title, description, status, user_id], function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
    });
  },
  getAllTodos: ()=>{
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM todos`, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },
  findByUserId: (user_id) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM todos WHERE user_id = ?`, [user_id], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },
  update: (id, status) => {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE todos SET status = ? WHERE id = ?`, [status, id], function(err) {
        if (err) reject(err);
        resolve(this.changes);
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM todos WHERE id = ?`, [id], function(err) {
        if (err) reject(err);
        resolve(this.changes);
      });
    });
  },
};

module.exports = Todo;
