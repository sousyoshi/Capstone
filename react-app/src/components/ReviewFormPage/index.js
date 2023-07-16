import { createReviewThunk } from "../../store/reviews";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getOneMovieThunk } from "../../store/movies";
import "./reviewform.css";

const ReviewFormPage = ({ movie }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [valErrors, setValErrors] = useState([]);

  useEffect(() => {
    setStars(stars);
    setReview(review);
  }, [stars, review]);

  useEffect(() => {
    const errors = [];
    if (!review) errors.push("Please enter a review");
    if (review.length < 5) errors.push("Review must be longer than 5 characters");
    if (!stars) errors.push("Please enter a star rating.");
    setValErrors(errors);
  }, [review, stars]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const reviewFormData = new FormData();
    reviewFormData.append("stars", stars);
    reviewFormData.append("review", review);
    reviewFormData.append("movieId", movie.id);

    dispatch(createReviewThunk(reviewFormData));
    dispatch(getOneMovieThunk(movie.id));
    if (!valErrors.length) closeModal();
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
              <i className="fa-regular fa-star"></i>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {" "}
      {hasSubmitted && valErrors.length > 0 && (
        <div>
          <ul>
            {valErrors.map((error) => (
              <li className="errors" key={error}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}{" "}
      <form className="reviewForm" encType="multipart/form-data" onSubmit={handleSubmit}>
        <textarea rows={6} placeholder="Just a quick review" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
        <div className="rating-input">{starRating()}</div>

        <button type="submit">Submit Your Review</button>
      </form>
    </>
  );
};
export default ReviewFormPage;
