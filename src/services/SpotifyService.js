var client_id = "af0d22cb531c43fb8645182bc27cea0c"; // Your client id
var client_secret = "f13796d181134d26917d4d15a591a6f9"; // Your secret
var redirect_uri = "http://localhost:8888/profile"; // Your redirect uri

let accessToken;

const getAccessToken = () => {
  if (accessToken) {
    return accessToken;
  }

  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  if (accessTokenMatch && expiresInMatch) {
    accessToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    return accessToken;
  } else {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    window.location = accessUrl;
  }
}

export default {getAccessToken}
