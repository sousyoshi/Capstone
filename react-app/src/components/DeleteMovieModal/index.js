import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteMovieThunk } from "../../store/movies";
import { useHistory } from "react-router-dom";
import './deletemovie.css'

const DeleteMovieModal = ({ movie }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const deleteMovie = async (e) => {
    e.preventDefault();
    await dispatch(deleteMovieThunk(movie.id));

    closeModal();
    history.push("/main");
  };

  return (
    <>
      <form onSubmit={deleteMovie} className="deleteForm">
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
