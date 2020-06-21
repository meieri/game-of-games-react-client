import React from "react";
import "./SpotifyComponent.css";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

class SpotifyComponent extends React.Component {


  componentDidMount() {
    console.log('moutning')
    const params = this.getHashParams();
    const token = params.access_token;
    console.log(token)
    if (token) {
      spotifyApi.setAccessToken(token);
      this.setState({loggedIn: true})
    }
  }

  state = {
    loggedIn: false,
    songs: "",
  };

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    console.log(q)
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
        <div>Users Top Songs:</div>
        <button type='button' onClick={() => this.getTopTracks()}>Get Top Tracks</button>

        {this.state.loggedIn && this.state.songs &&
        <div>
          {
            this.state.songs.map(song =>
              <div>
                {console.log(song)}
                <div>{song.name}</div>
              </div>
            )}
        </div>
        }
      </div>
    );
  }
}

export default SpotifyComponent;
