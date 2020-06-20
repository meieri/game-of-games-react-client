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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.game !== this.props.game && this.props.game) {
      this.setState({game: this.props.game})
    }
  }

  render() {
    return (
      <div className='game-board container'>
        {this.state.game &&
        this.state.game.categories.map(category =>
          <div key={category.id}>
            <h1>{category.name}</h1>
            {category.questions.map(question =>
              <div>
              <h2>{question.question}</h2>
              <h2>{question.answer}</h2>
              <h2>{question.value}</h2>
                </div>
            )}
          </div>
        )}
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
