const initialState = {
  username: '',
  loggedIn: false,
  // will be either 0, 1 or 2: 0 for good login.
  // need to have updateComponent in LoginComponent called on consecutive bad login attempts
  badLogin: 0
}

const userReducer = (state = initialState, event) => {
  switch (event.type) {

    case "LOGIN":
      return {
        username: event.username,
        loggedIn: true,
        badLogin: 0
      }

    case "UPDATE_NAME":
      return {
        ...state,
        username: event.newUsername
      }

    case "LOGOUT":
      return initialState

    case "FAILED_LOGIN":
      let badLogin = 0
      switch (state.badLogin) {
        case 0:
          badLogin = 1
          break;
        case 1:
          badLogin = 2
          break
        default:
          badLogin = 1
      }
      return {
        ...state,
        badLogin: badLogin
      }

    default:
      return state
  }
}

export default userReducer
