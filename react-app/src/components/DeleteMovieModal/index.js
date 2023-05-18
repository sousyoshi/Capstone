import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteMovieThunk } from "../../store/movies"



const DeleteMovieModal= ({movie}) =>{
const dispatch = useDispatch()
const {closeModal} = useModal()

const deleteMovie = async () => {
await dispatch(deleteMovieThunk(movie.id)).then(()=> closeModal())
}





return (
    <>
      <form className="deleteForm">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this movie?</p>
        <div>
          <button className="deleteButton" onClick={deleteMovie}>Yes (Delete Movie)</button>
          <button onClick={closeModal}>No (Keep Movie)</button>
        </div>
      </form>
    </>
  );
};


export default DeleteMovieModal
