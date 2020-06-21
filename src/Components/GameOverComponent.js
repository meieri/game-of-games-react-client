import React from "react";
import {connect} from "react-redux";

class GameOverComponent extends React.Component {
  render() {
    return (
      <div className='container '>
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
