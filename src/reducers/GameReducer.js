const initialState = {
  currentGameId: ''
}

const gameReducer = (state = initialState, event) => {
  switch (event.type) {
    case "CREATE_GAME":
      return {
        ...state,
        currentGameId: event.gameId
      }
    default:
      return state
  }

}

export default gameReducer