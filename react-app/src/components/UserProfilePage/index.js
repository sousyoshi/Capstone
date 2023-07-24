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

  const userName = user.username[0].toUpperCase() + user.username.slice(1);
  console.log(userName);
  useEffect(() => {
    dispatch(getAllMoviesThunk());
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const UserMadeMovies = () => {
    return (
      <>
        <h3>{userName}'s movies</h3>
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
      </>
    );
  };

  const UserReviews = () => {
    return (
      <div className="userReviewsContainer">
        <h3>{userName}'s Reviews</h3>
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

  const userLikedMovies = user.likeObj.map((id) => moviesObj[id]);

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
      <h1>{userName}'s Profile Page </h1>
      {user.movies.length ? (
        <>
          {" "}
          <UserMadeMovies />
        </>
      ) : (
        <>{userName} hasn't added any movies yet</>
      )}
      <h3>{userName}'s liked movies</h3>
      {userLikedMovies.length ? <LikedMovies /> : <h3>{userName} hasn't liked any movies yet</h3>}
      {user.reviews.length ? <UserReviews /> : <h3>{userName} hasn't reviewed any movies yet</h3>}
    </div>
  );
};

export default UserProfilePage;
