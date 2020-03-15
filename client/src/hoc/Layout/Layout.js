import React, { useState, useEffect } from "react";
import Navigation from "../../container/Navigation/Navigation";
import Cover from "../../assets/image/cover.jpg";
import "./Layout.scss";
function Layout(props) {
  return (
    <React.Fragment>
      <Navigation />
      <div className="banner"></div>
      <div className="content">{props.children}</div>
    </React.Fragment>
  );
}

export default Layout;
