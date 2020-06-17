import React from "react";

export default class LoginComponent extends React.Component {
  render() {
    return(
      <div className='container'>
        <div className='form-group'>
          <label for='loginUserName1'>Username</label>
          <input type='text' className='form-control' id='loginUserName1'/>
        </div>
        <div className='form-group'>
          <label htmlFor='passwordUserName1'>Password</label>
          <input type='password' className='form-control' id='passwordUserName1'/>
        </div>
      </div>
    )
  }
}

