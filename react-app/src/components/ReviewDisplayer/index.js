import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
import EditReviewForm from "../ReviewFormPage/EditReviewForm";
import "./reviewdisplayer.css";
import { useSelector } from "react-redux";

const ReviewDisplayer = ({ movie }) => {
  const sessionUser = useSelector((state) => state.session.user);

  const reviews = movie.review.map((review) => (
    <div key={review.id} className="reviewDiv">
      {
        <>
          {" "}
          <div className="reviewBox">
            <div> {review.user}</div>
            <div>Date: {review.createdAt.slice(0, 17)} </div>{" "}
            <div>
              {" "}
              Rating: {review.stars}  / 10{" "}
            </div>
            <div>Review: {review.review} </div>
          </div>
          {sessionUser?.id === review.userId && (
            <div>
              {" "}
              <OpenModalButton
                buttonText={"Delete your review"}
                modalComponent={<DeleteReviewModal movie={movie} review={review} />}
              />
              <OpenModalButton buttonText={"Edit your review"} modalComponent={<EditReviewForm review={review} movie={movie} />} />
            </div>
          )}
        </>
      }
    </div>
  ));

  return reviews;
};

export default ReviewDisplayer;
