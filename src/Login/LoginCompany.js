import React from 'react';
// import { MDBContainer } from 'mdbreact';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '../_services';


export default class LoginCompany extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    if (authenticationService.currentUserValue) {
      this.props.history.push('/');
    }
  }

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    return (
      <div className="row">
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().required('Email is required'),
            password: Yup.string().required('Password is required')
          })}
          onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
            setStatus();
            authenticationService.loginCompany(email, password)
              .then(
                user => {
                  setSubmitting(true);
                  const { from } = this.props.location.state || { from: { pathname: "/" } };
                  this.props.history.push(from);
                },
                error => {
                  setSubmitting(false);
                  setStatus(error);
                }
              );
          }}
          render={({ errors, status, touched, isSubmitting }) => (
            <div className="container center-block">
              <div className="row">
              <div className="col-md-4 mx-auto">
              <Form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field id="uname-field" name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field id="psw-field" name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <div className="text-center mt+5">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                  </div>
                  {isSubmitting &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="imglog"/>
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
