import React from "react";
import './LoginComponent.css'

export default class LoginComponent extends React.Component {
  render() {
    return (
      <div className='container signInContainer'>
        <form className="form-signin">
          <div className='d-flex justify-content-center'>
            <h1 className="h3 mb-3 loginHeader">Log In Here</h1>
          </div>
          <input className="form-control usernameField" placeholder="Username"/>
          <input type="password passwordField" className="form-control" placeholder="Password"/>
          <div className="checkbox mt-3">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-outline-light btn-block loginBtn" type="submit">Log in</button>
        </form>
      </div>
    )
  }
}

