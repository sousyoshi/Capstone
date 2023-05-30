import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
import EditReviewForm from "../ReviewFormPage/EditReviewForm";
import "./reviewdisplayer.css";

const ReviewDisplayer = ({ movie, sessionUser }) => {
  const reviews = movie.review.map((review) => (
    <div key={review.id} className="reviewDiv">
      {sessionUser && (
        <>
          {" "}
          <div className="reviewBox">
            <div>{review.user}
              {review.createdAt.slice(0, 17)} {review.stars}{" "}
            </div>{" "}
            <div>{review.review} </div>

          </div>
          <OpenModalButton buttonText={"Delete your review"} modalComponent={<DeleteReviewModal review={review} />} />
          <OpenModalButton buttonText={"Edit your review"} modalComponent={<EditReviewForm review={review} movie={movie} />} />
        </>
      )}
    </div>
  ));

  return reviews;
};

export default ReviewDisplayer;
