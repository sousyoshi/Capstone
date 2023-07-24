import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editMovieThunk } from "../../store/movies";
import { useModal } from "../../context/Modal";

import "./movieform.css";

const EditMovieForm = ({ movie }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [genre, setGenre] = useState(movie.genre);
  const [releaseYear, setReleaseYear] = useState(movie.releaseYear);
  const [image, setImage] = useState(movie.image);
  const [trailer, setTrailer] = useState(movie.trailer);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [valErrors, setValErrors] = useState([]);

  useEffect(() => {
    if (hasSubmitted) {
      const errors = [];
      if (!title) errors.push("Please enter a movie title");
      if (!description.length) errors.push("Please enter a synopsis");
      if (!image) errors.push("Please provide an image");
      if (!genre) errors.push("Please provide a genre");

      setValErrors(errors);
    }
  }, [title, description, image, genre, hasSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errors = [];
    if (valErrors.length) return alert("Your form has errors.");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("genre", genre);
    formData.append("release_year", releaseYear);
    formData.append("image", image);
    formData.append("trailer", trailer);
    formData.append("id", movie.id);
    setValErrors(errors);

    const editedMovie = await dispatch(editMovieThunk(formData));
    
    if (!editedMovie.errors) {
      setTitle("");
      setDescription("");
      setGenre("");
      setReleaseYear(1900);
      setImage("");
      setTrailer("");
      setHasSubmitted(false);

      history.push(`/movies/${movie.id}`);
      closeModal();
    }
  };
  return (
    <>
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
            <label> Synopsis: </label>
            <textarea
              minLength={10}
              rows={10}
              cols={50}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            {" "}
            Genre
            <select value={genre} name="genre" onChange={(e) => setGenre(e.target.value)}>
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
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
              <div></div>
            </label>
          </div>
          <div>
            <label>
              {" "}
              Trailer
              <input type="file" accept="video/*" onChange={(e) => setTrailer(e.target.files[0])} />
            </label>
          </div>
          <button type="submit">Update Movie</button>
        </fieldset>
      </form>
    </>
  );
};
export default EditMovieForm;
