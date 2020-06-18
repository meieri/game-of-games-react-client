import React from "react";
import './LoginComponent.css'
import {Link} from "react-router-dom";
import UserService from "../services/UserService";
import {connect} from 'react-redux'

class LoginComponent extends React.Component {

  state = {
    username: '',
    password:'',
    badLogin: false
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.badLogin !== this.props.badLogin) {
      this.setState({ username: '', password: '', badLogin: true})
    }
    if (this.props.loggedIn == true) {
      this.props.history.push('/profile')
    }

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
            onClick={() => this.props.login(this.state.username, this.state.password)}>
            Log In</button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  loggedIn: state.userReducer.loggedIn,
  badLogin: state.userReducer.badLogin
})

const mapDispatchToProps = (dispatch) => ({

  login: (username, password) =>
    UserService.login(username, password)
      .then(currentUser => {
      if(currentUser.username !== "BADLOGIN") {
        dispatch({
          type: "LOGIN", username
        })
      }
      else {
        dispatch({
          type: "FAILED_LOGIN"
        })
      }
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)

