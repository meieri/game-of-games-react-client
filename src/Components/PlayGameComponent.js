import React from "react";
import GameService from "../services/GameService";
import {connect} from "react-redux";

class PlayGameComponent extends React.Component {

  state = {
    game: ''
  }

  // TODO remap 'cc' to 'dd O' in vim
  componentDidMount() {
    this.props.playGame()
    this.props.findGameById(this.props.match.params.gameId)
  }

  render() {
    return (
      <div className='game-board container'>
        {this.state.game &&
          console.log(this.state.game.categories)
        }
{/*
        {this.state.game.categories.map(category =>
          <div>
            <h1>{category.name}</h1>
            {this.category.questions.map(question =>
              <h2>{question}</h2>
            )}
          </div>
        )}
        <h1>Play Game with id of {console.log(this.state.game.categories)}</h1>
*/}
      </div>
    )
  }
}

const stateToPropertyMapper = (state) => ({
  game: state.gameReducer.game
})

const dispatchToPropertyMapper = (dispatch) => ({
  playGame: () =>
    dispatch({
      type: "PLAY_GAME"
    }),

  findGameById: (gameId) =>
    GameService.findGameById(gameId)
      .then(game => dispatch({
        type: "FIND_GAME",
        game
      })),

})

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(PlayGameComponent)
