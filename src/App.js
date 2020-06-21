import React from "react";
import "./App.css";
import GameOfGames from "./Components/GameOfGames";
import SpotifyComponent from "./Components/SpotifyComponent.js";

function App() {
  return (
    <div>
      <SpotifyComponent />
      <GameOfGames />
    </div>
  );
}

export default App;
