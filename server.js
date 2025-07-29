const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));
app.use(express.static("public"));

// 获取签到记录
app.get("/api/records", (req, res) => {
  db.all("SELECT * FROM signins ORDER BY id ASC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 签到提交
app.post("/api/signin", (req, res) => {
  const { name, hours, time, role, teacher, signature } = req.body;
  if (!name || !hours || !time || !role || !teacher || !signature) {
    return res.status(400).json({ error: "Empty field(s)!" });
  }
  const stmt = db.prepare("INSERT INTO signins (name, hours, time, role, teacher, signature) VALUES (?, ?, ?, ?, ?, ?)");
  stmt.run(name, hours, time, role, teacher, signature, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Check in successfully!", id: this.lastID });
  });
  stmt.finalize();
});

app.listen(PORT, () => {
  console.log('Server running at http://localhost:\${PORT}');
});
