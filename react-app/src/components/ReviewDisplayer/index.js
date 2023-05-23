import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
import './reviewdisplayer.css'

const ReviewDisplayer = ({ movie }) => {
  const reviews = movie.review.map((review) => (
    <div className="reviewDiv">
      <h2>{review.review}</h2>
      <OpenModalButton buttonText={"Delete your review"} modalComponent={<DeleteReviewModal review={review} />} />
    </div>
  ));
  console.log("movie.review", reviews);

  return reviews;
};

export default ReviewDisplayer;
