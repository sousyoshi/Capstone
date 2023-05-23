import { getOneMovieThunk } from "./movies";

const GET_ALL_REVIEWS = "reviews/getAll";
const CREATE_REVIEW = "review/addOne";
const DELETE_REVIEW = "review/delete";
const EDIT_REVIEW = 'review/edit'

const getAllReviewsAction = (reviews) => {
  return {
    type: GET_ALL_REVIEWS,
    reviews,
  };
};

const createReviewAction = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

const deleteReviewAction = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

const editReviewAction = review => {
  return {
    type: EDIT_REVIEW,
    review
  }
}

export const getAllReviewsThunk = () => async (dispatch) => {
  const res = await fetch("/api/reviews");
  if (res.ok) {
    const { reviews } = await res.json();
    dispatch(getAllReviewsAction(reviews));
    return reviews;
  }
};

export const createReviewThunk = (review) => async (dispatch) => {
  const movieId = +review.get("movieId");
  const res = await fetch(`/api/movies/${movieId}/reviews`, {
    method: "POST",
    body: review,
  });
  if (res.ok) {
    const newReview = await res.json();
    console.log("review after res.ok", newReview);
    dispatch(createReviewAction(newReview));
    return newReview;
  }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteReviewAction(reviewId));

    return { message: "successful" };
  }
};

export const editReviewThunk = review => async dispatch => {
  const reviewId = +review.get('id')
  const res = await fetch(`/api/reviews/${reviewId}/edit`)
  if (res.ok){
    const review = await res.json()
    dispatch(editReviewAction(review))
    return review
  }
}

const initialState = {};
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REVIEWS: {
      const newState = { ...state };
      action.reviews.forEach((review) => (newState[review.id] = review));
      return newState;
    }
    case CREATE_REVIEW: {
      const newState = { ...state };
      newState[action.review.id] = action.review;
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewReducer;
