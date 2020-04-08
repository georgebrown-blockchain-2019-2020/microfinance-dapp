import React, { Suspense } from "react";
import "./App.scss";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import BackDrop from "./component/BackDrop/BackDrop";
import Loading from "./assets/image/loading-heart.svg";
const UserPage = React.lazy(() => {
  return import("./container/UserPage/UserPage");
});
const LoginPage = React.lazy(() => {
  return import("./container/LoginPage/LoginPage");
});
const InfoPage = React.lazy(() => {
  return import("./container/InfoPage/InfoPage");
});
function App(props) {
  let routes = null;
  if (!!props.contractAddr) {
    routes = (
      <Switch>
        <Route path="/infor" render={props => <InfoPage {...props} />} />
        <Route path="/" render={props => <UserPage {...props} />} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" render={props => <UserPage {...props} />} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Suspense
      fallback={
        <BackDrop open={true}>
          <Loading />
        </BackDrop>
      }
    >
      {routes}
    </Suspense>
  );
}
const mapStateToProps = state => {
  return {
    contractAddr: state.contractAddr,
    infor: state.infor
  };
};
export default connect(mapStateToProps)(App);
