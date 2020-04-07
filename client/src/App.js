import React, { Suspense } from "react";
import "./App.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BackDrop from "./component/BackDrop/BackDrop";
import Loading from "./assets/image/loading-heart.svg";
import LoginPage from "./container/LoginPage/LoginPage";
const FundPage = React.lazy(() => {
  return import("./container/FundPage/FundPage");
});
const AccountPage = React.lazy(() => {
  return import("./container/AccountPage/AccountPage");
});
function App() {
  return (
    // <Layout>
    //   <Suspense
    //     fallback={
    //       <BackDrop show="true">
    //         <img src={Loading} alt="spinner" className="spinner" />
    //       </BackDrop>
    //     }
    //   >
    //     <Switch>
    //       <Route path="/" exact render={props => <FundPage {...props} />} />
    //       <Route
    //         path="/account"
    //         exact
    //         render={props => <AccountPage {...props} />}
    //       />
    //       <Redirect to="/" />
    //     </Switch>
    //   </Suspense>
    // </Layout>
    <LoginPage />
  );
}

export default App;
