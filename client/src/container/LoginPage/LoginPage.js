import React from "react";
import "./LoginPage.scss";
import Logo from "../../assets/image/icon.png";
import MetamaskLogo from "../../assets/image/metamask.png";
function LoginPage() {
  return (
    <div className="login">
      <div className="login__content">
        <img src={Logo} alt="logo" />
        <h2>
          Welcome to De<span className="txt-orange">Micro</span>Fi
        </h2>
        <div className="btn-login">
          <span>Connect with Metamask</span>
          <img src={MetamaskLogo} alt="metamask" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
