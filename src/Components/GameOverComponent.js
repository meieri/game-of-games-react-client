import React from "react";
import {connect} from "react-redux";
import windowSize from 'react-window-size';
import Confetti from 'react-confetti'

class GameOverComponent extends React.Component {
  render() {
    const width = this.props.windowWidth
    const height = this.props.windowHeight
    return (
      <div className='container '>
        <Confetti width={width} height={height}/>
        <h1 className='mt-3 d-flex justify-content-center'>Game Over</h1>
        <h1 className='mt-3 d-flex justify-content-center'>Congratulations to {this.props.winner}!</h1>
      </div>
    )
  }
}

const stateToPropertyMapper = (state) => ({
  winner: state.gameReducer.winner
})

export default connect(stateToPropertyMapper)(GameOverComponent)
