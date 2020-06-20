import React from "react";
import GameService from "../services/GameService";
import {connect} from "react-redux";
import './PlayGameComponent.css'

class PlayGameComponent extends React.Component {

  state = {
    game: '',
    playingQuestion: '',
    showAnswer: false,
    team1Points: 0,
    team2Points: 0,
    team1turn: true,
    playedQuestions: [],
    youWannaBeDone: false
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

  endGame = () =>
    console.log("gameEnd")

  render() {
    return (
      <div>
        {
          this.state.playingQuestion === '' &&
          <div className='container-fluid game-board mt-3'>
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
                    <div>
                      {
                        !this.state.playedQuestions.includes(question.id) &&
                        <div key={question.id}
                             className='row game-card d-flex justify-content-center align-content-center mt-2'
                             onClick={() => this.setState({playingQuestion: question})}>
                          <div>{question.value}</div>
                        </div>
                      }
                      {
                        this.state.playedQuestions.includes(question.id) &&
                        <div key={question.id}
                             className='row game-card-played d-flex justify-content-center align-content-center mt-2'>
                          <div>{question.value}</div>
                        </div>
                      }
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className='container-fluid d-inline-flex justify-content-between mt-3 team-container'>
              <div className={this.state.team1turn ? 'my-turn' : ''}>
                <div className='py-1 px-2'>Team 1: {this.state.team1Points}</div>
              </div>
              <div>
                {!this.state.youWannaBeDone &&
                <button
                  onClick={() => this.setState({youWannaBeDone: true})}
                  className='btn btn-outline-light'>End Game</button>
                }
                {this.state.youWannaBeDone &&
                <div>
                  Are you sure
                  <button
                    onClick={() => this.endGame()}
                    className='ml-3 btn btn-outline-light'>Yes</button>
                  <button
                    onClick={() => this.setState({youWannaBeDone: false})}
                    className='ml-3 btn btn-outline-light'>No</button>
                </div>
                }
              </div>
              <div
                className={this.state.team1turn ? '' : 'my-turn'}>
                <div className='py-1 px-2'>Team 2: {this.state.team2Points}</div>
              </div>
            </div>
          </div>
        }
        {
          this.state.playingQuestion !== '' &&
          <div
            className='container-fluid game-board-create'>
            <div>
              {!this.state.showAnswer &&
              <div
                className='question centered'
                onClick={() => this.setState({showAnswer: true})}>
                {this.state.playingQuestion.question}
              </div>
              }
              {this.state.showAnswer &&
              <div>
                <div
                  className='question centered'>
                  {this.state.playingQuestion.answer}
                </div>

                <div className='container-fluid d-inline-flex justify-content-between mt-3 team-container'>
                  <div>
                    <div
                      onClick={
                        () => this.setState(prevState => ({
                          ...prevState,
                          team1turn: true,
                          team1Points: prevState.team1Points + this.state.playingQuestion.value,
                          showAnswer: false,
                          playingQuestion: '',
                          playedQuestions: [...prevState.playedQuestions, this.state.playingQuestion.id]
                        }))
                      }
                      className='py-1 px-2 select-winner'>Team 1
                    </div>
                  </div>

                  <h1>Select Winner</h1>

                  <div
                    onClick={
                      () => this.setState(prevState => ({
                        team1turn: false,
                        team2Points: prevState.team2Points + this.state.playingQuestion.value,
                        showAnswer: false,
                        playingQuestion: '',
                        playedQuestions: [...prevState.playedQuestions, this.state.playingQuestion.id]
                      }))
                    }>
                    <div className='py-1 px-2 select-winner'>Team 2</div>
                  </div>
                </div>
              </div>
              }
            </div>

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
