const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/leads.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL
    )
  `);
});

db.close();
