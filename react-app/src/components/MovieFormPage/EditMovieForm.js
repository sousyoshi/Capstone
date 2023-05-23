import React, {  useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { editMovieThunk } from "../../store/movies";
import './movieform.css'

const EditMovieForm = ({ movie }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [genre, setGenre] = useState(movie.genre);
  const [releaseYear, setReleaseYear] = useState(movie.releaseYear);
  const [image, setImage] = useState(movie.image);
  const [trailer, setTrailer] = useState(movie.trailer);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [valErrors, setValErrors] = useState([]);

  useEffect(() => {

      const errors = [];
      if (!title) errors.push("Please enter a movie title");
      if (!description.length) errors.push("Please enter a synopsis");
      if (!image.length) errors.push("Please provide an image");
      if (!genre.length) errors.push("Please provide a genre");
      if(!image.endsWith('.png') && !image.endsWith(".jpeg") && !image.endsWith('.jpg')) errors.push('Image URL must be end with png, jpeg, or jpg')
      setValErrors(errors);

  }, [title, description, image, genre]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errors = []
    if (valErrors.length) return alert("Your form has errors.");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("genre", genre);
    formData.append("release_year", releaseYear);
    formData.append("image", image);
    formData.append("trailer", trailer);
    formData.append("id", movie.id);
    setValErrors(errors)

    await dispatch(editMovieThunk(formData));

    setTitle("");
    setDescription("");
    setGenre("");
    setReleaseYear(1900);
    setImage("");
    setTrailer("");
    setHasSubmitted(false);

    history.push(`/movies/${movie.id}`);
  };
  return (
    <>
      <h1>Update a movie</h1>
      {hasSubmitted && valErrors.length > 0 && (
        <div>
          <ul>
            {valErrors.map((error) => (
              <li className="errors" key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}{" "}
      <form className="movieform" onSubmit={handleSubmit} encType="multipart/form-data">
        <fieldset>
          <label>
            {" "}
            Movie Title
            <input  type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>{" "}
          <div>
            <label>
              {" "}
              Synopsis: </label>
              <textarea minLength={10} rows={10} cols={50}   type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

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
          <button type="submit">Update Movie</button>
        </fieldset>
      </form>
    </>
  );
};
export default EditMovieForm;
