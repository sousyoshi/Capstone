import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { getOneMovieThunk } from "../../store/movies";

const EditReviewForm = ({ review, movie }) => {
  const dispatch = useDispatch();
  const [review2, setReview2] = useState(review.review);
  const [stars, setStars] = useState(review.stars);
  const [hover, setHover] = useState(0);
  const { closeModal } = useModal();

  useEffect(() => {
    setStars(stars);
    setReview2(review2);
  }, [stars, review2]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewFormData = new FormData();
    reviewFormData.append("stars", stars);
    reviewFormData.append("review", review2);
    reviewFormData.append("id", review.id);

    await dispatch(editReviewThunk(reviewFormData));
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
      <form onSubmit={handleSubmit} encType="mulitpart/form-data">
        <textarea value={review2} placeholder="Just a quick review" onChange={(e) => setReview2(e.target.value)}></textarea>
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

export default EditReviewForm;
