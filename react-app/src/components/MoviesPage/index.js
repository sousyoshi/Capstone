import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesThunk } from "../../store/movies";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReviewFormPage from "../ReviewFormPage";
import OpenReviewModal from "../OpenModalButton/OpenReviewModal";
import "./moviespage.css";

function MoviesPage() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => Object.values(state.movies));
  const user = useSelector((state) => state.session.user);
  console.log(")))))))))))))))))))))))))))))))))", user);

  useEffect(() => {
    dispatch(getAllMoviesThunk());
  }, [dispatch, user]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 960 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 960, min: 0 },
      items: 3,
    },
  };
  if (!movies) return <h1>LOADING....</h1>;

  const movieGenresMapped = movies.reduce((acc, movie) => {
    acc[movie.genreStr] ? (acc[movie.genreStr] = [...acc[movie.genreStr], movie]) : (acc[movie.genreStr] = [movie]);
    return acc;
  }, {});

  const reviewLink = (movie) => {
    return <OpenReviewModal modalComponent={<ReviewFormPage movie={movie} />} />;
  };

  const likeButton = async (e, movieId) => {
    e.preventDefault();
    const res = await fetch(`/api/movies/${movieId}/like`, {
      method: "POST",
    });
    if (res.ok) {
      const like = await res.json();
      return like;
    }
  };

  const MyCarousel = () => {
    return (
      <>
        <h2>All films</h2>
        <Carousel className="mainCaro" responsive={responsive} infinite itemClass="carousel-item-padding-40-px">
          {movies.map((movie) => {
            return (
              <div key={movie.id}>
                {" "}
                <Link key={movie.id} to={`/movies/${movie.id}`}>
                  {" "}
                  <img className="carousel" alt="" src={movie.image} title={movie.title} />
                </Link>
              </div>
            );
          })}
        </Carousel>
      </>
    );
  };

  const GenreCarousel = () => {
    return Object.keys(movieGenresMapped).map((genreStr, i) => {
      return (
        <div key={movies[i].id}>
          <h3>{genreStr}</h3>

          <Carousel responsive={responsive} showDots={true} infinite>
            {movieGenresMapped[genreStr].map((movie) => {
              return (
                <Link key={movie.id} to={`/movies/${movie.id}`}>
                  {" "}
                  <img className="carousel" alt="" src={movie.image} title={movie.title} />
                  <div>
                    {reviewLink(movie)}
                    {movie.title}
                  </div>
                  <button onClick={(e) => likeButton(e, movie.id)}>
                    <i className="fa-light fa-thumbs-up"></i>
                  </button>
                </Link>
              );
            })}
          </Carousel>
        </div>
      );
    });
  };

  return (
    <div className="carouselContainer">
      <div className="mainCarousel">{<MyCarousel className="myCaro" />}</div>
      <div className="mainCarousel">{<GenreCarousel className="myCaro" />}</div>
    </div>
  );
}

export default MoviesPage;

// return (
//   <>
//     <h1 className="all-cars-h1">All Cars</h1>
//     <div className="search-car-input">
//       <input
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search for Car"
//       />
//     </div>
//     {Object.keys(cars).map((type) => {

//       return (
//         <>
//           <h3>{type ? type.toUpperCase() : "OTHERS"}</h3>
//           <div className="all-cars-container">
//             {cars[type]
//               .filter(
//                 (car) =>
//                   car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                   car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                   car.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                   car.year.toString().includes(searchTerm)
//               )
//               .map((car) => {
//                 return (
//                   <>
//                     <Link to={`/cars/${car.id}`}>
//                       <div className="car-image-info-div">
//                         <img src={car?.images[0]?.image} />
//                         <div className="all-cars-make-model">
//                           <p>
//                             {car.make} {car.model}
//                           </p>
//                           <p className="car-price">${car.price}</p>
//                         </div>
//                       </div>
//                     </Link>
//                   </>
//                 );
//               })}
//           </div>
//         </>
//       );
//     })}
//   </>
// );
// };
