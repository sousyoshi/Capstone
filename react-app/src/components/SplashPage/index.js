import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesThunk } from "../../store/movies";
import LoginFormModal from "../LoginFormModal";
import './splashpage.css'

export default function SplashPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMoviesThunk());
  }, [dispatch]);

  const movies = useSelector((state) => Object.values(state.movies));

  if (!movies) return null;

  const background = movies[0]?.image;
  console.log("fffffffffffffffffffffff", background);
  return (
    <div className="container">
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <div className="loginForm">
          <LoginFormModal />
        </div>
      </div>
    </div>
  );
}
