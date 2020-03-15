import React, { Suspense } from "react";
import "./App.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BackDrop from "./component/BackDrop/BackDrop";
import Loading from "./assets/image/loading-heart.svg";
const FundPage = React.lazy(() => {
  return import("./container/FundPage/FundPage");
});
function App() {
  return (
    <Layout>
      <p>Someone needs your help</p>

      <Suspense
        fallback={
          <BackDrop show="true">
            <img src={Loading} alt="spinner" className="spinner" />
          </BackDrop>
        }
      >
        <Switch>
          <Route />
          <Route />
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
