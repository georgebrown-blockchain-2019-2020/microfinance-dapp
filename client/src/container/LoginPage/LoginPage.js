import React from "react";
import "./LoginPage.scss";
import Logo from "../../assets/image/icon.png";
import { connect } from "react-redux";
import MetamaskLogo from "../../assets/image/metamask.png";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

function LoginPage(props) {
  const { address, authRedirectPath, loading, error, onAuth } = props;
  return (
    <div className="bg-color">
      {!!address && <Redirect to={authRedirectPath} />}
      <div className="login__content">
        <div className="login__title">
          <img src={Logo} alt="logo" />
          <h2>
            Welcome to De<span className="txt-orange">Micro</span>Fi
          </h2>
        </div>

        <div className="btn-login">
          <button disabled={loading} onClick={() => onAuth()}>
            Login with Metamask
          </button>
          <img src={MetamaskLogo} alt="metamask" />
        </div>
        {loading && <CircularProgress />}
        {!!error && <p>{error}</p>}
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    address: state.address,
    loading: state.loading,
    error: state.error,
    authRedirectPath: state.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: () => dispatch(actions.auth())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
