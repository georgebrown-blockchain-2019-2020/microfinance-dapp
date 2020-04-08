import React, { useEffect } from "react";
import "./LoginPage.scss";
import Logo from "../../assets/image/icon.png";
import { connect } from "react-redux";
import MetamaskLogo from "../../assets/image/metamask.png";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

function LoginPage(props) {
  const {
    infor,
    contractAddr,
    authRedirectPath,
    loading,
    error,
    onSetAuthRedirectPath,
    onAuth
  } = props;
  useEffect(() => {
    if (infor) {
      onSetAuthRedirectPath("/");
    } else {
      onSetAuthRedirectPath("/infor");
    }
  }, [infor, onSetAuthRedirectPath]);
  return (
    <div className="bg-color">
      {!!contractAddr && <Redirect to={authRedirectPath} />}
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
    contractAddr: state.contractAddr,
    infor: state.infor,
    loading: state.loading,
    error: state.error,
    authRedirectPath: state.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: () => dispatch(actions.auth()),
    onSetAuthRedirectPath: path => dispatch(actions.setDirectPath(path))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
