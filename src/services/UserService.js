const login = (username, password) =>
  fetch("http://localhost:8080/api/login", {
    body: JSON.stringify({username: username, password: password}),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    credentials: "include"
  })
    .then(response => response.json())

const logout = () =>
  fetch(`http://localhost:8080/api/logout`, {
    method: 'POST',
    credentials: "include"
  })

const register = (newUser) =>
  fetch(`http://localhost:8080/api/register`, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => response.json())

const findUser = () =>
  fetch("http://localhost:8080/api/profile", {
    method: 'POST',
    credentials: "include"
  })
    .then(response => response.json())

export default {
  login,
  logout,
  findUser,
  register
}
