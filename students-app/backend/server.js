const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const client = require('prom-client'); // <--- Prometheus client add kora hoyeche

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. Prometheus Metrics Configuration (Start) ---
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// /metrics endpoint jekhane Prometheus data nite ashbe
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});
// --- Prometheus Metrics Configuration (End) ---

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get('/api/students', (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/api/absent/:id', (req, res) => {
  db.query("UPDATE students SET absent_count = absent_count + 1 WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Updated successfully" });
  });
});

app.listen(5000, () => console.log("Backend running on 5000 with Metrics"));
