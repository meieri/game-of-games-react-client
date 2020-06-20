const createGame = (newGame) =>
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
    method: 'POST',
    credentials: "include",
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

export default {
  createGame,
  findGameById
}