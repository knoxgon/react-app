import React from 'react';
// import { MDBContainer } from 'mdbreact';

// import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '../_services';


export default class LoginClient extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    if (authenticationService.currentUserValue) {
      this.props.history.push('/');
    }

    this.state = {
      username: '',
      password: '',
      submitted: false,
      loading: false,
      error: ''
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({submitted: true});
    const {username, password} = this.state;

    if(!username && !password) return;

    this.setState({loading: true});    
    authenticationService.loginClient(username, password)
      .then((_) => {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        this.props.history.push(from);
      }).catch(error => {
          this.setState({error: error, loading: false});
      });
  }

  render() {
    const {username, password, submitted, loading, error} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 mx-auto">
            <form name="form" onSubmit={this.handleSubmit}>
              
              <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                <label htmlFor="username">Username</label>
                <input onChange={this.handleInputChange} name="username" type="text" className='form-control' value={username}/>
                {submitted && !username && <div className="help-block">Username/Email is required</div>}
              </div>
              
              <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                <label htmlFor="password">Password</label>
                <input onChange={this.handleInputChange} name="password" type="password" className='form-control' value={password}/>
                {submitted && !password && <div className="help-block">Password is required</div>}
              </div>

              <div className="form-group">
                <button className="btn btn-primary" disabled={loading}>Login</button>
                  {loading &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
              </div>
              {error && <div className={'alert alert-danger'}>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
