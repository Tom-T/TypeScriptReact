import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render = () => {
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/test">Test</Link>
        </nav>
        <header className="App-header" />
      </div>
    );
  };
}
