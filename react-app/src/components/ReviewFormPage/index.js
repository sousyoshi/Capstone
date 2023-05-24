import { createReviewThunk } from "../../store/reviews";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import "./reviewform.css";
import { getOneMovieThunk } from "../../store/movies";

const ReviewFormPage = ({ movie}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);


  useEffect(() => {
    setStars(stars);
    setReview(review);
  }, [stars, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewFormData = new FormData();
    reviewFormData.append("stars", stars);
    reviewFormData.append("review", review);
    reviewFormData.append("movieId", movie.id);

    await dispatch(createReviewThunk(reviewFormData));
    dispatch(getOneMovieThunk(movie.id));
    closeModal();

  };

  const starRating = () => {
    return (
      <div className="rating">
        {[...Array(10)].map((star, i) => {
          i++;
          return (
            <div
              key={i}
              className={i <= (hover || stars) ? "filled" : "empty"}
              onClick={() => setStars(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(stars)}
            >
             <i className="fa-solid fa-film-canister"></i>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {" "}
      <h1>What did you think of the movie?</h1>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="Just a quick review" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
        <div className="rating-input"></div>
        {starRating()}
        <p>Stars</p>
        <button type="submit" disabled={!review || !stars}>
          Submit Your Review
        </button>
      </form>
    </>
  );
};
export default ReviewFormPage;
