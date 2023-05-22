import { createReviewThunk } from "../../store/reviews";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory} from 'react-router-dom'


const ReviewFormPage = ({ movie }) => {
    const history = useHistory()
  const dispatch = useDispatch();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
//   const sessionUser = useSelector((state) => state.session.user);
//   const { closeModal } = useModal();

  useEffect(() => {
    setStars(stars);
    setReview(review);


  }, [stars, review]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const reviewFormData = new FormData()
    reviewFormData.append('stars', stars )
    reviewFormData.append('review', review)
    reviewFormData.append('movieId', movie.id)

    for(let keys of reviewFormData){
        console.log(keys)
    }
    await dispatch(createReviewThunk(reviewFormData))
    history.push(`/api/movies/${movie.id}`)
}



  const starRating = () => {
    return (
      <div className="rating">
        {[...Array(10)].map((star, i) => {
          i++;
          return (
            <div
              key={i}
              className={i <= (hover || stars) ? "filled" : "empty"}
              onClick={() => setStars(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(stars)}
            >
              {console.log(i)}
              h
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {" "}
      <h1>What did you think of the movie?</h1>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="Just a quick review" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
        <div className="rating-input"></div>
        {starRating()}
        <p>Stars</p>
        <button type="submit" disabled={!review || !stars}>Submit Your Review</button>
      </form>
    </>
  );




};
export default ReviewFormPage;
