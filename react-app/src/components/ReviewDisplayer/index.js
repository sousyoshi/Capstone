import DeleteReviewModal from "../DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
import EditReviewForm from "../ReviewFormPage/EditReviewForm";
import { useSelector } from "react-redux";
import styles from "./reviewdisplayer.module.css";

const ReviewDisplayer = ({ movie }) => {
  const sessionUser = useSelector((state) => state.session.user);

  const reviews = movie.review.map((review) => (
    <div key={review.id} className={styles.reviewDiv}>
      {
        <>
          {" "}
          <div className={styles.reviewBox}>
             <p className={styles.stars}> {review.stars} / 10</p><div> {review.user}</div>
            <p className={styles.dateThing}>Date: {review.createdAt.slice(0, 17)} </p>

            <p>{review.review} </p>
          </div>
          {sessionUser?.id === review.userId && (
            <div className={styles.userButtons}>
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
