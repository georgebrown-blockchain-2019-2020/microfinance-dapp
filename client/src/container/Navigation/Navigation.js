import React from "react";
import "./Navigation.scss";
import { NavLink } from "react-router-dom";
import Icon from "../../assets/image/icon.png";
function Navigation() {
  return (
    <header className="header">
      <div className="title">Microfinance</div>
      <nav className="nav">
        <NavLink
          to="/home"
          exact
          className="nav__item"
          activeClassName="nav__item-active"
        >
          fund
        </NavLink>
        <NavLink
          to="/request"
          exact
          className="nav__item"
          activeClassName="nav__item-active"
        >
          request
        </NavLink>
      </nav>
      <img src={Icon} alt="icon" className="header__icon" />
    </header>
  );
}

export default Navigation;
