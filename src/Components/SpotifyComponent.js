import React from "react";
import "./SpotifyComponent.css";
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyService from "../services/SpotifyService.js";
const spotifyApi = new SpotifyWebApi();

class SpotifyComponent extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      songs: "",
    };
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getTopTracks() {
    var options = {
      limit: "5",
    };
    spotifyApi.getMyTopTracks(options).then((response) => {
      this.setState({
        songs: response.items,
      });
    });
  }

  render() {
    return (
      <div>
        <a href="http://localhost:8888"> Login to Spotify </a>
        <div>Users Top Songs: {this.state.songs}</div>
        {this.state.loggedIn && (
          <button onClick={() => this.getTopTracks()}>Get Top Tracks</button>
        )}
        {this.state.loggedIn && (
          <button onClick={() => SpotifyService.getTopSongs().items}>
            Service Get Top Tracks
          </button>
        )}
      </div>
    );
  }
}

export default SpotifyComponent;
