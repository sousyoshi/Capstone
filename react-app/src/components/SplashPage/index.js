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
        {movies.slice(1, 5).map((movie) => (
          <div
            key={movie.id}
            style={{
              backgroundImage: `url(${movie.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              width: "15rem",
              height: "15rem",

              position: "relative",

              border: "1px solid white",
            }}
          >
            {" "}
          </div>
        ))}
      </>
    );
  };

  const ImageMapper2 = () => {
    return (
      <>
        {movies.slice(6, 10).map((movie) => (
          <div
            key={movie.id}
            style={{
              backgroundImage: `url(${movie.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",

              width: "15rem",
              height: "15rem",
              position: "relative",

              border: "1px solid white",
            }}
          ></div>
        ))}
      </>
    );
  };
  const ImageMapper3 = () => {
    return (
      <>
        {movies.slice(10, 14).map((movie) => (
          <div
            key={movie.id}
            style={{
              backgroundImage: `url(${movie.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",

              width: "15rem",
              height: "15rem",
              position: "relative",
              border: "1px solid white",
            }}
          ></div>
        ))}
      </>
    );
  };

  const CheesyIntro = () => {
    return (
      <div style={{ textAlign: "center", display: "flex", alignItems: "center", flexFlow: "column" }}>
        <h1>Got a love for movies? </h1>
        {/* <div
          style={{
            backgroundImage: `url('nettty.png')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: "35rem",
            height: "35rem",
            position: "relative",
          }}
        ></div> */}

        <div
          style={{
            backgroundImage: `url('tester.gif')`,
            backgroundPosition: "center",
            backgroundSize: "cover",

            width: "28rem",
            height: "15rem",

            bottom: "50%",
            borderRadius: "10%",
            border: "thin solid white",
            outline: ".2rem solid black",
          }}
        ></div>
        <h2>Flickpicks is an imdb inspired movie database where you can add, like and review movies.</h2>
      </div>
    );
  };

  return (
    <>
      <CheesyIntro />
      <div className="container">
        <ImageMapper />
      </div>
      <div className="container">
        <ImageMapper2 />
      </div>
      <div className="container">
        <ImageMapper3 />
      </div>
      <footer>Created by: <a href="https://github.com/sousyoshi">Joshua Johnson </a><i class="fa fa-github"></i></footer>
    </>
  );
}
