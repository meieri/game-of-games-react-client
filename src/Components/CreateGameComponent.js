import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faCheck} from '@fortawesome/free-solid-svg-icons'
import './CreateGameComponent.css'
import GameService from "../services/GameService";
import {connect} from 'react-redux'

class CreateGameComponent extends React.Component {
  state = {
    categories: {
      "Pictionary": [],
      "Physical": [],
      "Art": [],
      "Trivia": [],
      "Categories": []
    },

    newCard: {},
    flipCard: {},
    newCardQuestion: "",
    newCardAnswer: "",
    newCardValue: "100",
    modal: false
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentGameId !== this.props.currentGameId) {
        this.props.history.push(`/play/${this.props.currentGameId}`)
    }
  }

  render() {
    return (
      <div>

        <h1 className='d-flex justify-content-center mb-3 create-game'>
          <button className='btn-outline-light btn btn-lg' onClick={() => this.setState({modal: true})}>Create the
                                                                                                        Game
          </button>
        </h1>

        {this.state.modal &&
        <div className='d-flex justify-content-center mb-3 form-inline'>
          Are you sure?
          <button className='btn btn-outline-light mx-1' onClick={() => this.props.createGame(this.state.categories)}>Yes</button>
          <button className='btn btn-outline-light mx-1' onClick={() => this.setState({modal: false})}>No</button>
        </div>
        }


        <div className='container-fluid game-board-create'>
          <div className='row d-flex justify-content-center'>
            {Object.keys(this.state.categories).map(category =>
              <div
                key={category}
                className='btn col game-col-create mx-2'>
                <div className='row game-card-cat-create d-flex justify-content-center align-content-center'>
                  {category}
                </div>

                {
                  this.state.categories[category].map(question =>
                    <div
                      key={question["question"]}
                      onClick={() => {
                        if (question !== this.setState.flipCard) {
                          this.setState({flipCard: question})
                        } else {
                          this.setState({flipCard: ''})
                        }
                      }}
                      className='row game-card-create d-flex justify-content-center align-content-center mt-2'>

                      {
                        this.state.flipCard === question &&
                        <div>
                          {question["answer"]}
                          <div>Value: {question["value"]}</div>
                        </div>
                      }
                      {
                        this.state.flipCard !== question &&
                        <div>{question["question"]}</div>
                      }
                    </div>
                  )
                }

                {
                  this.state.newCard === category &&
                  <div
                    className='row game-card-create d-flex justify-content-center align-content-center mt-2'>
                    <input
                      onChange={(e) => this.setState({newCardQuestion: e.target.value})}
                      placeholder='Question'
                      className='input-group mx-3 mt-2'/>

                    <input
                      onChange={(e) => this.setState({newCardAnswer: e.target.value})}
                      placeholder='Answer'
                      className='input-group input-group-sm mx-3 mt-1'/>

                    <form className='form-inline'>
                      <div className='input-group input-group-sm m-2'>
                        <div className="input-group-prepend custom-input-group">
                          <label className="input-group-text " htmlFor="pointSelector">Point Value</label>
                        </div>
                        <select
                          className='custom-select'
                          id='pointSelector'
                          onChange={(e) => this.setState({newCardValue: e.target.value})}>
                          <option value="100">100</option>
                          <option value="200">200</option>
                          <option value="300">300</option>
                          <option value="400">400</option>
                          <option value="500">500</option>
                        </select>
                      </div>
                    </form>

                    <button
                      onClick={() => {
                        const newValue = this.state.newCardValue
                        const newQuestion = this.state.newCardQuestion
                        const newAnswer = this.state.newCardAnswer
                        this.setState(prevState => ({
                          newCardValue: "100",
                          newCardTitle: "",
                          newCardQuestion: "",
                          newCard: {},
                          categories: {
                            ...prevState.categories,
                            [category]: [
                              ...prevState.categories[category],
                              {"question": newQuestion, "answer": newAnswer, "value": newValue},
                            ]
                          }
                        }))
                      }}
                      className='btn btn-outline-light my-1'>
                      <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                    </button>
                  </div>
                }

                <div
                  onClick={() => this.setState({newCard: category})}
                  className='row game-card-create d-flex justify-content-center align-content-center mt-2'>
                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>

    );
  }
}

const stateToPropertyMapper = (state) => ({
  currentGameId: state.gameReducer.currentGameId
})

const dispatchToPropertyMapper = (dispatch) => ({
  createGame: (newGame) =>
    GameService.createGame(newGame)
      // this returns a surface level game, with no categories or questions
      .then(shallowGame => dispatch({
        type: "CREATE_GAME",
        gameId: shallowGame.id
      })),

})

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(CreateGameComponent)