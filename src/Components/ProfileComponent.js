import React from "react";
import './ProfileComponent.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import UserService from "../services/UserService";
import GameService from "../services/GameService";
import {Link} from "react-router-dom";

class ProfileComponent extends React.Component {
  state = {
    username: '',
    password: '',
    editingUsername: false,
    editingPassword: false
  }

  componentDidMount() {
    if (this.props.loggedIn === true) {
      this.setState({
        username: this.props.username
      })
      this.props.findGameByUser()
    } else {
      this.props.history.push('/')
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      if (this.props.loggedIn === true) {
        this.setState({
          username: this.props.username
        })
      } else if (this.props.loggedIn) {
        this.props.history.push('/')
      }
    }
  }

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
                      onClick={() => {
                        this.props.updateUsername(this.state.username)
                        this.setState({editingUsername: false})
                      }}>
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
                <button type='button'
                        className='btn btn-outline-light mb-3'
                        onClick={() => this.props.logout()}>
                  Log Out
                </button>
              </form>
            </div>

            <div className='col-7'>
              <button
                onClick={() => this.props.history.push('/create')}
                className='btn btn-outline-light btn-lg'>Create New Game
              </button>
              <div>
                <h1>Your Games</h1>
                <table className='table'>
                  <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Created</th>
                    <th scope="col"></th>
                  </tr>
                  </thead>
                  {this.props.gameList &&
                  <tbody>
                    {
                    this.props.gameList.map(game =>
                      <tr>
                        {console.log(game)}
                        <th scope="row">1</th>
                        <td>{game.id}</td>
                        <td>{game.start}</td>
                        <td><Link to={`/play/${game.id}`}>Play Me Again!</Link></td>
                      </tr>
                    )
                  }
                  </tbody>
                  }
                </table>
              </div>
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

const stateToPropertyMapper = (state) => ({
  loggedIn: state.userReducer.loggedIn,
  username: state.userReducer.username,
  gameList: state.gameReducer.userGames
})

const dispatchToPropertyMapper = (dispatch) => ({

  logout: () =>
    UserService.logout()
      .then(() =>
        dispatch({type: "LOGOUT"})
      ),

  updateUsername: (username) =>
    UserService.updateUsername(username)
      .then(response => dispatch({
          type: "UPDATE_NAME",
          newUsername: response.username
        })
      ),
  findGameByUser: () =>
    GameService.findGameByUser()
      // returns games only for surface level
      .then(shallowGames => dispatch({
        type: "SET_USER_GAMES",
        games: shallowGames
      }))

})

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(ProfileComponent)
