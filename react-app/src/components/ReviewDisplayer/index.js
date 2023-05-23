import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
import EditReviewForm from "../ReviewFormPage/EditReviewForm";
import "./reviewdisplayer.css";

const ReviewDisplayer = ({ movie }) => {
  const reviews = movie.review.map((review) => (
    <div key={review.id} className="reviewDiv">
      <h2>{review.review}</h2>
      <OpenModalButton buttonText={"Delete your review"} modalComponent={<DeleteReviewModal review={review} />} />
      <OpenModalButton buttonText={'Edit your review'} modalComponent={<EditReviewForm review={review} movie={movie} />} />
    </div>
  ));
  console.log("movie.review", reviews);

  return reviews;
};

export default ReviewDisplayer;
