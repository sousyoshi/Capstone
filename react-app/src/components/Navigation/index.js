import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";


function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="navbar">
      <li>
        <NavLink exact to="/main">
          <img className="logo" alt="logo" src="flickpicks.png"></img>
        </NavLink>
      </li>
      {isLoaded && (
        <li>
          {sessionUser && (
            <NavLink className='navBar' user={sessionUser} exact to={`/users/${sessionUser.id}`}>
              Profile
            </NavLink>
          )}
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
