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

  handleEmailInput = (e) => {
    this.setState({email: e.target.value});
  }
  handlePasswordInput = (e) => {
    this.setState({password: e.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: {username: this.state.username, password: this.state.password}
    })
    .then(resp => {
      console.log(this.state.username);
      console.log(this.state.password);
      return resp.json();
    })
    .then(resp => {console.log(resp)})
    .catch(err => console.log(err.message))
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label for="username">Username: </label>
        <input name="username" onChange={(e) => this.handleEmailInput(e)} value={this.state.email} type="text" id="username" placeholder="username"></input>
        <br></br>
        <label for="password">Password: </label>
        <input name="password" onChange={(e) => this.handlePasswordInput(e)} value={this.state.password} type="password" id="password" placeholder="password"></input>
        <br></br>
        <button>Login</button>
      </form>
    );
  }
}
