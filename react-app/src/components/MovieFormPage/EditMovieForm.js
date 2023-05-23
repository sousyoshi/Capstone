import {  useState } from "react";
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { editMovieThunk } from "../../store/movies";
import './movieform.css'

const EditMovieForm = ({ movie }) => {
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



  const handleSubmit = async(e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errors = {}
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
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}{" "}
      <form className="movieform" onSubmit={handleSubmit} encType="multipart/form-data">
        <fieldset>
          <label>
            {" "}
            Movie Title
            <input  type="text" value={movie.title} onChange={(e) => setTitle(e.target.value)} />
          </label>{" "}
          <div>
            <label>
              {" "}
              Synopsis: </label>
              <textarea minLength={10} rows={10} cols={50}   type="text" value={movie.description} onChange={(e) => setDescription(e.target.value)} />

          </div>
          <div>
            <label>
              {" "}
              Genre
              <input type="text" value={movie.genre} onChange={(e) => setGenre(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              {" "}
              Release Year
              <input type="number" min={"1900"} max={2023} value={movie.releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              {" "}
              Image
              <input type="text" value={movie.image} onChange={(e) => setImage(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              {" "}
              Trailer
              <input type="text" value={movie.trailer} onChange={(e) => setTrailer(e.target.value)} />
            </label>
          </div>
          <button type="submit">Update Movie</button>
        </fieldset>
      </form>
    </>
  );
};
export default EditMovieForm;
