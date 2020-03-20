import React, { useState, useEffect } from "react";
import Navigation from "../../container/Navigation/Navigation";
import Footer from "../../container/Footer/Footer";
import "./Layout.scss";
function Layout(props) {
  return (
    <React.Fragment>
      <Navigation />
      <div className="content">{props.children}</div>
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
