import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "../components/HeaderModule";
import App from "../components/App";
import TestPage from "../components/TestPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.scss"


class PageNotFound extends React.Component {
  render = () => {
    return <h1> Page not found!</h1>;
  };
}

export default class AppRouter extends React.Component {
  render = () => {
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <div>
            <Switch>
              <Route path="/" component={App} exact={true} />
              <Route path="/test" component={TestPage} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  };
}