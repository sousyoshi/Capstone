const GET_ALL_MOVIES = "movies/getAll";
const CREATE_MOVIE = "movie/addOne";
const DELETE_MOVIE = "movie/deleteOne";
const GET_ONE_MOVIE = 'movie/getOne'

const getAllMoviesAction = (movies) => {
  return {
    type: GET_ALL_MOVIES,
    movies,
  };
};

const createMovieAction = (movie) => {
  return {
    type: CREATE_MOVIE,
    movie,
  };
};

const deleteOneMovieAction = (movieId) => {
  return {
    type: DELETE_MOVIE,
    movieId,
  };
};

const getOneMovieAction = movie =>{
  return {
    type: GET_ONE_MOVIE,
    movie
  }
}

export const getAllMoviesThunk = () => async (dispatch) => {
  const res = await fetch("/api/movies");
  if (res.ok) {
    const { movies } = await res.json();
    console.log("movies", movies);
    dispatch(getAllMoviesAction(movies));
    return movies;
  }
};

export const createMovieThunk = (movie) => async (dispatch) => {
  const res = await fetch("/api/movies/new", {
    method: "POST",
    body: movie,
  });
  if(res.ok) {
    const movie = await res.json();
    dispatch(createMovieAction);
    return movie;
  }
};

export const deleteMovieThunk = (movieId) => async (dispatch) => {
  const res = await fetch(`/api/movies/${movieId}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteOneMovieAction(movieId));
    return { message: "successful" };
  }
};

export const getOneMovieThunk = movieId => async dispatch =>{
  const res = await fetch(`/api/movies/${movieId}`);
  if(res.ok){
    const movie = await res.json()
    dispatch(getOneMovieAction(movie))
    return movie
  }
}

const initialState = {};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MOVIES: {
      const newState = { ...state };
      console.log(action);
      action.movies.forEach((movie) => {
        newState[movie.id] = movie;
      });
      return newState;
    }
    case CREATE_MOVIE: {
      const newState = [...state];
      newState[action.movie.id] = action.movie;
      return newState;
    }
    case DELETE_MOVIE:
      const newState = { ...state };
      delete newState[action.movieId];
      return newState;
    default:
      return state;
  }
};

export default movieReducer;
