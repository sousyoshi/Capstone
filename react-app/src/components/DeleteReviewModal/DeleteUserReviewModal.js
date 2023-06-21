import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";
import { authenticate } from "../../store/session";
import { getOneMovieThunk } from "../../store/movies";

const DeleteUserReviewModal = ({ review, movie }) => {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const deleteReview = async (e) => {
    e.preventDefault();
    await dispatch(deleteReviewThunk(review.id));
    await dispatch(authenticate());
    await closeModal();
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

export default DeleteUserReviewModal;
