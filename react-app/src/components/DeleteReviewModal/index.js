import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { getOneMovieThunk } from "../../store/movies";

const DeleteReviewModal = ({ review }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const deleteReview = async (e) => {
    e.preventDefault();
    await dispatch(deleteReviewThunk(review.id));
    dispatch(getOneMovieThunk(review.movieId))

    closeModal();
    history.push(`/movies/${review.movieId}`);
  };

  return (
    <>
      {" "}
      <form onSubmit={deleteReview} className="deleteForm">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this review?</p>
        <div>
          <button className="deleteButton" type="submit">
            Yes (Delete Review)
          </button>
          <button onClick={closeModal}>No (Keep Review)</button>
        </div>
      </form>
    </>
  );
};

export default DeleteReviewModal;
