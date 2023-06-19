import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createMovieThunk } from "../../store/movies";

import { useModal } from "../../context/Modal";
import "./movieform.css";
import { authenticate } from "../../store/session";

const MovieFormPage = () => {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState(1900);
  const [image, setImage] = useState("");
  const [trailer, setTrailer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [valErrors, setValErrors] = useState({});

  useEffect(() => {

      const errors = {};
      if (!title.length) errors.title = ("Please enter a movie title");
      if (!description.length) errors.description = ("Please enter a synopsis");
      if (!image.length) errors.image = ("Please provide an image");
      if (!genre) errors.genre = ("Please provide a genre");
      if (!image.endsWith(".png") && !image.endsWith(".jpeg") && !image.endsWith(".jpg"))
        errors.imageSuff = ("Image URL must be end with png, jpeg, or jpg");
      setValErrors(errors);

  }, [title, description, image, genre, hasSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

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
      dispatch(authenticate());
      closeModal();
    }
  };

  return (
    <>
      <form className="movieform" onSubmit={handleSubmit} encType="multipart/form-data">
        {" "}
        {/* {hasSubmitted && valErrors.length && (
          <div>
            <ul>
              {valErrors.map((error) => (
                <li className="errors" key={error}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}{" "} */}
        <fieldset>
          <h1>Add a new Movie</h1>
          <label>
            {" "}
            Movie Title
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>{" "}
          {valErrors.title && <div className="errors">{valErrors.title}</div>}
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
            {valErrors.description && <div className="errors">{valErrors.description}</div>}
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
