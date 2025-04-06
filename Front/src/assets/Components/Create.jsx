import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Create = () => {
  const [movie, setMovie] = useState("");
  const [actor, setActor] = useState("");
  const [actress, setActress] = useState("");
  const [director, setDirector] = useState("");
  const [producer, setProducer] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
    .post("http://localhost:50000/movies", {
      movie,
      actor,
      actress,
      director,
      producer,
      releaseDate: releaseDate ? releaseDate.toISOString().split("T")[0] : null,
    })
    .then(() => {
      navigate("/");
    })
    .catch((err) => {
      console.error("Error adding movie:", err.response?.data || err.message);
      alert("Failed to add movie. Please check console for details.");
    });
  }  
  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="col-md-6 p-4 bg-light border rounded">
          <h2 className="mb-4">Add Movie Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Movie:</label>
              <input
                type="text"
                className="form-control"
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Actor:</label>
              <input
                type="text"
                className="form-control"
                value={actor}
                onChange={(e) => setActor(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Actress:</label>
              <input
                type="text"
                className="form-control"
                value={actress}
                onChange={(e) => setActress(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Director:</label>
              <input
                type="text"
                className="form-control"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Producer:</label>
              <input
                type="text"
                className="form-control"
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label>Release Date:</label>
              <DatePicker
                selected={releaseDate}
                onChange={(date) => setReleaseDate(date)}
                className="form-control"
                placeholderText="Select a date"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div className="d-grid mb-3">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
          <div className="text-center">
            <Link to="/">
              <button className="btn btn-info w-100">View Movies</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
