import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteMovieThunk } from "../../store/movies";


import "./deletemovie.css";

const DeleteMovieModal = ({ user, movie }) => {
  const dispatch = useDispatch();


  const { closeModal } = useModal();

  const deleteMovie = async () => {

   await dispatch(deleteMovieThunk(movie.id));

    closeModal();
  };

  return (
    <>
      <form onSubmit={deleteMovie} className="deleteForm" encType="multipart/form-data">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this movie?</p>
        <div>
          <button className="deleteButton" type="submit">
            Yes (Delete Movie)
          </button>
          <button onClick={closeModal}>No (Keep Movie)</button>
        </div>
      </form>
    </>
  );
};

export default DeleteMovieModal;
