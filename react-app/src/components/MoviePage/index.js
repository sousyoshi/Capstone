import React, { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { getOneMovieThunk } from "../../store/movies";
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



  useEffect(() => {
    dispatch(getOneMovieThunk(movieId));
  }, [dispatch, movieId]);

  if (!movie) return null;

  return (
    <section className="movieContainer">
      {" "}
      <h1 className="movietitle">
        {movie.title} ({movie.releaseYear}) {movie.genreStr}
      </h1>
      <div className="trailer">
        <img className="poster" alt="poster" src={movie.image} />
        <ReactPlayer className='movieTrailer' controls url={movie.trailer}></ReactPlayer>
      </div>
      <div className="plot"> Synopsis: {movie.description}</div>
      {sessionUser && (
        <div className="reviewButton">
          {!movie.review.find((review) => review.userId === sessionUser.id) && <OpenModalButton buttonText={"Leave a review"} modalComponent={<ReviewFormPage movie={movie} />} />}
        </div>
      )}
      <div className="reviewDisplay">
        <ReviewDisplayer movie={movie} />
      </div>
    </section>
  );
};
export default MoviePage;
