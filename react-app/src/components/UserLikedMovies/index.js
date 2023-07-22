import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

import { authenticate } from "../../store/session";
import { getAllMoviesThunk } from "../../store/movies";

const UserLikedMovies = ({ user }) => {
  const dispatch = useDispatch();
  const movies = useSelector(state=>state.movies)

  useEffect(() => {
      dispatch(authenticate())
      dispatch(getAllMoviesThunk());
  }, [dispatch]);

  const likeButton = useCallback(
    async (e, movieId) => {
      e.preventDefault();
      const res = await fetch(`/api/movies/${movieId}/like`, {
        method: "POST",
      });
      if (res.ok) {
        const like = await res.json();
        dispatch(authenticate());
        return like;
      }
    },
    [dispatch]
  );
  const userLikedMovies = user.map((id) => movies[id]);
  
  const LikedMovies = () => {
    return (
      <div className="likedMovies">
        {userLikedMovies.map((movie) => {
          return (
            <div className="movieDiv" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img alt="" src={movie.image}></img>
                <p>{movie.title}</p>
                <button onClick={(e) => likeButton(e, movie.id)}>{"Unlike"}</button>
              </Link>{" "}
            </div>
          );
        })}
      </div>
    );
  };

  if (!movies || !user) return null;
  return <LikedMovies/>;
};

export default UserLikedMovies;
