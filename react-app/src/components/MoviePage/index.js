import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import EditMovieForm from "../MovieFormPage/EditMovieForm";
import { useEffect } from "react";
import { getAllMoviesThunk } from "../../store/movies";
import OpenModalButton from "../OpenModalButton";
import DeleteMovieModal from "../DeleteMovieModal";

const MoviePage = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const movie = useSelector((state) => state.movies[movieId]);

  useEffect(() => {
    dispatch(getAllMoviesThunk());
  }, [dispatch]);

  if (!movie) return null;
  return (
    <>
      {" "}
      <h1>{movie.title}</h1>
      <img alt="poster" src={movie.image} />
      <OpenModalButton buttonText={"Edit your movie"} modalComponent={<EditMovieForm movie={movie} />} />
      <OpenModalButton buttonText={"Delete your movie"} modalComponent={<DeleteMovieModal movie={movie} />} />
    </>
  );
};
export default MoviePage;
