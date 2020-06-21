import React from "react";
import man from "../images/game-show-host-1.png";
import {Link} from "react-router-dom";
import "./LandingComponent.css";
import {connect} from "react-redux";

class LandingComponent extends React.Component {
  state = {
    width: window.innerWidth,
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({width: window.innerWidth});
  };

  render() {
    const isMobile = this.state.width <= 800;

    return (
      <div>
        <div className="container landing-page">
          <div className="row">
            <div className="media">
              {!isMobile && <img className="align-self-start" src={man} alt="Generic man"/>}
              <div className="media-body">
                <h5 className={isMobile ? "mobile-media-body-heading" : "media-body-heading"}>
                  <strong>Welcome!</strong>
                </h5>
                <br/>
                <p>
                  You've found yourself at the home of the Game of Games.
                  We've created a custom, brand new, un-before-heard of game--
                  based almost entirely off Jeopardy. However, you create the
                  board. And the questions. Sound like fun?
                  <Link to={"/register"} style={{color: "white"}}>
                    {" "}
                    Let's get started.
                  </Link>
                </p>
                <br/>
                <p>
                  Not yet convinced? Here's some more info-- the game board is
                  divided into 5 categories, but each category is a different
                  type of party game. Only one person has to log in-- the host
                  needs to do a tiny bit of preliminary work for the benefit
                  of the group. Once they've created the game board, they'll
                  send around a link to the other players who will work as a
                  team to create a game that'll "get the whole squad
                  laughing".
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.userReducer.loggedIn,
})

export default connect(mapStateToProps)(LandingComponent)
