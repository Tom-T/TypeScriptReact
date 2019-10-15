import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "../components/HeaderModule";
import App from "../components/App";
import TestPage from "../components/TestPage";


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
          <Switch>
            <Route path="/" component={App} exact={true} />
            <Route path="/test" component={TestPage} />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  };
}