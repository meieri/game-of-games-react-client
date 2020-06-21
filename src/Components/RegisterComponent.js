import React from "react";
import "./RegisterComponent.css";
import UserService from "../services/UserService";
import {connect} from "react-redux";

class RegisterComponent extends React.Component {

  state = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.loggedIn !== this.props.loggedIn && this.props.loggedIn === true) {
      alert("Sign Up Successful");
      this.props.history.push("/profile");
    }
  }

  handleSubmit = () => {
    let messages = [];
    const alphanumeric = /^[0-9a-zA-Z]+$/;

    if (
      this.state.username.trim() === "" ||
      this.state.password.trim() === "" ||
      this.state.confirmPassword.trim() === ""
    ) {
      messages.push(
        "Fields must be non-empty and contain non-space characters"
      );
    }
    if (!this.state.username.match(alphanumeric)) {
      messages.push("Username must only contain alphanumeric characters");
    }
    if (this.state.username.length < 4 || this.state.username.length > 12) {
      messages.push("Username must be between 4 and 12 characters in length");
    }
    if (this.state.password !== this.state.confirmPassword) {
      messages.push("Passwords do not match");
    }
    if (messages.length > 0) {
      alert(messages.join(", "));
      return true;
    } else {
      this.props.register({
        username: this.state.username,
        password: this.state.password,
      })
    }
  };

  render() {
    return (
      <div className="container RegisterContainer">
        <form className="form-register" id="form">
          <div className="d-flex justify-content-center">
            <h1 className="h3 mb-3 signUpHeader">Sign Up Here</h1>
          </div>

          <div id="error"></div>

          <div className="form-group">
            <label htmlFor="userInput">Create a Username</label>
            <input
              className="form-control"
              onChange={(e) => this.setState({username: e.target.value})}
              id="userInput"
              aria-describedby="userHelp"
              placeholder="Username"
              required
            />
            <small id="userHelp" className="form-text">
              Between 4-12 characters, alphanumeric.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="passwordInput">Create a Password</label>
            <input
              className="form-control"
              type="password"
              onChange={(e) => this.setState({password: e.target.value})}
              id="passwordInput"
              aria-describedby="userHelp"
              placeholder="Password"
              required
            />
            <small id="userHelp" className="form-text">
              Requires nothing. Go wild.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="passwordInput1">Confirm your Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => this.setState({confirmPassword: e.target.value})}
              id="passwordInput1"
              placeholder="Password"
              required
            />
          </div>

          <button
            className="btn btn-lg btn-outline-light registerBtn"
            type="button"
            onClick={() => this.handleSubmit()}>
            Sign Me Up!
          </button>
        </form>
      </div>
    );
  }
}

const stateToPropertyMapper = (state) => ({
  loggedIn: state.userReducer.loggedIn
})

const dispatchToPropertyMapper = (dispatch) => ({
  register: (newUser) =>
    UserService.register(newUser)
      .then(dispatch({
        type: "LOGIN",
        username: newUser.username
      }))
})

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(RegisterComponent)