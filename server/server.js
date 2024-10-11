const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database("./db/leads.db");

// Endpoint para capturar os dados do formulário
app.post("/api/leads", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const query = `INSERT INTO leads (name, email, phone) VALUES (?, ?, ?)`;

  db.run(query, [name, email, phone], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      message: "Lead capturado com sucesso!",
      leadId: this.lastID,
    });
  });
});

// Endpoint para listar todos os leads
app.get("/api/leads", (req, res) => {
  const query = `SELECT * FROM leads`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ leads: rows });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
