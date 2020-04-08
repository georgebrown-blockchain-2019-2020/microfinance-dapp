import React, { useState } from "react";
import "./Footer.scss";
import Logo from "../../assets/image/icon.png";
import { NavLink } from "react-router-dom";
function Footer() {
  const navigationsList = useState([
    { url: "/", name: "fund" },
    { url: "/account", name: "account" }
  ])[0];
  return (
    <div className="footer">
      <div className="footer__logo-box">
        <picture className="footer__logo">
          <img src={Logo} alt="Full Logo" className="footer__logo" />
        </picture>
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <div className="footer__navigation">
            <ul className="footer__list">
              {navigationsList.map(nav => (
                <li className="footer__item" key={nav.name}>
                  <NavLink to={nav.url} exact className="footer__link">
                    {nav.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-1-of-2">
          <p className="footer__copyright">
            Built by
            <a
              href="https://www.linkedin.com/in/leo-tuan-dinh-318709193/"
              className="footer__link footer__reference"
            >
              Leo Tuan Dinh
            </a>
          </p>
          <div>
            Icons made by
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            ,
            <a
              href="https://www.flaticon.com/authors/smashicons"
              title="Smashicons"
            >
              Smashicons
            </a>
            from
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
