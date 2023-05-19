import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesThunk } from "../../store/movies";
import ReactPlayer from "react-player/youtube";
import DeleteMovieModal from "../DeleteMovieModal";
import OpenModalButton from "../OpenModalButton";

function MoviesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesThunk());
  }, [dispatch]);

  const movies = useSelector((state) => Object.values(state.movies));
  const movieMapper = movies.map((movie) => {
    return (
      <ul key={movie.id}>
        {" "}
        <li>
          {" "}
          <img alt="poster" src={movie.image} />
          <OpenModalButton buttonText={"Delete"} modalComponent={<DeleteMovieModal movie={movie} />} />
          <ReactPlayer url={movie.trailer} width={"50%"} controls light={true} />
        </li>
      </ul>
    );
  });

  return <>{movieMapper}</>;
}

export default MoviesPage;
