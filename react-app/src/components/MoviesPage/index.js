import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesThunk } from "../../store/movies";
import ReactPlayer from "react-player/youtube";

function MoviesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesThunk());
  }, [dispatch]);

  const movies = useSelector((state) => Object.values(state.movies));
  const movieMapper = movies.map((movie) => {
    return (
      <>
        <ReactPlayer url={movie.trailer} width={"50%"} className="hidden" />
         <img alt="poster" src={movie.image} />
      </>
    );
  });

  return <>{movieMapper}</>;
}

export default MoviesPage;
