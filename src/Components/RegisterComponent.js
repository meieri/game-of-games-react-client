import React from "react";
import './RegisterComponent.css'

export default class RegisterComponent extends React.Component {
  render() {
    return (
      <div className='container RegisterContainer'>
        <form className="form-register">

          <div className='d-flex justify-content-center'>
            <h1 className="h3 mb-3">Sign Up Here</h1>
          </div>

          <div className="form-group">
            <label htmlFor="userInput">Create a Username</label>
            <input className="form-control" id="userInput" aria-describedby="userHelp" placeholder="Username"/>
              <small id="userHelp" className="form-text">Between 4-12 characters, alphanumeric.</small>
          </div>

          <div className="form-group">
            <label htmlFor="passwordInput">Create a Password</label>
            <input className="form-control" id="passwordInput" aria-describedby="userHelp" placeholder="Password"/>
            <small id="userHelp" className="form-text">Requires nothing. Go wild.</small>
          </div>

          <div className="form-group">
            <label htmlFor="passwordInput1">Confirm your Password</label>
            <input className="form-control" id="passwordInput1" aria-describedby="userHelp" placeholder="Password"/>
          </div>


          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Me Up!</button>
        </form>
      </div>
    )
  }
}

