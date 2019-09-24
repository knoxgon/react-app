import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerService } from '../_services';


export default class RegisterCompany extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
  }

  render() {
    return (
      <Formik
          initialValues={{
            corporateIdentityNumber: '',
            companyName: '',
            contactFirstName: '',
            contactLastName: '',
            companyEmail: '',
            password: '',
            address: '',
            billingAddress: ''
            //branches: []
          }}
          validationSchema={Yup.object().shape({
              corporateIdentityNumber: Yup.string()
                  .required('CIN is required'),
              companyName: Yup.string()
                  .required('Company name is required'),
              contactFirstName: Yup.string()
                  .required('Name is required'),
              contactLastName: Yup.string()
                  .required('Surname is required'),
              companyEmail: Yup.string()
                  .email('Email is invalid')
                  .required('Email is required'),
              address: Yup.string()
                  .required('Address is required'),
              billingAddress: Yup.string()
                  .required('Billing address is required'),
              /*branches: Yup.array()
                .of(Yup.object().shape({
                  branch: Yup.string()
              })).oneOf(['bygg', 'kök', 'it', 'elektronisk']),*/
              password: Yup.string()
                  .min(8, 'Password must be at least 8 characters long')
                  .required('Password is required'),
              confirmPassword:  Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
                  .required('Confirm password is required')
          })}
          onSubmit={(
            { corporateIdentityNumber, 
              companyName,
              contactFirstName,
              contactLastName,
              companyEmail,
              address,
              billingAddress,
              //branches,
              password
             }, { setStatus, setSubmitting }) => {
            setStatus();
            registerService(corporateIdentityNumber, companyName, contactFirstName, contactLastName, companyEmail, address, billingAddress, /*branches,*/ password)
              .then(
                result => {
                  setSubmitting(true);
                },
                error => {
                  setStatus(error);
                  setSubmitting(false);
                }
              );
          }}
          
          render={({ errors, status, touched, isSubmitting }) => (
            <div className="container">
              <div className="jumbotron">
              <h3 className="text-center mb-5">Company Registration</h3>
              <Form>
              <div className="row">
                  <div className="form-group col-md-4">
                      <label htmlFor="corporateIdentityNumber">Corporate ID Number</label>
                      <Field name="corporateIdentityNumber" type="text" className={'form-control' + (errors.corporateIdentityNumber && touched.corporateIdentityNumber ? ' is-invalid' : '')} />
                      <ErrorMessage name="corporateIdentityNumber" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col-md-4">
                      <label htmlFor="companyName">Company Name</label>
                      <Field name="companyName" type="text" className={'form-control' + (errors.companyName && touched.companyName ? ' is-invalid' : '')} />
                      <ErrorMessage name="companyName" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col-md-4">
                      <label htmlFor="contactFirstName">First Name</label>
                      <Field name="contactFirstName" type="text" className={'form-control' + (errors.contactFirstName && touched.contactFirstName ? ' is-invalid' : '')} />
                      <ErrorMessage name="contactFirstName" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col-md-4">
                      <label htmlFor="contactLastName">Surname</label>
                      <Field name="contactLastName" type="text" className={'form-control' + (errors.contactLastName && touched.contactLastName ? ' is-invalid' : '')} />
                      <ErrorMessage name="contactLastName" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col-md-4">
                      <label htmlFor="companyEmail">Email</label>
                      <Field name="companyEmail" type="email" className={'form-control' + (errors.companyEmail && touched.companyEmail ? ' is-invalid' : '')} />
                      <ErrorMessage name="companyEmail" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col-md-4">
                      <label htmlFor="address">Address</label>
                      <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                      <ErrorMessage name="address" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col-md-4">
                      <label htmlFor="billingAddress">Billing address</label>
                      <Field name="billingAddress" type="text" className={'form-control' + (errors.billingAddress && touched.billingAddress ? ' is-invalid' : '')} />
                      <ErrorMessage name="billingAddress" component="div" className="invalid-feedback" />
                  </div>
                  {/*<div className="form-group col-md-4">
                      <label htmlFor="branches">Branch</label>
                      <Field component="select" name="branches" className={'form-control' + (errors.branches && touched.branches ? ' is-invalid' : '')}>
                          <option value="bygg">Bygg</option>
                          <option value="kök">Kök</option>
                          <option value="it">IT</option>
                          <option value="elektronisk">Elektronisk</option>
                      </Field>
                      <ErrorMessage name="branches" component="div" className="invalid-feedback" />
          </div>*/}
                  <div className="form-group col-md-4">
                      <label htmlFor="password">Password</label>
                      <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                      <ErrorMessage name="password" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group col-md-4">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                      <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                  </div>
                  {status &&
                    <div className="col mx-auto text-center mb-5">
                    <div className={'alert alert-danger'}>{status}</div>
                    </div>
                  }
                  <div className="form-group col text-center mt-5">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button>
                    {isSubmitting &&
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="logbuffer"/>
                    }
                    <button type="reset" className="btn btn-danger ml-5">Reset</button>
                  </div>
                </div>
              </Form>
              </div>
              </div>
          )}
        />
      )
    }
  }