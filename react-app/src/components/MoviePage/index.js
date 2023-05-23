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

const MoviePage = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const movie = useSelector((state) => state.movies[movieId]);
  const reviewsArr = useSelector((state) => Object.values(state.reviews));

  const reviews = reviewsArr.filter((review) => review.movieId !== movie.id);

  console.log("this is the thing", reviews);
  useEffect(() => {
    dispatch(getAllMoviesThunk());
    dispatch(getAllReviewsThunk());
  }, [dispatch]);

  if (!movie) return null;
  return (
    <section>
      {" "}
      <h1 className='movietitle'>
        {movie.title} ({movie.releaseYear})
      </h1>
      <h2>{movie.genre}</h2>
      <div className="trailer">
        <img alt="poster" src={movie.image} />
        <ReactPlayer url={movie.trailer}></ReactPlayer>
      </div>
      <div className="plot"> Synopsis: {movie.description}</div>
      <OpenModalButton buttonText={"Edit your movie"} modalComponent={<EditMovieForm movie={movie} />} />
      <OpenModalButton buttonText={"Delete your movie"} modalComponent={<DeleteMovieModal movie={movie} />} />
      <OpenModalButton buttonText={"Leave a review"} modalComponent={<ReviewFormPage movie={movie} />} />
    </section>
  );
};
export default MoviePage;
