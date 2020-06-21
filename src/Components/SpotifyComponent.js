import React from "react";
import "./SpotifyComponent.css";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();
class SpotifyComponent extends React.Component {


  // We could not get this working in time for the deadline.
  componentDidMount() {
/*
    const token = SpotifyService.getAccessToken()
    if (token) {
      spotifyApi.setAccessToken(token);
      this.setState({loggedIn: true})
    }
*/
  }

  state = {
    loggedIn: false,
    songs: "",
  };

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
        <button className='btn btn-outline-light'> {/*href="http://localhost:8888"*/} Login to Spotify </button>
        <button className='btn btn-outline-light' onClick={() => this.getTopTracks()}>Get Top Tracks</button>

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
