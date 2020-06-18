const initialState = {
  username: '',
  loggedIn: false,
  badLogin: false
}

const userReducer = (state = initialState, event) => {
  switch (event.type) {
    case "LOGIN":
      return {
        username: event.username,
        loggedIn: true,
        badLogin: false
      }
    case "REGISTER":
    case "LOGOUT":
      return initialState
    case "FAILED_LOGIN":
      const newState = {
        ...state,
        badLogin: true
      }
      return newState
    default:
      return state
  }
}

export default userReducer
