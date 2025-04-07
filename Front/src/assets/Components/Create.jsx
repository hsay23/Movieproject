import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Create = () => {
  const [Movie, setMovie] = useState("");
  const [Actor, setActor] = useState("");
  const [Director, setDirector] = useState("");
  const [Producer, setProducer] = useState("");
  const [Releasedate, setReleasedate] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!Movie || Movie.trim().length < 1) newErrors.Movie = "Movie name is required";
    if (!Actor || Actor.trim().length < 1) newErrors.Actor = "Actor name is required";
    if (!Director || Director.trim().length < 1) newErrors.Director = "Director name is required";
    if (!Producer || Producer.trim().length < 1) newErrors.Producer = "Producer name is required";
    if (!Releasedate) newErrors.Releasedate = "Please select a valid release date";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const movieData = {
      Movie,
      Actor,
      Director,
      Producer,
      Releasedate: Releasedate.toISOString().split("T")[0],
    };

    axios
      .post("http://localhost:8081/", movieData)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Error adding movie:", err.response?.data || err.message);
        alert("Failed to add movie.");
      });
  };

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
                value={Movie}
                onChange={(e) => setMovie(e.target.value)}
              />
              {errors.Movie && <small className="text-danger">{errors.Movie}</small>}
            </div>

            <div className="form-group mb-3">
              <label>Actor:</label>
              <input
                type="text"
                className="form-control"
                value={Actor}
                onChange={(e) => setActor(e.target.value)}
              />
              {errors.Actor && <small className="text-danger">{errors.Actor}</small>}
            </div>

            <div className="form-group mb-3">
              <label>Director:</label>
              <input
                type="text"
                className="form-control"
                value={Director}
                onChange={(e) => setDirector(e.target.value)}
              />
              {errors.Director && <small className="text-danger">{errors.Director}</small>}
            </div>

            <div className="form-group mb-3">
              <label>Producer:</label>
              <input
                type="text"
                className="form-control"
                value={Producer}
                onChange={(e) => setProducer(e.target.value)}
              />
              {errors.Producer && <small className="text-danger">{errors.Producer}</small>}
            </div>

            <div className="form-group mb-4">
              <label>Release Date:</label>
              <DatePicker
                selected={Releasedate}
                onChange={(date) => setReleasedate(date)}
                className="form-control"
                placeholderText="Select a date"
                dateFormat="yyyy-MM-dd"
              />
              {errors.Releasedate && <small className="text-danger">{errors.Releasedate}</small>}
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
