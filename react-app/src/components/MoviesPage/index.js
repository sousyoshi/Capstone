import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesThunk, getOneMovieThunk } from "../../store/movies";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./moviespage.module.css";

function MoviesPage() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => Object.values(state.movies));
  const user = useSelector((state) => state.session.user);
  const [query, setQuery] = useState("");


  useEffect(() => {
    dispatch(getAllMoviesThunk());
  }, [dispatch]);




  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 960 },
      items: 5,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 960, min: 0 },
      items: 4,
      slidesToSlide: 3,
    },
  };

  const movieGenresMapped = movies.reduce((acc, movie) => {
    acc[movie.genreStr] ? (acc[movie.genreStr] = [...acc[movie.genreStr], movie]) : (acc[movie.genreStr] = [movie]);
    return acc;
  }, {});




  const likeButton = useCallback(
    async (e, movieId) => {
      e.preventDefault();
      const res = await fetch(`/api/movies/${movieId}/like`, {
        method: "POST",
      });
      if (res.ok) {
        const like = await res.json();
        const { movieId } = like;

        dispatch(getOneMovieThunk(movieId));

        return like

      }
    },
    [dispatch]
  );

  if (!movies) return <h1>LOADING....</h1>;

  const myCarousel = () => {
    return (
      <>
        <div className={styles.searchBar}>
          <input
            type="search"
            value={query}
            placeholder="Search for movies by name, genre, and release year."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <h2>{query.length ? query : "All Films"}</h2>
        <Carousel responsive={responsive} infinite>
          {movies
            .filter(
              (movie) =>
                movie.title.toLowerCase().includes(query.toLocaleLowerCase()) ||
                movie.releaseYear.toString().includes(query) ||
                movie.genreStr.toLowerCase().includes(query.toLocaleLowerCase())
            )
            .sort((a, b) => a.releaseYear - b.releaseYear)
            .map((movie) => {
              return (
                <div className={styles.movieImage}>
                  <Link key={movie.id} to={`/movies/${movie.id}`}>
                    <img className={styles.carousel} alt="" src={movie.image} title={movie.title} />
                  </Link>
                  {user && (
                    <button id={styles.likeButton} onClick={(e) => likeButton(e, movie.id)}>
                      {
                        <i
                          className={movie.like.find((like) => like.owner === user.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                        />
                      }
                    </button>
                  )}
                </div>
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
              <h2>{genreStr}</h2>
              <Carousel responsive={responsive} infinite>
                {movieGenresMapped[genreStr].map((movie) => {
                  return (
                    <div className={styles.movieImage} key={movie.id}>
                      <Link to={`/movies/${movie.id}`}>
                        {" "}
                        <img className={styles.carousel} alt="" src={movie.image}></img>
                      </Link>
                      {user && (
                        <button id={styles.likeButton} onClick={(e) => likeButton(e, movie.id)}>
                          {
                            <i
                              className={
                                movie.like.find((like) => like.owner === user.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"
                              }
                            />
                          }
                        </button>
                      )}
                      <div className={styles.movieTitle}>
                        <Link to={`/movies/${movie.id}`}>
                          {movie.title} ({movie.releaseYear})
                        </Link>
                      </div>{" "}
                      {!!movie.review.length && (
                        <div>
                          {movie.review.map((review) => review.stars).reduce((acc, el) => acc + el) / movie.review.length}{" "}
                          <i className="fa-regular fa-star" />{" "}
                        </div>
                      )}
                    </div>
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
