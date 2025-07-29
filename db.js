const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "data", "signins.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS signins (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,hours DOUBLE NOT NULL,time TEXT NOT NULL,role TEXT NOT NULL,teacher TEXT NOT NULL,signature TEXT)');
});

module.exports = db;
