import React from "react";

export default class ProfileComponent extends React.Component {
  state = {
    username: '',
    password: ''
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/profile", {
      method: 'POST',
      credentials: "include"
    })
      .then(response => {
        console.log(response)
        return response.json()
      })
      .catch(e => {
        console.log(e)
        this.props.history.push('/')
      })
      .then(user => {
        if(user)
          this.setState({
            username: user.username,
            password: user.password
          })
      })
  }

  logout = () =>
    fetch(`http://localhost:8080/api/logout`, {
      method: 'POST',
      credentials: "include"
    })
      .then(this.props.history.push('/'))

  render() {
    return(
      <div>
        <h1>Profile Screen</h1>
        <h2>{this.state.username}</h2>
        <h2>{this.state.password}</h2>
        <button
          onClick={() => this.logout()}
        >Log Out</button>
      </div>
    )
  }
}