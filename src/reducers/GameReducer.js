const initialState = {
  currentGameId: '',
  inPlay: false,
  game: '',
  userGames: '',
  winner: ''
}

const gameReducer = (state = initialState, event) => {
  switch (event.type) {
    case "CREATE_GAME":
      return {
        ...state,
        currentGameId: event.gameId
      }
    case "PLAY_GAME":
      return {
        ...state,
        inPlay: true
      }
    case "FIND_GAME":
      return {
        ...state,
        game: event.game
      }
    case "DONT_PLAY_GAME":
      return {
        ...state,
        inPlay: false
      }
    case "SET_USER_GAMES":
      return {
        ...state,
        userGames: event.games
      }
    case "END_GAME":
      return {
        ...state,
        inPlay: false,
        winner: event.winner
      }
    default:
      return state
  }

}

export default gameReducer