import React from 'react';
// import { MDBContainer } from 'mdbreact';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '../_services';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    if (authenticationService.currentUserValue) {
      this.props.history.push('/');
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    return (
      <div className="row">
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required')
          })}
          onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
            setStatus();
            authenticationService.loginClient(username, password)
              .then(
                user => {
                  setSubmitting(true);
                  const { from } = this.props.location.state || { from: { pathname: "/" } };
                  this.props.history.push(from);
                },
                error => {
                  setStatus(error);
                  setSubmitting(false);
                }
              )
          }}
          render={({ errors, status, touched, isSubmitting }) => (
            <div className="container">
              <div className="row">
              <div className="col-md-4 mx-auto">
              <Form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Field id="uname-field" name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                  <ErrorMessage name="username" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field id="psw-field" name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                  </div>
                  {isSubmitting &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="spinner"/>
                  }
                </div>
                {status &&
                  <div className={'alert alert-danger'}>{status}</div>
                }
              </Form>
              </div>
              </div>
            </div>
          )}
        ></Formik>
        </div>
    );
  }
}
