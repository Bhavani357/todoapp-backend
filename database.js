const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./todoApp.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT, email TEXT UNIQUE, password TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS todos (id TEXT PRIMARY KEY, title TEXT, description TEXT, status TEXT, user_id TEXT)");
});

module.exports = db;
