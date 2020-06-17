import React from "react";
import './RegisterComponent.css'

export default class RegisterComponent extends React.Component {

  state = {
    username: '',
    password: ''
  }

  register = () =>
    fetch(`http://localhost:8080/api/register`, {
      method: 'POST',
      body: JSON.stringify({username: this.state.username, password: this.state.password}),
      headers: {
        'content-type': 'application/json'
      },
      credentials: "include"
    })
      .then(response => response.json())
      .then(currentUser => this.props.history.push('/profile'))


  render() {
    return (
      <div className='container RegisterContainer'>
        <form className="form-register">

          <div className='d-flex justify-content-center'>
            <h1 className="h3 mb-3 signUpHeader">Sign Up Here</h1>
          </div>

          <div className="form-group">
            <label htmlFor="userInput">Create a Username</label>
            <input className="form-control"
                   onChange={(e) => this.setState({username: e.target.value})}
                   id="userInput"
                   aria-describedby="userHelp"
                   placeholder="Username"/>
              <small id="userHelp" className="form-text">Between 4-12 characters, alphanumeric.</small>
          </div>

          <div className="form-group">
            <label htmlFor="passwordInput">Create a Password</label>
            <input className="form-control"
                   type='password'
                   onChange={(e) => this.setState({password: e.target.value})}
                   id="passwordInput"
                   aria-describedby="userHelp"
                   placeholder="Password"/>
            <small id="userHelp" className="form-text">Requires nothing. Go wild.</small>
          </div>

          <div className="form-group">
            <label htmlFor="passwordInput1">Confirm your Password</label>
            <input
              type='password'
              className="form-control"
              id="passwordInput1"
              placeholder="Password"/>
          </div>


          <button
            className="btn btn-lg btn-outline-light btn-block registerBtn"
            type="button"
            onClick={() => this.register()}>
            Sign Me Up!
          </button>
        </form>
      </div>
    )
  }
}

