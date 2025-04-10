import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [apiData, setApiData] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:8081/")
      .then((response) => {
        console.log("Data Fetched.");
        if (Array.isArray(response.data)) {
          setApiData(response.data);
        } else {
          console.error("Unexpected response format");
          setApiData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        alert("Failed to fetch movies.");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      axios
        .delete(`http://localhost:8081/delete/${id}`)
        .then(() => {
          getData(); 
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Movies List</h2>
        <Link to="/create">
          <button className="btn btn-success">Add New Movie</button>
        </Link>
      </div>

      {Array.isArray(apiData) && apiData.length === 0 ? (
        <p>No movies available.</p>
      ) : Array.isArray(apiData) ? (
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Movie</th>
              <th>Actor</th>
              <th>Director</th>
              <th>Producer</th>
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((movie) => (
              <tr key={movie.ID}>
                <td>{movie.ID}</td>
                <td>{movie.Movie}</td>
                <td>{movie.Actor}</td>
                <td>{movie.Director}</td>
                <td>{movie.Producer}</td>
                <td>{movie.Releasedate?.split("T")[0]}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(movie.ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading or invalid data format...</p>
      )}
    </div>
  );
};

export default Read;
