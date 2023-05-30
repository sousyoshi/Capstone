import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesThunk } from "../../store/movies";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./moviespage.css";

function MoviesPage() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => Object.values(state.movies));
  const user = useSelector((state) => state.session.user);
  const [query, setQuery] = useState("");

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
      items: 4,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 960, min: 0 },
      items: 4,
    },
  };
  if (!movies) return <h1>LOADING....</h1>;

  const movieGenresMapped = movies.reduce((acc, movie) => {
    acc[movie.genreStr] ? (acc[movie.genreStr] = [...acc[movie.genreStr], movie]) : (acc[movie.genreStr] = [movie]);
    return acc;
  }, {});



  const likeButton = async (e, movieId) => {
    e.preventDefault();
    const res = await fetch(`/api/movies/${movieId}/like`, {
      method: "POST",
    });
    if (res.ok) {
      const like = await res.json();
      dispatch(getAllMoviesThunk());
      return like;
    }
  };

  const myCarousel = () => {
    return (
      <>
        <div className="searchBar">
          <input
            size={50}
            placeholder="Search for movies by name, genre, and release year."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <h2>{query.length ? query : "All Films"}</h2>
        <Carousel responsive={responsive} infinite itemClass="carousel-item-padding-40-px">
          {movies
            .filter(
              (movie) =>
                movie.title.toLowerCase().includes(query.toLocaleLowerCase()) ||
                movie.releaseYear.toString().includes(query) ||
                movie.genreStr.toLowerCase().includes(query.toLocaleLowerCase())
            )
            .map((movie) => {
              return (
                <>
                  <Link key={movie.id} to={`/movies/${movie.id}`}>
                    <img className="carousel" alt="" src={movie.image} title={movie.title} />
                  </Link>
                  {user && (
                    <button className="likeButton" onClick={(e) => likeButton(e, movie.id)}>
                      {
                        <i
                          className={movie.like.find((like) => like.owner === user.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                        />
                      }
                    </button>
                  )}
                </>
              );
            })}
        </Carousel>
      </>
    );
  };

  const GenreCarousel = () => {
    return (
      <>
        {Object.keys(movieGenresMapped).map((genreStr, i) => {
          return (
            <div key={i}>
              <h3>{genreStr}</h3>
              <Carousel responsive={responsive} infinite>
                {movieGenresMapped[genreStr].map((movie) => {
                  return (
                    <>
                      <Link key={movie.id} to={`/movies/${movie.id}`}>
                        {" "}
                        <img className="carousel" alt="" src={movie.image} />
                      </Link>
                      {movie.review.reduce((acc, el) => {
                        const avg = acc + el.stars / movie.review.length;
                        return (
                          <>
                            <p>
                              {avg === 0 ? 'null' : +avg}
                              <i className="fa-regular fa-star" />
                            </p>
                          </>
                        );
                      },0)}
                       {user && (
                    <button className="likeButton" onClick={(e) => likeButton(e, movie.id)}>
                      {
                        <i
                          className={movie.like.find((like) => like.owner === user.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                        />
                      }
                    </button>
                  )}
                    </>
                  );
                })}
              </Carousel>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="mainCarousel">{myCarousel()} </div>
      <div className="mainCarousel">{<GenreCarousel />}</div>
    </>
  );
}

export default MoviesPage;
