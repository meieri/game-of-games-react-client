import React from "react";
import './LoginComponent.css'
import {Link} from "react-router-dom";

export default class LoginComponent extends React.Component {
  state = {
    username: '',
    password:'',
    badLogin: false
  }

  login = () => {
    fetch("http://localhost:8080/api/login", {
      body: JSON.stringify({username: this.state.username, password: this.state.password}),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      credentials: "include"
    }).then(response => response.json())
      .then(currentUser => {
        if(currentUser.username !== "BADLOGIN")
          this.props.history.push('/profile')
        else {
          this.setState({ username: '', password: '', badLogin: true})
        }
      })
  }

  render() {
    return (
      <div className='container signInContainer'>
        <form className="form-signin">
          <div className='d-flex justify-content-center'>
            <h1 className="h3 mb-3 loginHeader">Log In Here</h1>
          </div>

          <input
            className="form-control usernameField"
            onChange={(e) => this.setState({username: e.target.value})}
            value={this.state.username}
            placeholder="Username"/>

          <input
            type="password passwordField"
            onChange={(e) => this.setState({password: e.target.value})}
            value={this.state.password}
            className="form-control"
            placeholder="Password"/>

          <div className="checkbox mt-3">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>

          {
            this.state.badLogin &&
              <div>
                <small className="form-text badLoginText mb-3">No can do, mystery man. <Link className='badLoginText' to={'/register'}>Create an account?</Link></small>
              </div>
          }

          <button
            className="btn btn-lg btn-outline-light btn-block loginBtn"
            type='button'
            onClick={() => this.login()}>
            Log In</button>
        </form>
      </div>
    )
  }
}

