import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faCheck} from '@fortawesome/free-solid-svg-icons'
import './CreateGameComponent.css'

export default class CreateGameComponent extends React.Component {
  state = {
    categories: {

      "Pictionary": {
        "Cool": 500,
        "Bool": 200
      },

      "Physical": {},
      "Art": {},
      "Trivia": {},
      "Categories": {}
    },
    newCard: {},
    newCardQuestion: "",
    newCardValue: "",
    modal: false
  }

  createGame = () =>
    alert('hi')

  render() {
    return (
      <div>

        <h1 className='d-flex justify-content-center mb-3 create-game'>
          <a onClick={() => this.setState({modal:true})}>Create the Game</a>
        </h1>

        {this.state.modal &&
        <div className='d-flex justify-content-center mb-3 form-inline'>
          Are you sure?
          <button className='btn btn-outline-light mx-1' onClick={() => this.createGame()}>Yes</button>
          <button className='btn btn-outline-light mx-1' onClick={() => this.setState({modal:false})}>No</button>
        </div>
        }


        <div className='container-fluid game-board'>
          <div className='row d-flex justify-content-center'>
            {Object.keys(this.state.categories).map(category =>
              <div className='btn col game-col mx-2'>
                <div className='row game-card-cat d-flex justify-content-center align-content-center'>
                  {category}
                </div>

                {
                  Object.keys(this.state.categories[category]).map(catValue =>
                    <div className='row game-card d-flex justify-content-center align-content-center mt-2'>
                      {catValue}
                    </div>
                  )
                }

                {
                  this.state.newCard === category &&
                  <div
                    className='row game-card d-flex justify-content-center align-content-center mt-2'>
                    <input
                      onChange={(e) => this.setState({newCardQuestion: e.target.value})}
                      placeholder='Question'
                      className='input-group mx-3 mt-3'/>
                    <form className='form-inline'>
                      <div className='input-group input-group-sm m-2'>
                        <div className="input-group-prepend">
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
                        const newQ = this.state.newCardQuestion
                        console.log(newValue)
                        console.log(newQ)
                        this.setState(prevState => ({
                          newCardValue: '',
                          newCardTitle: '',
                          newCard: {},
                          categories: {
                            ...prevState.categories,
                            [category]: {
                              ...prevState.categories[category],
                              [newQ]: newValue
                            }
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
                  className='row game-card d-flex justify-content-center align-content-center mt-2'>
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