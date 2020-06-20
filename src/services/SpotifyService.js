var client_id = "af0d22cb531c43fb8645182bc27cea0c"; // Your client id
var client_secret = "f13796d181134d26917d4d15a591a6f9"; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri

const spotify = (username, password) =>
  fetch(`http://localhost:8080/api/game`, {
    method: 'POST',
    body: JSON.stringify(newGame),
    credentials: "include",
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

const findGameById = (gameId) =>
  fetch(`http://localhost:8080/api/game/${gameId}`, {
    method: 'GET'
  })
    .then(response => response.json())

const findGameByUser = () =>
  fetch(`http://localhost:8080/api/user/games`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

export default {
  createGame,
  findGameById,
  findGameByUser
}