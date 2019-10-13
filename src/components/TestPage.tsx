import React from 'react';
import { Route, RouteComponentProps } from "react-router-dom"

const Page1: React.FC = () => {
  return (
    <p>1</p>
  )
}

//https://medium.com/@kaw2k/a-letter-of-appreciation-253ecab3f7d2
interface Page2 extends RouteComponentProps<{ id: string, id2: string }> {};
const Page2: React.FC<Page2> = ({ match } ) => {
  return (
    <div>
      <p>2</p>
      <p>Value: {match.params.id}</p>
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

export default TestPage