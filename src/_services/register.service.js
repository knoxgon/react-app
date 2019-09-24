import { handleResponse } from '../_helpers';

export const registerService = function registerCompany(
    corporateIdentityNumber, 
    companyName,
    contactFirstName,
    contactLastName,
    companyEmail,
    address,
    billingAddress,
    //branches,
    password
) {
  const requestOptions = {
    method: 'POST',
    headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
    body: JSON.stringify(
      {
        corporateIdentityNumber, 
        companyName,
        contactFirstName,
        contactLastName,
        companyEmail,
        address,
        billingAddress,
        //branches,
        password
      })
  };
  
  return fetch(process.env.REACT_APP_BLINK + '/register/company', requestOptions)
    .then(handleResponse)
    .then(result => {
      return result;
    }).catch(err => {return err});
}
