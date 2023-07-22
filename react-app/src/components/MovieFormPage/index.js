import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createMovieThunk } from "../../store/movies";
import { useModal } from "../../context/Modal";
import { authenticate } from "../../store/session";
import "./movieform.css";

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

    if ( newMovie && !(valErrors).length) {
      dispatch(authenticate()).then(() => closeModal());

    }



    setTitle("");
    setDescription("");
    setGenre("");
    setReleaseYear(1900);
    setImage("");
    setTrailer("");
    setHasSubmitted(false);
  };
  useEffect(() => {
    const errors = {};
    if (!title.length) errors.title = "Please enter a movie title";
    if (!description.length) errors.description = "Please enter a synopsis";
    if (!image) errors.image = "Please provide an image";
    if (!genre) errors.genre = "Please provide a genre";
    setValErrors(errors);
  }, [title, description, image, genre]);

  return (
    <>
      <form className="movieform" onSubmit={handleSubmit} encType="multipart/form-data">
        {" "}
        <fieldset>
          <h1>Add a new Movie</h1>
          <label>
            {" "}
            Movie Title
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> { hasSubmitted && valErrors.title && <div className="errors">{valErrors.title}</div>}
          </label>{" "}

          <div>
            <label>
              Synopsis
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
            {hasSubmitted && valErrors.description && <div className="errors">{valErrors.description}</div>}
          </div>
          <div>
            {" "}
            <select name="genre" onChange={(e) => setGenre(e.target.value)}>
              <option value={""}>Please select a genre</option>
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
            {hasSubmitted && valErrors.genre && <div className="errors">{valErrors.genre}</div>}
          </div>
          <div>
            <label>
              {" "}
              Release Year
              <input type="number" min={"1900"} max={2023} value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
            </label>
            {hasSubmitted && valErrors.releaseYear && <div className="errors">{valErrors.releaseYear}</div>}
          </div>
          <div>
            <label>
              {" "}
              Image
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </label>
            {hasSubmitted && valErrors.image && <div className="errors">{valErrors.image}</div>}

          </div>{ image && <img className="prevImage" alt="fadf" src={URL.createObjectURL(image)}/>}
          <div>
            <label>
              {" "}
              Trailer
              <input type="file" accept="video/*" onChange={(e) => setTrailer(e.target.files[0])} />
            </label>
          </div>
          <button type="submit">Create Movie</button>
        </fieldset>
      </form>
    </>
  );
};

export default MovieFormPage;
