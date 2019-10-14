import React from 'react';
import { RouteComponentProps, BrowserRouter, Route, Switch, Link } from "react-router-dom"
import HomePage from "../components/HomePage"
import TestPage from "../components/TestPage"
import {Header, PageNotFound} from "../components/HeaderComponent"



const AppRouter: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/test" component={TestPage} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div >
  );
}


export default AppRouter;