import React from "react";
import {connect} from "react-redux";

class GameOverComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Game Over</h1>
        <h2>Congratulations to {this.props.winner}!</h2>
      </div>
    )
  }
}

const stateToPropertyMapper = (state) => ({
  winner: state.gameReducer.winner
})

export default connect(stateToPropertyMapper)(GameOverComponent)
