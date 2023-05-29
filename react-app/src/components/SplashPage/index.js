import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesThunk } from "../../store/movies";
import "./splashpage.css";

export default function SplashPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMoviesThunk());
  }, [dispatch]);

  const movies = useSelector((state) => Object.values(state.movies));

  if (!movies) return null;

  const ImageMapper = () => {
    return (
      <>
        {movies.slice(1, 6).map((movie) => (
          <div
            style={{
              backgroundImage: `url(${movie.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "repeat",
              width: "15rem",
              height: "15rem",
              position: "relative",
              borderRadius: '20px'
            }}
          ></div>
        ))}
      </>
    );
  };
  return (
    <div className="container">
      {/* <div
        style={{
          backgroundImage: `url(${"spiverse.jpg"})`,
          backgroundPosition: "top",
          backgroundSize: "100%",
          backgroundRepeat: "repeat",
          width: "300px",
          height: "100rem",
          position: "relative",
        }}
      ></div> */}

      {<ImageMapper />}

    </div>
  );
}
