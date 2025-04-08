const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud"
});

app.get('/', (req, res) => {
  const sql = "SELECT * FROM movie";
  db.query(sql, (err, result) => {
    if (err) return res.json({ message: "Error here", error: err });
    return res.json(result);
  });
});

// ADD POST endpoint
app.post('/', (req, res) => {
  const { Movie, Actor, Director, Producer, Releasedate } = req.body;
  const sql = "INSERT INTO movie (Movie, Actor, Director, Producer, Releasedate) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [Movie, Actor, Director, Producer, Releasedate], (err, result) => {
    if (err) return res.json({ error: err });
    return res.json({ status: "Success", result });
  });
});

// ADD DELETE endpoint
app.delete('/delete/:id', (req, res) => {
  const sql = "DELETE FROM movie WHERE ID = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.json({ error: err });
    return res.json({ status: "Deleted", result });
  });
});

app.listen(8081, () => {
  console.log("Server running on port 8081");
});
