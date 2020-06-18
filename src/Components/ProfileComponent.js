import React from "react";
import './ProfileComponent.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

export default class ProfileComponent extends React.Component {
  state = {
    username: '',
    password: '',
    editingUsername: false,
    editingPassword: false
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/profile", {
      method: 'POST',
      credentials: "include"
    })
      .then(response => {
        return response.json()
      })
      .catch(e => {
        this.props.history.push('/')
      })
      .then(user => {
        if (user)
          this.setState({
            username: user.username,
            password: user.password
          })
      })
  }

  logout = () =>
    fetch(`http://localhost:8080/api/logout`, {
      method: 'POST',
      credentials: "include"
    })
      .then(this.props.history.push('/'))

  render() {
    return (
      <div className='container'>
        <div className='d-flex justify-content-center'>
          <h1>Welcome, {this.state.username}</h1>
        </div>
        <div className='container mt-3'>
          <div className='row'>
            <div className='col-5 profileInfo'>
              <h1>User Info</h1>
              <form className='mt-3 '>

                <div className="form-group row">
                  <label htmlFor="usernameField" className="col-form-label ml-3">Username:</label>
                  <fieldset disabled={!this.state.editingUsername} className='ml-3'>
                    <input
                      type="text"
                      id="usernameField"
                      className="form-control"
                      onChange={(e) => this.setState({username: e.target.value})}
                      placeholder={this.state.username}/>
                  </fieldset>
                  {
                    !this.state.editingUsername &&
                    <button
                      className='btn btn-outline-light ml-3'
                      type='button'
                      onClick={() => this.setState({editingUsername: true})}>
                      <FontAwesomeIcon icon={faEdit}/>
                    </button>
                  }
                  {
                    this.state.editingUsername &&
                    <button
                      className='btn btn-outline-light ml-3'
                      type='button'
                      onClick={() => this.setState({editingUsername: false})}>
                      Submit
                    </button>
                  }
                </div>

                <div className="form-group row">
                  <label htmlFor="passwordField" className="col-form-label ml-3 mr-1">Password:</label>
                  <fieldset disabled={!this.state.editingPassword} className='ml-3'>
                    <input
                      type="password"
                      id="passwordField"
                      className="form-control"
                      onChange={(e) => this.setState({password: e.target.value})}
                      placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'/>
                  </fieldset>
                  {
                    !this.state.editingPassword &&
                    <button
                      className='btn btn-outline-light ml-3'
                      type='button'
                      onClick={() => this.setState({editingPassword: true})}>
                      <FontAwesomeIcon icon={faEdit}/>
                    </button>
                  }
                  {
                    this.state.editingPassword &&
                        <button
                          className='btn btn-outline-light ml-3'
                          type='button'
                          onClick={() => this.setState({editingPassword: false})}>
                          Submit
                        </button>
                  }
                </div>
                <button className='btn btn-outline-light mb-3' onClick={() => this.logout()}>Log Out</button>
              </form>
            </div>

            <div className='col-7'>
              <button
                onClick={() => this.props.history.push('/create')}
                className='btn btn-outline-light btn-lg'>Create New Game</button>
              <h1>Past Games</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-5'>
            </div>
            <div className='col-7'>
              <h1>Spotify</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}