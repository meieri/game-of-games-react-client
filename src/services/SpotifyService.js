const SpotifyStrategy = require("passport-spotify").Strategy;

var client_id = "af0d22cb531c43fb8645182bc27cea0c"; // Your client id
var client_secret = "f13796d181134d26917d4d15a591a6f9"; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri

let jsonData = {
  limit: 5,
};

passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: redirect_uri,
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        console.log("Profile: ", profile);
        User.findOrCreate({
          where: {
            SpotifyId: profile.id,
          },
          defaults: {
            name: profile.displayName,
            SpotifyId: profile.id,
            accessToken: accessToken,
            proPic: profile.photos[0],
            refreshToken: refreshToken,
          },
        })
          .spread(function (user) {
            console.log("MAKING USER: ", user);
            done(null, user);
          })
          .catch(done);
      });
    }
  )
);

const getTopSongs = () =>
  fetch(`https://api.spotify.com/v1/me/top/tracks`, {
    method: "GET",
    data: jsonData,
    dataType: "json",
    headers: {
      Authorization: "Bearer " + this.state.userReducer.accessToken,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export default {
  getTopSongs,
};
