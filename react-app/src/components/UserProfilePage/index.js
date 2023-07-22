import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllUsersThunk } from "../../store/users";
import { Link } from "react-router-dom";
import { getAllMoviesThunk } from "../../store/movies";
import "./userprofile.css";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const users = useSelector((state) => state.users);
  const moviesObj = useSelector((state) => state.movies);
  const user = users[userId];

  useEffect(() => {
    dispatch(getAllMoviesThunk());
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const UserMadeMovies = () => {
    return (
      <div className="userMovies">
        {user.movies.map((movie) => {
          return (
            <div className="movieDiv" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img className="movieImage" alt="" src={movie.image}></img>
              </Link>{" "}
              <p>{movie.title}</p> <p>Year released: {movie.releaseYear}</p> <p>Genre: {movie.genreStr}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const UserReviews = () => {
    return (
      <div className="userReviewsContainer">
        <h3>{user.username}'s Reviews</h3>
        {user.reviews.map((review) => (
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

  const userLikedMovies = user.likeObj.map(id=>moviesObj[id]);
  console.log("from that one thing ineed", userLikedMovies);
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

  if (!user) return <>adsfasdfadf</>;

  return (
    <div className="profileContainer">
      <h3>{user.username}'s </h3>
      {user.movies.length ? (
        <>
          {" "}
          <UserMadeMovies />
        </>
      ) : <>I make nothing yet</>}
      <LikedMovies />
      {user.reviews.length ? <UserReviews /> : <h2>{user.username} hasn't reviewed any movies yet</h2>}
    </div>
  );
};

export default UserProfilePage;
