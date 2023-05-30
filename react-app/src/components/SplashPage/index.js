import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesThunk } from "../../store/movies";
import "./splashpage.css";

export default function SplashPage() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => Object.values(state.movies));

  useEffect(() => {
    dispatch(getAllMoviesThunk());
  }, [dispatch]);

  if (!movies) return <>Loading...</>;

  const ImageMapper = () => {
    return (
      <>
        {movies.slice(1, 6).map((movie) => (
          <div key={movie.id}
            style={{
              backgroundImage: `url(${movie.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "repeat",
              width: "15rem",
              height: "15rem",
              position: "relative",
              borderRadius: "20px",
            }}
          ></div>
        ))}
      </>
    );
  };

  const ImageMapper2 = () => {
    return (
      <>
        {movies.slice(7, 14).map((movie) => (
          <div key={movie.id}
            style={{
              backgroundImage: `url(${movie.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "repeat",
              width: "15rem",
              height: "15rem",
              position: "relative",
              borderRadius: "20px",
            }}
          ></div>
        ))}
      </>
    );
  };

  const CheesyIntro = () => {
    return (
      <>
        <div style={{ textAlign: "center", display: "grid" }}>
          <h1>Got a love for movies? </h1>
        </div>
      </>
    );
  };

  const MadMax = () => {
    return (
      <>
        <div
          style={{
            backgroundImage: `url("https://thumbs.gfycat.com/ImpassionedDrearyAmericanbulldog.webp")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
            width: "10rem",
            height: "10rem",
            position: "static",
            borderRadius: "40px",
          }}
        ></div>
      </>
    );
  };

  const CheeseMiddleSection = () => {
    return (
      <>
        <div style={{ display: "inline-block" }}>
          <h2>Then race on down to Flickpicks where you can review movies, add movies, even like them to watch later.</h2>
        </div>
      </>
    );
  };
  return (
    <>
      <CheesyIntro />
      <div className="welcomeContainer">
        <MadMax />
      </div>
      <CheeseMiddleSection />
      <div className="container">{<ImageMapper />}</div>
      <div className="container">
        <ImageMapper2 />
      </div>
    </>
  );
}
