import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Update = () => {
  const [id, setId] = useState(0);
  const [movie, setMovie] = useState("");
  const [actor, setActor] = useState("");
  const [actress, setActress] = useState("");
  const [director, setDirector] = useState("");
  const [producer, setProducer] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setMovie(localStorage.getItem("movie") || "");
    setActor(localStorage.getItem("actor") || "");
    setActress(localStorage.getItem("actress") || "");
    setDirector(localStorage.getItem("director") || "");
    setProducer(localStorage.getItem("producer") || "");
    setReleaseDate(localStorage.getItem("releaseDate") || "");
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:50000/movies/${id}`, {
        movie,
        actor,
        actress,
        director,
        producer,
        releaseDate,
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Update error:", error);
        alert("Failed to update movie.");
      });
  };

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="col-md-6 p-4 bg-light border rounded">
          <h2 className="mb-4">Update Movie</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group mb-3">
              <label>Movie Name:</label>
              <input
                type="text"
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Actor:</label>
              <input
                type="text"
                value={actor}
                onChange={(e) => setActor(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Actress:</label>
              <input
                type="text"
                value={actress}
                onChange={(e) => setActress(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Director:</label>
              <input
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Producer:</label>
              <input
                type="text"
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Release Date:</label>
              <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Update Movie
              </button>
            </div>
          </form>
          <Link to="/">
            <button className="btn btn-info w-100">Back to Movie List</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Update;
