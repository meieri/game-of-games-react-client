import React from "react";
import GameService from "../services/GameService";
import {connect} from "react-redux";
import './PlayGameComponent.css'

class PlayGameComponent extends React.Component {

  state = {
    game: '',
    playingQuestion: '',
    showAnswer: false
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
      <div>
        {
          this.state.playingQuestion === '' &&
          <div className='container-fluid game-board'>
            <div className='row d-flex justify-content-center'>
              {this.state.game &&
              this.state.game.categories.map(category =>
                <div
                  key={category.id}
                  className='btn col game-col mx-2'>
                  <div className='row game-card-cat d-flex justify-content-center align-content-center'>
                    {category.name}
                  </div>
                  {category.questions.map(question =>
                    <div key={question.id}
                         className='row game-card d-flex justify-content-center align-content-center mt-2'
                         onClick={() => this.setState({playingQuestion: question})}>
                      <div>{question.value}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        }
        {
          this.state.playingQuestion !== '' &&
          <div>
            {!this.state.showAnswer &&
            <div
              onClick={() => this.setState({showAnswer: true})}>
              <h1>{this.state.playingQuestion.question}</h1>
            </div>
            }
            {this.state.showAnswer &&
            <div
              onClick={() => this.setState({showAnswer: false, playingQuestion: ''})}>
              <h1>{this.state.playingQuestion.answer}</h1>
            </div>
            }
          </div>
        }
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
