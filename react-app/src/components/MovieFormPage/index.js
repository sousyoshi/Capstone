import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createMovieThunk, getAllMoviesThunk } from "../../store/movies";
import { useHistory } from "react-router-dom";
import "./movieform.css";

const MovieFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState(1900);
  const [image, setImage] = useState("");
  const [trailer, setTrailer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [valErrors, setValErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!title) errors.push("Please enter a movie title");
    if (!description.length) errors.push("Please enter a synopsis");
    if (!image.length) errors.push("Please provide an image");
    if (!genre.length) errors.push("Please provide a genre");
    if (!image.endsWith(".png") && !image.endsWith(".jpeg") && !image.endsWith(".jpg"))
      errors.push("Image URL must be end with png, jpeg, or jpg");
    setValErrors(errors);
  }, [title, description, image, genre]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (valErrors.length) return alert("Your form has errors.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("genre", genre);
    formData.append("release_year", releaseYear);
    formData.append("image", image);
    formData.append("trailer", trailer);

    const newMovie = await dispatch(createMovieThunk(formData));

    setTitle("");
    setDescription("");
    setGenre("");
    setReleaseYear(1900);
    setImage("");
    setTrailer("");
    setHasSubmitted(false);

    if (newMovie) {
       dispatch(getAllMoviesThunk())
      history.push(`/movies/${newMovie.id}`);
    }
  };

  return (
    <>
      <h1>Add a new Movie</h1>
      {hasSubmitted && valErrors.length > 0 && (
        <div>
          <ul>
            {valErrors.map((error) => (
              <li className="errors" key={error}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}{" "}
      <form className="movieform" onSubmit={handleSubmit} encType="multipart/form-data">
        <fieldset>
          <label>
            {" "}
            Movie Title
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>{" "}
          <div>
            <label>
              {" "}
              Description
              <textarea
                minLength={10}
                rows={10}
                cols={50}
                placeholder="Movie synopsis"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              >
                {" "}
              </textarea>
            </label>
          </div>
          <div>
            {" "}
            Genre
            <select name="genre" onChange={(e) => setGenre(e.target.value)}>
              <option value={""}>Please select an option</option>
              <option value={1}>Crime</option>
              <option value={2}>Fantasy</option>
              <option value={3}>Comedy</option>
              <option value={4}>Adventure</option>
              <option value={5}>Sci-Fi</option>
              <option value={6}>Drama</option>
              <option value={7}>Horror</option>
              <option value={8}>Western</option>
              <option value={9}>Animation</option>
              <option value={10}>Thriller</option>
              <option value={11}>Mystery</option>
              <option value={12}>Super-hero</option>
            </select>
          </div>
          <div>
            <label>
              {" "}
              Release Year
              <input type="number" min={"1900"} max={2023} value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              {" "}
              Image
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              {" "}
              Trailer
              <input type="text" value={trailer} onChange={(e) => setTrailer(e.target.value)} />
            </label>
          </div>
          <button type="submit">Create Movie</button>
        </fieldset>
      </form>
    </>
  );
};

export default MovieFormPage;
