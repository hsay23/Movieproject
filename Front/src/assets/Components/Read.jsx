import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [apiData, setApiData] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:50000/movies")
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        alert("Failed to fetch movies.");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      axios
        .delete(`http://localhost:5000/movies/${id}`)
        .then(() => {
          getData(); // Refresh the list after delete
        })
        .catch((error) => {
          console.error("Error deleting movie:", error);
          alert("Failed to delete movie.");
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (movie) => {
    localStorage.setItem("id", movie.id);
    localStorage.setItem("movie", movie.movie);
    localStorage.setItem("actor", movie.actor);
    localStorage.setItem("actress", movie.actress);
    localStorage.setItem("director", movie.director);
    localStorage.setItem("producer", movie.producer);
    localStorage.setItem("releaseDate", movie.releaseDate?.split("T")[0]);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Movies List</h2>
        <Link to="/create">
          <button className="btn btn-success">Add New Movie</button>
        </Link>
      </div>

      {apiData.length === 0 ? (
        <p>No movies available.</p>
      ) : (
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Movie</th>
              <th>Actor</th>
              <th>Actress</th>
              <th>Director</th>
              <th>Producer</th>
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.movie}</td>
                <td>{movie.actor}</td>
                <td>{movie.actress}</td>
                <td>{movie.director}</td>
                <td>{movie.producer}</td>
                <td>{movie.releaseDate?.split("T")[0]}</td>
                <td>
                  <Link to="/update">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(movie)}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(movie.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Read;
