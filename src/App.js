import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import FormInput from "./Components/forms/FormInput";
import Button from './Components/util/Button'

class App extends React.Component {
  state = {
    user: {
      username: "",
      password: "",
    },
    errors: {},
    isLoggedIn: false,
  };

  handleChange = (event) => {
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };

  onSubmit = () => {
    const {
      user: { username, password },
    } = this.state;
    let err = {};

    if (!username) {
      err.username = "Enter your username!";
    }

    if (password.length < 8) {
      err.password = "Password must be at least 8 characters!";
    }

    this.setState({ errors: err }, () => {
      if (Object.getOwnPropertyNames(this.state.errors).length === 0) {
        this.setState({ isLoggedIn: true });
      }
    });
    console.log(this.state.user)
  };

  render() {
    const {
      isLoggedIn,
      errors,
      user: { username, password },
    } = this.state;
    return (
      <React.Fragment>
        {isLoggedIn ? (
          <p>Welcome onboard, {username}!</p>
        ) : (
          <React.Fragment>
            <h3>Login!</h3>
            <FormInput
              label="Username"
              name="username"
              type="text"
              value={username}
              onChange={this.handleChange}
              placeholder="Enter username..."
              error={errors.username}
              required
              className="input"
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
              placeholder="Enter password..."
              error={errors.password}
              className="input"
              required
            />

            <Button
              type="submit"
              label="Submit"
              className="button"
              handleClick={this.onSubmit}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default App;
