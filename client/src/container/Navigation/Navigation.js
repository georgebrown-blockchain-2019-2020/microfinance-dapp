import React, { useState, useEffect } from "react";
import "./Navigation.scss";
import { NavLink } from "react-router-dom";
import Icon from "../../assets/image/icon.png";
function Navigation() {
  const stickDiv = React.createRef();
  console.log(stickDiv);
  const [headerClass, setHeaderClass] = useState(["header"]);
  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setHeaderClass(["header", "header-scroll"]);
    } else {
      console.log("reach");
      setHeaderClass(["header"]);
    }
  };
  console.log(headerClass);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={headerClass.join(" ")}>
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
          account
        </NavLink>
      </nav>
      <img src={Icon} alt="icon" className="header__icon" />
    </header>
  );
}

export default Navigation;
