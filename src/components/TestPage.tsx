import React from "react";
import { Link, Route, RouteComponentProps } from "react-router-dom";

class Page1 extends React.Component {
  render = () => {
    return <h1>Page 1</h1>;
  };
}


//https://medium.com/@kaw2k/a-letter-of-appreciation-253ecab3f7d2

interface Page2 extends RouteComponentProps<{ id: string; id2: string }> {}

class Page2 extends React.Component<Page2> {
  // constructor(props: Page2) {
  //   super(props);
  // }
  render() {
    console.log(this.props);
    return (
      <div>
        <p>2</p>
        <p> Value: {this.props.match.params.id}</p>
        <p> test: {this.props.match.params.id2} </p>
      </div>
    );
  }
}

export default class TestPage extends React.Component {
  render = () => {
    return (
      <div>
        <p>Test page</p>
        <nav className="mainNav">
          <h2>Test Nav</h2>
          <Link to="/test/page1/">Test Page 1</Link>
          <Link to="/test/page2/2/thisissomething">Test Page 2.2</Link>
        </nav>
        <Route path="/test/page1" component={Page1} />
        <Route path="/test/page2/:id/:id2" component={Page2} />
      </div>
    );
  };
}
