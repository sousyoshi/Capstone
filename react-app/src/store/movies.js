const GET_ALL_MOVIES = "movies/getAll";

const getAllMoviesAction = (movies) => {
  return {
    type: GET_ALL_MOVIES,
    movies,
  };
};

export const getAllMoviesThunk = () => async (dispatch) => {
  const res = await fetch("/api/movies");
  if (res.ok) {
    const  {movies}  = await res.json();
    console.log("movies", movies)
    dispatch(getAllMoviesAction(movies));
    return movies
  } 
};




const initialState = {};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MOVIES:
      const newState = { ...state };
      console.log(action)
      action.movies.forEach((movie) => {
        newState[movie.id] = movie;
      });
      return newState;
    default:
      return state;
  }
};

export default movieReducer;
