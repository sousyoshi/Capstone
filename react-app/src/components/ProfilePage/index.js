import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesThunk, getOneMovieThunk } from "../../store/movies";
import DeleteUserReviewModal from "../DeleteReviewModal/DeleteUserReviewModal";
import OpenModalButton from "../OpenModalButton";
import EditReviewForm from "../ReviewFormPage/EditReviewForm";
import DeleteMovieModal from "../DeleteMovieModal";
import EditMovieForm from "../MovieFormPage/EditMovieForm";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MovieFormPage from "../MovieFormPage";
import { authenticate } from "../../store/session";
import UserLikedMovies from "../UserLikedMovies";
import "./profilepage.css";


const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const moviesObj = useSelector((state) => state.movies);
  const movies = Object.values(moviesObj);


  useEffect(() => {

    dispatch(authenticate())
    dispatch(getAllMoviesThunk())


  }, [dispatch]);







  const UserMadeMovies = () => {
    return (
      <div className="userMovies">
        {user.movies.length ? (
          user.movies.map((movie) => {
            return (
              <div className="movieDiv" key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  <img className="movieImage" alt="" src={movie.image}></img>
                </Link>{" "}
                <div className="userButtons">
                  {" "}
                  <OpenModalButton buttonText={"Edit your movie"} modalComponent={<EditMovieForm movie={movie} />} />
                  <OpenModalButton buttonText={"Delete your movie"} modalComponent={<DeleteMovieModal  movie={movie} />} />
                </div>
              </div>
            );
          })
        ) : (
          <p>You haven't added any movies yet...</p>
        )}
      </div>
    );
  };


  // const userLikedMovies = user.likeObj.map(id=>moviesObj[id])
  // const likedMovies = () => {
  //   return (
  //     <div className="likedMovies">
  //       {(
  //         userLikedMovies.map((movie) => {
  //           return (
  //             <div className="movieDiv" key={movie.id}>
  //               <Link to={`/movies/${movie.id}`}>
  //                 <img alt="" src={movie.image}></img>
  //                 <p>{movie.title}</p>
  //                 <button onClick={(e) => likeButton(e, movie.id)}>{"Unlike"}</button>
  //               </Link>{" "}
  //             </div>
  //           );
  //         })
  //       ) || (
  //         <p> You haven't liked any movies yet... </p>
  //       )}
  //     </div>
  //   );
  // };

  const UserReviews = () => {
    return (
      <div className="userReviewsContainer">
        <h3>Manage your reviews: {user.reviews.length ? user.reviews.length : null}</h3>
        {user.reviews.length ? (
          user.reviews.map((review) => (
            <div key={review.id} className="userReviews">
              {" "}
              <img src={moviesObj[review.movieId]?.image} alt="movieposter"></img>
              <div>
                <p>{review.createdAt.slice(0, 17)}</p>
                <p> Film: {review.movie}</p>
                <p> Review: {review.review}</p>
                <p> Rating: {review.stars}</p>
              </div>
              <OpenModalButton buttonText={"Delete your review"} modalComponent={<DeleteUserReviewModal review={review} />} />
              <OpenModalButton
                buttonText={"Edit your review"}
                modalComponent={<EditReviewForm review={review} movie={review.movieId} />}
              />
            </div>
          ))
        ) : (
          <p>You haven't reviewed any movies yet... </p>
        )}
      </div>
    );
  };
  if (!movies ) return <>hey</>;

  return (
    <div className="profileContainer">
      <OpenModalButton buttonText={"Add a movie"} modalComponent={<MovieFormPage />} />
      <h3>Maintain movies you have added: {user.movies.length}</h3> <UserMadeMovies />
      {/* <h3>Movies you have liked: {userLikedMovies.length}</h3> */}

      <UserLikedMovies user={user.likeObj}/>
      <UserReviews />
    </div>
  );
};
export default ProfilePage;
