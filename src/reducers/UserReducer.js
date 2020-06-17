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
      console.log('hi from badlogin')
      return {
        ...state,
        badLogin: true
      }
    default:
      return state
  }
}

export default userReducer
