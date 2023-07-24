import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MoviesPage from "./components/MoviesPage";
import MovieFormPage from "./components/MovieFormPage";
import EditMovieForm from "./components/MovieFormPage/EditMovieForm";
import MoviePage from "./components/MoviePage";
import ReviewFormPage from "./components/ReviewFormPage";
import SplashPage from "./components/SplashPage";
import ProfilePage from "./components/ProfilePage";
import UserProfilePage from "./components/UserProfilePage";
import { getAllMoviesThunk } from "./store/movies";
import { getAllUsersThunk } from "./store/users";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(authenticate())
      .then(() => dispatch(getAllMoviesThunk()))
      .then(() => dispatch(getAllUsersThunk()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/main">
            <MoviesPage />
          </Route>
          <Route exact path="/movies/new">
            <MovieFormPage />
          </Route>
          <Route exact path="/movies/:movieId/edit">
            <EditMovieForm />
          </Route>
          <Route exact path="/movies/:movieId">
            <MoviePage />
          </Route>
          <Route exact path="/movies/:movieId/review">
            <ReviewFormPage />
          </Route>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/users/:userId">
            {" "}
            <UserProfilePage />
          </Route>
          <Route>404 Page Not Found</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
