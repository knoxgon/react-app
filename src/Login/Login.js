import React from 'react';

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
    event.preventDefault();

    fetch('http://localhost:3000/login', {
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input name="username" onChange={this.handleInputChange} value={this.state.username} type="text" id="username" placeholder="username"></input>
          <br></br>
          <label htmlFor="password">Password: </label>
          <input name="password" onChange={this.handleInputChange} value={this.state.password} type="password" id="password" placeholder="password"></input>
          <br></br>
          <button>Login</button>
        </form>
      </div>
    );
  }
}
