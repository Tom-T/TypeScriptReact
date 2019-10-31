import React from 'react';
import { RouteComponentProps } from "react-router-dom"
import { createConnection } from "typeorm";
import { User } from "../models/people"

interface iUserFormData extends HTMLFormElement {
  first: HTMLFormElement,
  last: HTMLFormElement,
  email: HTMLFormElement,
  password: HTMLFormElement,
  confpass: HTMLFormElement
}

class UserAdd extends React.Component<{}, { value: string }> {
  state = { value: "" };

  async handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const elements = target as iUserFormData;

    const firstName = elements.first.value;
    const lastName = elements.last.value;
    const email = elements.email.value;
    const password = elements.password.value;

    createConnection().then(async connection => {
      const newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.password = password;

      await connection.manager.save(newUser);
    });

    console.log(elements.email.value);
    // console.log(event.target.elements.email.value)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="d-inline-block">
            <label>
              First:
              <input type="text" name="first" placeholder="Firstname" />
            </label>
          </div>
          <div className="d-inline-block">
            <label>
              Last:
              <input type="text" name="last" placeholder="Lastname" />
            </label>
          </div>
          <div className="d-inline-block">
            <label>
              Email:
              <input type="text" name="email" placeholder="Email@domain.com" />
            </label>
          </div>
          <div className="d-inline-block">
            <label>
              Password:
              <input type="password" name="password" />
            </label>
          </div>
          <div className="d-inline-block">
            <label>
              Confirm Password:
              <input type="password" name="confpass" />
            </label>
          </div>
          <div className="d-inline-block">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

//Displays user profile
interface UserGet extends RouteComponentProps<{ id: string, id2: string }> { };
const UserGet: React.FC<UserGet> = ({ match }) => {
  return (
    <div>
      <h1>Get User Details</h1>
      <p>UserID: {match.params.id}</p>
    </div>
  )
}

const UserPage: React.FC = () => {
  return (
    <div>
      <h2>User page</h2>
      <UserAdd />
      {/* <Route path="/User/Add" component={UserAdd} /> */}
      {/* <Route path="/User/Get/:id/" component={UserGet} /> */}
    </div>
  )
}

export default UserPage