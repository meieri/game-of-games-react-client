import React from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import LandingComponent from "./LandingComponent";
import './GameOfGames.css'

export default class GameOfGames extends React.Component {
  render() {
    return (
      <div>
        <div className='navbar'>
          <a className='navbar-brand gameHeading'>Game Of Games</a>
          <div>
            <a className='mr-3'>Log In</a>
            <a className='mr-3'>Sign Up</a>
          </div>
        </div>
        <BrowserRouter>
          <Route
            path='/'
            exact={true}
            component={LandingComponent}/>
        </BrowserRouter>
      </div>

    );
  }
}