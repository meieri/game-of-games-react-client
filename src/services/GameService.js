const createGame = (newGame) =>
  fetch(`https://isaak-game-of-games-meier.herokuapp.com/api/game`, {
    method: 'POST',
    body: JSON.stringify(newGame),
    credentials: "include",
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

const findGameById = (gameId) =>
  fetch(`https://isaak-game-of-games-meier.herokuapp.com/api/game/${gameId}`, {
    method: 'GET'
  })
    .then(response => response.json())

const findGameByUser = () =>
  fetch(`https://isaak-game-of-games-meier.herokuapp.com/api/user/games`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

const endGame =  (gameId) =>
  fetch(`https://isaak-game-of-games-meier.herokuapp.com/api/gameover/${gameId}`, {
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
  findGameByUser,
  endGame
}