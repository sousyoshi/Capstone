import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
import EditReviewForm from "../ReviewFormPage/EditReviewForm";
import "./reviewdisplayer.css";

const ReviewDisplayer = ({ movie, sessionUser, reviews }) => {
  const reviewMapper = reviews.map((review) => (
    <div key={review.id} className="reviewDiv">
      {sessionUser && (
        <>
          {" "}
          <div className="reviewBox">
            <div>User: {review.user}</div>
            <div>
              Date: {review.createdAt.slice(0, 17)}Rating: {review.stars} <i className="fa-regular fa-star"></i>{" "}
            </div>{" "}
            <div>Review: {review.review} </div>
          </div>
        { sessionUser.id === review.userId && <div>
            {" "}
            <OpenModalButton buttonText={"Delete your review"} modalComponent={<DeleteReviewModal review={review} />} />
            <OpenModalButton buttonText={"Edit your review"} modalComponent={<EditReviewForm review={review} movie={movie}  />} />
          </div>}
        </>
      )}
    </div>
  ));

  return reviewMapper;
};

export default ReviewDisplayer;
