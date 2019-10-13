import React from 'react';
import { Route, RouteComponentProps } from "react-router-dom"

const Page1: React.FC = () => {
  return (
    <p>1</p>
  )
}

type TParams = { id: string };
const Page2: React.FC = ({ match }: any) => {
  return (
    <div>
      <p>2</p>
      <p>Value: {match.params.id}</p>
      <p> test:  </p>
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

export default TestPage