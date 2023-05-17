import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesThunk } from "../../store/movies";
import ReactPlayer from "react-player/youtube";
import {faker}  from '@faker-js/faker'

function MoviesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesThunk());
  }, [dispatch]);

  const movies = useSelector((state) => Object.values(state.movies));
  const movieMapper = movies.map((movie) => {
    return (
      <>
         <img alt="poster" src={faker.image.urlLoremFlickr()}  />
        <ReactPlayer url={movie.trailer} width={"50%"}  controls light={true} />
      </>
    );
  });

  return <>{movieMapper}</>;
}

export default MoviesPage;
