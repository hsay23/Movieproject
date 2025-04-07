import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud',
});

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM movie';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching movies:', err);
      return res.status(500).json({ message: 'Error fetching movies' });
    }
    res.json(result);
  });
});

app.post('/', (req, res) => {
  const { Movie, Actor, Director, Producer, Releasedate } = req.body;
  const sql =
    'INSERT INTO movie (Movie, Actor, Director, Producer, Releasedate) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [Movie, Actor, Director, Producer, Releasedate], (err, result) => {
    if (err) {
      console.error('Error inserting movie:', err);
      return res.status(500).json({ message: 'Failed to add movie' });
    }
    res.status(200).json({ message: 'Movie added successfully' });
  });
});

app.delete('/:id', (req, res) => {
  const movieId = req.params.id;
  const sql = 'DELETE FROM movie WHERE ID = ?';

  db.query(sql, [movieId], (err, result) => {
    if (err) {
      console.error('Error deleting movie:', err);
      return res.status(500).json({ message: 'Failed to delete movie' });
    }
    res.status(200).json({ message: 'Movie deleted successfully' });
  });
});

app.listen(8081, () => {
  console.log('Server running on http://localhost:8081');
});