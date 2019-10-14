import React from 'react';
import { Route, RouteComponentProps } from "react-router-dom"

const UserAdd: React.FC = () => {
  return (
    <p>To be done later</p>
  )
}

//Displays user profile
interface UserGet extends RouteComponentProps<{ id: string, id2: string }> {};
const UserGet: React.FC<UserGet> = ({ match } ) => {
  return (
    <div>
      <h1>Get User Details</h1>
      <p>UserID: {match.params.id}</p>
    </div>
  )
}

const TestPage: React.FC = () => {
  return (
    <div>
      <p>User page</p>
      <Route path="/User/Add" component={UserAdd} />
      <Route path="/User/Get/:id/" component={UserGet} />
    </div>
  )
}

export default TestPage