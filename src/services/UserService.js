const login = (username, password) =>
  fetch("https://isaak-game-of-games-meier.herokuapp.com/api/login", {
    body: JSON.stringify({username: username, password: password}),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    credentials: "include"
  })
    .then(response => response.json())

const logout = () =>
  fetch(`https://isaak-game-of-games-meier.herokuapp.com/api/logout`, {
    method: 'POST',
    credentials: "include"
  })

const register = (newUser) =>
  fetch(`https://isaak-game-of-games-meier.herokuapp.com/api/register`, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => response.json())

const updateUsername = (username) =>
  fetch("https://isaak-game-of-games-meier.herokuapp.com/api/user/name", {
    method: 'POST',
    body: username,
    credentials: "include"
  })
    .then(response => response.json())

const findProfile = () =>
  fetch(`https://isaak-game-of-games-meier.herokuapp.com/api/profile`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include"
  })
    .then(response => response.json())

export default {
  login,
  logout,
  register,
  updateUsername,
  findProfile
}
