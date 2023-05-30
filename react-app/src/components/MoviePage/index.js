import React, { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { getAllMoviesThunk } from "../../store/movies";
import OpenModalButton from "../OpenModalButton";
import ReviewFormPage from "../ReviewFormPage";
import ReactPlayer from "react-player";
import "./moviepage.css";
import ReviewDisplayer from "../ReviewDisplayer";

const MoviePage = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const movie = useSelector((state) => state.movies[movieId]);

  const sessionUser = useSelector((state) => state.session.user);

  const userReview = movie?.review.find((el) => el.userId === sessionUser.id);

  useEffect(() => {
    dispatch(getAllMoviesThunk());
  }, [dispatch]);

  if (!movie) return null;

  return (
    <section className="movieContainer">
      {" "}
      <h1 className="movietitle">
        {movie.title} ({movie.releaseYear}) {movie.genreStr}
      </h1>
      <div className="trailer">
        <img alt="poster" src={movie.image} />
        <ReactPlayer controls url={movie.trailer}></ReactPlayer>
      </div>
      <div className="plot"> Synopsis: {movie.description}</div>
      {sessionUser && (
        <div  className="reviewButton">{!userReview && <OpenModalButton buttonText={"Leave a review"} modalComponent={<ReviewFormPage movie={movie} />} />}</div>
      )}
      <div className="reviewDisplay">
        <ReviewDisplayer movie={movie} sessionUser={sessionUser} />
      </div>
    </section>
  );
};
export default MoviePage;
