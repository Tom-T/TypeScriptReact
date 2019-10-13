import React from 'react';
import ReactDOM from 'react-dom';
import { RouteComponentProps, BrowserRouter, Route, Switch, Link } from "react-router-dom"
import './index.css';
import * as serviceWorker from './serviceWorker';


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
const MainPage: React.FC = () => {
  return (
    <div><p>Main page</p></div>
  )
}
const Page1: React.FC = () => {
  return (
    <p>1</p>
  )
}

// type TParams = { params: { id: string } };
// const Page2: React.FC = (match: RouteComponentProps<TParams>) => {

const Page2: React.FC = () => {
  return (
    <div>
      <p>2</p>
      {/* <p>Value: {match.params.id}</p> */}
    </div>
  )
}

const TestPage: React.FC = () => {
  return (
    <div>
      <p>Test page</p>
        <Route path="/test/page1" component={Page1} />
        <Route path="/test/page2/:id" component={Page2} />
    </div>
  )
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
          <Link to="/test/page2/2">Test Page 2.2</Link>
        </li>
      </ul>
  </nav>
  )
}
const App1: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Switch>
          <Route path="/" component={MainPage} exact={true} />
          <Route path="/test" component={TestPage} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div >
  );
}


ReactDOM.render(<App1 />, document.getElementById('root'));

// If you want your app to work xoffline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
