import React from 'react';
import { RouteComponentProps, BrowserRouter, Route, Switch, Link } from "react-router-dom"
import HomePage from "../components/HomePage"
import TestPage from "../components/TestPage"

const Header: React.FC = () => {
  return (
    <div>
      <Nav />
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const PageNotFound: React.FC = () => {
  return (<h1> Page not found!</h1>)
}

const Nav: React.FC = () => {
  return (<nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/test">Test</Link>
      </li>
      <li>
        <Link to="/test/page1/">Test Page 1</Link>
      </li>
      <li>
        <Link to="/test/page2/2/thisissomething">Test Page 2.2</Link>
      </li>
    </ul>
  </nav>
  )
}

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