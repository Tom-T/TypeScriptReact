import React from 'react';
import { Route, RouteComponentProps } from "react-router-dom"

export default class Page1 extends React.Component {
  formSubmission = (e: any) => {
    e.preventDefault();
    console.log(e)
  }
  render = () => {
    return (
      <div>
        <h1>Page1 test</h1>
        <form onSubmit={this.formSubmission}>
        <input type="text" name="textname" />
        <input type="submit" value="Go!" />
        </form>
      </div>
  
    )
  }
}


//https://medium.com/@kaw2k/a-letter-of-appreciation-253ecab3f7d2
interface Page2 extends RouteComponentProps<{ id: string, id2: string }> { };
const Page2: React.FC<Page2> = ({ match }) => {
  console.log("search", match)

  return (
    <div>
      <p>2</p>
      <p>Value: {match.params.id}</p>
      <p> test: {match.params.id2} </p>
      <p> test: {match.params.id2} </p>
    </div>
  )
}

const TestPage: React.FC = () => {
  return (
    <div>
      <p>Test page</p>
      <Route path="/test/page1" component={Page1} />
      <Route path="/test/page2/:id/:id2" component={Page2} />
    </div>
  )
}