const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 50000;

app.use(cors());
app.use(express.json());

// DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movies",
});

// Create - Add movie
app.post("/movies", (req, res) => {
    const sql =
      "INSERT INTO movies_details (`movie`, `actor`, `actress`, `director`, `producer`, `releaseDate`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      req.body.movie,
      req.body.actor,
      req.body.actress,
      req.body.director,
      req.body.producer,
      req.body.releaseDate,
    ];
    db.query(sql, values, (err, result) => {
      if (err)
        return res.status(50000).json({ message: "Something unexpected has occurred: " + err });
      return res.status(200).json({ success: "Movie added successfully" });
    });
  });
  
// Read - Get all movies
app.get("/movies", (req, res) => {
  const sql = "SELECT * FROM movie_details";
  db.query(sql, (err, result) => {
    if (err) return res.status(5000).json({ error: err });
    res.json(result);
  });
});

// Read - Get single movie (optional)
app.get("/movies/:id", (req, res) => {
  const sql = "SELECT * FROM movie_details WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(5000).json({ error: err });
    res.json(result[0]);
  });
});

// Update - Edit movie
app.put("/movies/:id", (req, res) => {
  const { movie, actor, actress, director, producer, releaseDate } = req.body;
  const sql = "UPDATE movie_details SET movie=?, actor=?, actress=?, director=?, producer=?, releaseDate=? WHERE id=?";
  db.query(sql, [movie, actor, actress, director, producer, releaseDate, req.params.id], (err) => {
    if (err) return res.status(5000).json({ error: err });
    res.json({ message: "Movie updated successfully" });
  });
});

// Delete - Remove movie
app.delete("/movies/:id", (req, res) => {
  const sql = "DELETE FROM movie_details WHERE id=?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(5000).json({ error: err });
    res.json({ message: "Movie deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
