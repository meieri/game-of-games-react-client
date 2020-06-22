import React from "react";
import './ProfileComponent.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import UserService from "../services/UserService";
import GameService from "../services/GameService";
import {Link} from "react-router-dom";
import SpotifyComponent from "./SpotifyComponent";

class ProfileComponent extends React.Component {
  state = {
    username: '',
    password: '',
    editingUsername: false,
    editingPassword: false,
    deletingGame: ''
  }

  componentDidMount() {
    this.props.findProfile().then(response => {
      if (this.props.loggedIn === true) {
        this.setState({
          username: this.props.username
        })
        this.props.findGameByUser()
      } else {
        this.props.history.push('/')
      }
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      if (this.props.loggedIn === true) {
        this.setState({
          username: this.props.username
        })
      } else if (!this.props.loggedIn) {
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

                <div className="form-group row d-inline-flex align-items-center">
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

                <div className="form-group row d-inline-flex align-items-center">
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
                <hr/>
                <h1>Spotify</h1>
                <SpotifyComponent/>

                <hr/>
                <button type='button'
                        className='btn btn-outline-light btn-lg mb-3'
                        onClick={() => this.props.logout()}>
                  Log Out
                </button>
              </form>
            </div>

            <div className='col-6'>
              <div>
                <div className='form-inline'>
                  <h1 className='mr-3'>Your Games</h1>
                  <button
                    onClick={() => this.props.history.push('/create')}
                    className='btn btn-outline-light btn-lg'>Create New Game
                  </button>
                </div>
                <table className='table'>
                  <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date Created</th>
                    <th scope="col">Replay</th>
                    <th scope="col">Delete</th>
                  </tr>
                  </thead>
                  {this.props.gameList &&
                  <tbody>
                  {this.props.gameList.map(game =>
                    <tr key={game.id}>
                      <th className='align-middle' scope="row">{game.id}</th>
                      <td className='align-middle'>{game.name}</td>
                      <td className='align-middle'><Link className="play-again" to={`/play/${game.id}`}>Play Me
                                                                                                        Again!</Link>
                      </td>
                      <td>
                        {this.state.deletingGame !== game.id &&
                        <button
                          className='btn m-0 btn-outline-light'
                          onClick={
                            () => this.setState({deletingGame: game.id})}>Delete Me Forever</button>
                        }
                        {this.state.deletingGame === game.id &&
                        <div>
                          <button
                            className='btn m-0 btn-outline-light'
                            onClick={() => {
                              this.props.deleteGame(game.id)
                              this.setState({deletingGame: ''})
                            }}>Do it.
                          </button>
                          <button className='btn m-0 ml-1 btn-outline-light'
                                  onClick={() => this.setState({deletingGame: ''})
                                  }>Cancel
                          </button>
                        </div>}
                      </td>
                    </tr>
                  )}
                  </tbody>
                  }
                </table>
              </div>
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
  findProfile: () =>
    UserService.findProfile()
      .catch(e =>
        dispatch({
          type: "LOGOUT"
        }))
      .then(user =>
        dispatch({
          type: "LOGIN",
          username: user.username
        })),

  logout: () =>
    UserService.logout()
      .then(() =>
        dispatch({type: "LOGOUT"})
      ),
  updateUsername: (username) =>
    UserService.updateUsername
    (username)
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
      })),

  deleteGame: (gameId) =>
    GameService.deleteGame(gameId)
      .then(
        dispatch({
          type: "DELETE_GAME",
          gameId
        })
      )

})

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(ProfileComponent)
