import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";

class UserAdd extends React.Component<{}, { value: string }> {
  state = { value: "" };

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

//Displays user profile
interface UserGet extends RouteComponentProps<{ id: string; id2: string }> {}
const UserGet: React.FC<UserGet> = ({ match }) => {
  return (
    <div>
      <h1>Get User Details</h1>
      <p>UserID: {match.params.id}</p>
    </div>
  );
};

const TestPage: React.FC = () => {
  return (
    <div>
      <p>User page</p>
      <Route path="/User/Add" component={UserAdd} />
      <Route path="/User/Get/:id/" component={UserGet} />
    </div>
  );
};

export default TestPage;
