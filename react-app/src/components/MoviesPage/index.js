import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesThunk } from "../../store/movies";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './moviespage.css'

function MoviesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesThunk());
  }, [dispatch]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const movies = useSelector((state) => Object.values(state.movies));
  // const movieMapper = () =>
  //   movies.map((movie) => {
  //     return (
  //       <ul key={movie.id}>
  //         {" "}
  //         <li>
  //           {" "}
  //           <Carousel responsive={responsive}>
  //             <img alt="poster" src={movie.image} />
  //           </Carousel>
  //           <ReactPlayer url={movie.trailer} width={"50%"} controls light={true} />
  //         </li>
  //       </ul>
  //     );
  //   });

  const MyCarousel = () => {
    return (
      <Carousel  responsive={responsive}  showDots={true}>
        {movies.map((movie) => {
          return (
            <Link to={`/movies/${movie.id}`}>
              {" "}
              <img className="carousel" alt="" src={movie.image} /> 
            </Link>
          );
        })}
      </Carousel>
    );
  };





  return <main>{<MyCarousel className='myCaro' />}</main>;
}

export default MoviesPage;
