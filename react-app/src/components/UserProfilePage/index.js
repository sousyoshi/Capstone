import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAllUsersThunk } from "../../store/users";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getAllMoviesThunk } from "../../store/movies";
import "./userprofile.css";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const users = useSelector((state) => state.users);
  const moviesObj = useSelector((state) => state.movies);
  const userName = users[userId];

  useEffect(() => {
    dispatch(getAllUsersThunk());
    dispatch(getAllMoviesThunk());
  }, [dispatch]);



  const userLikedMovies = userName?.likeObj?.map(el=> moviesObj[el.movieId])

console.log(userLikedMovies)
  const UserMadeMovies = () => {
    return (
      <div className="userMovies">
        {userName.movies.map((movie) => {
          return (
            <div className="movieDiv" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img className="movieImage" alt="" src={movie.image}></img>
              </Link>{" "}
            <p>{movie.title}</p>  <p>Year released: {movie.releaseYear}</p>  <p>Genre: {movie.genreStr}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const UserReviews = () => {
    return (
      <div className="userReviewsContainer">
        <h3>{userName.username}'s Reviews</h3>
        {userName.reviews.map((review) => (
          <div key={review.id} className="userReviews">
            {" "}
            <img src={moviesObj[review.movieId]?.image} alt="movieposter"></img>
            <div>
              <p>{review.createdAt.slice(0, 17)}</p>
              <p> Film: {review.movie}</p>
              <p> Review: {review.review}</p>
              <p> Rating: {review.stars}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const LikedMovies = () => {
    return (
      <div className="likedMovies">
        {userLikedMovies.map((movie) => {
          return (
            <div className="movieDiv" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img alt="" src={movie.image}></img>
                <p>{movie.title}</p>
              </Link>{" "}
            </div>
          );
        })}
      </div>
    );
  };

  if (!userName || !users) return null;

  return (
    <div className="profileContainer">
      <h3>{userName.username}'s </h3>
      {userName.movies.length ? (
        <>
          {" "}
          <UserMadeMovies />
        </>
      ) : null}
      {userName.reviews.length ? <UserReviews /> : <h2>{userName.username} hasn't reviewed any movies yet</h2>}
       <LikedMovies />
    </div>
  );
};

export default UserProfilePage;
