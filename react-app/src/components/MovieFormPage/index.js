import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createMovieThunk } from "../../store/movies";
import { useHistory } from "react-router-dom";

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
  const [valErrors, setValErrors] = useState({});



  useEffect(() => {
    if (hasSubmitted) {
      const errors = {};
      if (!title.length) errors.title = "Please enter a movie title";
      if (!description.length) errors.description = "Please enter a synopsis";
      if (!image.length) errors.image = "Please provide an image";
      if (!genre.length) errors.genre = "Please provide a genre";
      setValErrors(errors);
    }
  }, [title, description, image, hasSubmitted, genre]);

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
      history.push(`/movies/${newMovie.id}`);



      setTitle("");
      setDescription("");
      setGenre("");
      setReleaseYear(1900);
      setImage("");
      setTrailer("");
      setHasSubmitted(false);


  };

  return (
    <>
      <h1>Add a new Movie</h1>
      {hasSubmitted && valErrors.length > 0 && (
        <div>
          <ul>
            {valErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}{" "}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              {" "}
              Genre
              <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
            </label>
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
          <button type="submit">"Create Movie"</button>
        </fieldset>
      </form>
    </>
  );
};

export default MovieFormPage;
