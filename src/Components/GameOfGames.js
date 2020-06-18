import React from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom'
import LandingComponent from "./LandingComponent";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import ProfileComponent from "./ProfileComponent";
import CreateGameComponent from "./CreateGameComponent";
import {connect} from 'react-redux'
import './GameOfGames.css'

class GameOfGames extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          {/*Navbar header for all pages :)*/}
          <div className='navbar'>
            <Link
              to={'/'}
              className='ml-3 navbar-heading barHeading'>Game Of Games</Link>
            {
              !this.props.loggedIn &&
              <div>
                <Link
                  to={'/login'}
                  className='mr-3 barLink'>Log In</Link>
                <Link
                  to={'/register'}
                  className='mr-3 barLink'>Sign Up</Link>
              </div>
            }
            {
              this.props.loggedIn &&
              <div>
                <Link
                  to={'/profile'}
                  className='mr-3 barLink'>Profile</Link>
                <Link
                  to={'/create'}
                  className='mr-3 barLink'>Create Game</Link>
              </div>
            }
          </div>
          <Route
            path='/'
            exact={true}
            component={LandingComponent}/>
          <Route
            path='/login'
            exact={true}
            component={LoginComponent}/>
          <Route
            path='/register'
            exact={true}
            component={RegisterComponent}/>
          <Route
            path='/profile'
            exact={true}
            component={ProfileComponent}/>
          <Route
            path='/create'
            exact={true}
            component={CreateGameComponent}/>
        </BrowserRouter>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.userReducer.loggedIn,
})


export default connect(mapStateToProps)(GameOfGames)
