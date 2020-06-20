import React from "react";
import GameService from "../services/GameService";
import {connect} from "react-redux";

class PlayGameComponent extends React.Component {
  // TODO remap 'cc' to 'dd O'
  render() {
    return(
      <h1>Play Game with id of {this.props.match.params.gameId}</h1>
    )
  }
}

const stateToPropertyMapper = (state) => ({})

const dispatchToPropertyMapper = (dispatch) => ({
  findGameById: (gameId) =>
    GameService.findGameById(gameId)
      .then(game => dispatch({
        type: "FIND_GAME",
        game
      }))

})

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(PlayGameComponent)
