import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      username: '',
      password: ''
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }
  handleSubmit = (event) => {

    fetch('http://192.168.1.8:3000/login', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ 'username': this.state.username, 'password': this.state.password })
    })
      .then(resp => {
        return resp.json();
      })
      .then(resp => { console.log(resp) })
      .catch(err => console.log(err.message))
  }

  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form onSubmit={this.handleSubmit}>
              <p className="h5 text-center mb-4">Sign in</p>
              <div className="grey-text">
                <MDBInput
                  name="username"
                  label="Type your username/email"
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  id="username"
                  onChange={this.handleInputChange}
                  value={this.state.username}
                />
                <MDBInput
                  label="Type your password"
                  icon="lock"
                  name="password"
                  htmlFor=""
                  onChange={this.handleInputChange}
                  value={this.state.password}
                  id="password"
                  group
                  type="password"
                  validate
                />
              </div>
              <div className="text-center">
                <MDBBtn>Login</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
    {/*<div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input name="username" onChange={this.handleInputChange} value={this.state.username} type="text" id="username" placeholder="username"></input>
          <br></br>
          <label htmlFor="password">Password: </label>
          <input name="password" onChange={this.handleInputChange} value={this.state.password} type="password" id="password" placeholder="password"></input>
          <br></br>
          <button>Login</button>
        </form>
    </div>*/}
  }
}
