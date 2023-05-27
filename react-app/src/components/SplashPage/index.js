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

  const background = movies[0]?.image;
  const background2 = movies[1]?.image;
 
  return (
    <div className="container">
      <div
        style={{
          backgroundImage: `url(${"spiverse.jpg"})`,
          backgroundPosition: "top",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          width: "300px",
          height: "100rem",
          position: "relative",
        }}
      ></div>
         <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: " top center",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          width: "300px",
          height: "100rem",
          position: "relative",
        }}
      ></div>
         <div
        style={{
          backgroundImage: `url(${background2})`,
          backgroundPosition: " center",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          width: "300px",
          height: "100rem",
          position: "relative",
        }}
      ></div>
    </div>
  );
}
