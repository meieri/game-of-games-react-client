import React from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom'
import LandingComponent from "./LandingComponent";
import LoginComponent from "./LoginComponent";
import './GameOfGames.css'

export default class GameOfGames extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          {/*Navbar header for all pages :)*/}
          <div className='navbar'>
            <Link
              to={'/'}
              className='ml-3 navbar-heading barHeading'>Game Of Games</Link>
            <div>
              <Link
                to={'/login'}
                className='mr-3 barLink'>Log In</Link>
              <Link className='mr-3 barLink'>Sign Up</Link>
            </div>
          </div>
          <Route
            path='/'
            exact={true}
            component={LandingComponent}/>
          <Route
            path='/login'
            exact={true}
            component={LoginComponent}/>
        </BrowserRouter>
      </div>

    );
  }
}