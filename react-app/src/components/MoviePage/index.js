import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import EditMovieForm from "../MovieFormPage/EditMovieForm";
import { useEffect } from "react";
import { getAllMoviesThunk } from "../../store/movies";
import OpenModalButton from "../OpenModalButton";
import DeleteMovieModal from "../DeleteMovieModal";
import ReviewFormPage from "../ReviewFormPage";
import { getAllReviewsThunk } from "../../store/reviews";
import ReactPlayer from "react-player";
import "./moviepage.css";
import ReviewDisplayer from "../ReviewDisplayer";

const MoviePage = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const movie = useSelector((state) => state.movies[movieId]);
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getAllMoviesThunk());
    dispatch(getAllReviewsThunk());
  }, [dispatch]);

  if (!movie) return null;
  return (
    <section>
      {" "}
      <h1 className="movietitle">
        {movie.title} ({movie.releaseYear})
      </h1>

      <div className="trailer">
        <img alt="poster" src={movie.image} />
        <ReactPlayer url={movie.trailer}></ReactPlayer>
      </div>
      <div className="plot"> Synopsis: {movie.description}</div>
      {sessionUser && <div><OpenModalButton buttonText={"Edit your movie"} modalComponent={<EditMovieForm movie={movie} />} />
      <OpenModalButton buttonText={"Delete your movie"} modalComponent={<DeleteMovieModal movie={movie} />} />
      <OpenModalButton buttonText={"Leave a review"} modalComponent={<ReviewFormPage movie={movie} />} /></div>}

      <ReviewDisplayer movie={movie} sessionUser={sessionUser} />
    </section>
  );
};
export default MoviePage;
