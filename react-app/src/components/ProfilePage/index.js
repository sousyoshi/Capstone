import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesThunk } from "../../store/movies";
import { getAllReviewsThunk } from "../../store/reviews";
import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
import EditReviewForm from "../ReviewFormPage/EditReviewForm";
import DeleteMovieModal from "../DeleteMovieModal";
import EditMovieForm from "../MovieFormPage/EditMovieForm";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MovieFormPage from "../MovieFormPage";
import "./profilepage.css";
import { authenticate } from "../../store/session";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const moviesObj = useSelector((state) => state.movies);
  const movies = Object.values(moviesObj);

  const userMovieIds = movies
    .map((movie) => movie.like.map((likeObj) => likeObj))
    .flat(Infinity)
    .filter((el) => el.owner === user.id)
    .map((el) => el.movieId);

  const userLikedMovies = userMovieIds.map((id) => {
    const val = moviesObj[id];
    return val;
  });
  const likeButton = useCallback(
    async (e, movieId) => {
      e.preventDefault();
      const res = await fetch(`/api/movies/${movieId}/like`, {
        method: "POST",
      });
      if (res.ok) {
        const like = await res.json();
        dispatch(getAllMoviesThunk());
        return like;
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  const UserMadeMovies = () => {
    return (
      <div className="userMovies">
        {" "}
        <h3>Maintain movies you have added</h3>
        {user.movies.map((movie) => {
          return (
            <div className="movieDiv" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img className="movieImage" alt="" src={movie.image}></img>
              </Link>{" "}
              <div className="userButtons">
                {" "}
                <OpenModalButton buttonText={"Edit your movie"} modalComponent={<EditMovieForm movie={movie} />} />
                <OpenModalButton buttonText={"Delete your movie"} modalComponent={<DeleteMovieModal user={user} movie={movie} />} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const LikedMovies = () => {
    return (
      <div className="likedMovies">
        <h3>Movies you liked</h3>

        {userLikedMovies.map((movie) => {
          return (
            <div key={movie.id}>
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

  const UserReviews = () => {
    return (
      <div className="userReviewsContainer">
        <h3>Manage your reviews</h3>
        {user.reviews.map((review) => (
          <div key={review.id} className="userReviews">
            {review.review}
            {review.stars} {review.createdAt.slice(0, 17)} {review.movie}
            <OpenModalButton buttonText={"Delete your review"} modalComponent={<DeleteReviewModal review={review} />} />
            <OpenModalButton
              buttonText={"Edit your review"}
              modalComponent={<EditReviewForm review={review} movie={review.movieId} />}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="profileContainer">
      <OpenModalButton buttonText={"Add a movie"} modalComponent={<MovieFormPage />} />
      <UserMadeMovies />
      <LikedMovies />
      <UserReviews />
    </div>
  );
};
export default ProfilePage;
