import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './OffertsCreate.css';
import { authHeader, handleInternalResponse } from '../_helpers';

export default class OffertsCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      //GUI
      showOffert: false,

      //Input data
      productName: '',
      branch: '',
      terms: '',
      amount: '',

      //Status and errors
      isLoading: false,
      successStatus: null,
      failureStatus: null
    }

    this.hideOffert = this.hideOffert.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onProductNameChange = this.onProductNameChange.bind(this);
    this.onBranchChange = this.onBranchChange.bind(this);
    this.onTermsChange = this.onTermsChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
  }

  hideOffert() {
    this.setState({showOffert: !this.state.showOffert});
  }

  onSubmit(event) {
    event.preventDefault();
    if(!this.state.branch || !this.state.productName || !this.state.terms || !this.state.amount) {
      event.stopPropagation();
      return;
    }

    let headers = new Headers(authHeader());
    headers.append('Content-Type', 'application/json');

    fetch(`${process.env.REACT_APP_BLINK}/clinput`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ 'productName': this.state.productName,
                             'branch': this.state.branch,
                             'terms': this.state.terms,
                             'amount': this.state.amount}
                          )
    })
    .then(handleInternalResponse)
    .then(resp => {
      this.setState({
        successStatus: resp, failureStatus: null
      });
    })
    .catch(err => {
      this.setState({
        failureStatus: err, successStatus: null
      });
    });
  }

  onProductNameChange(event) {
    this.setState({productName: event.target.value});
  }
  onBranchChange(event) {
    this.setState({branch: event.target.value});
  }
  onTermsChange(event) {
    this.setState({terms: event.target.value});
  }
  onAmountChange(event) {
    this.setState({amount: event.target.value});
  }


  render() {
    let optionList = [];
    for(let i = 1; i <= 100; i++) {
      optionList.push(<option>{i}</option>);
    }

    const jumboStyle = {
      'background-color': '#0ee8d8'
    }


    return (
      <div className="container">
        { !this.state.showOffert
          ?
          <div className="left">
            <button onClick={this.hideOffert} type="button" id="add-button">Create Offert</button>
          </div>
          :
          <div className="left">
            <button onClick={this.hideOffert} type="button" id="cancel-button">Cancel Offert</button>
          </div>
        }
        {this.state.showOffert ? 
        <div className="right">
          <div className="jumbotron" style={jumboStyle}>
            <Form>
              <p class="h4 mb-4 text-center bold">Your Offert</p>
              <Form.Group controlId="form.branch-control">
                <Form.Label>Branch</Form.Label>
                <Form.Control as="select" value={this.state.branch} onChange={this.onBranchChange} required>
                  <option disabled>Choose</option>
                  <option value="kök">Kök</option>
                  <option value="elektronik">Elektronik</option>
                  <option value="bygg">Bygg</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select a branch.
                </Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group controlId="form.description-control">
                <Form.Label>Product description</Form.Label>
                <Form.Control type="text" value={this.state.productName} onChange={this.onProductNameChange} required isInvalid={!this.state.productName}/>
                <Form.Control.Feedback type="invalid">
                  Please enter a description.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="form.quantity-control">
                <Form.Label>Quantity</Form.Label>
                <Form.Control as="select" value={this.state.amount} onChange={this.onAmountChange} required isInvalid={!this.state.amount}>
                  <option disabled>Choose</option>
                  { optionList }
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="form.terms-control">
                <Form.Label>Terms</Form.Label>
                <Form.Control as="select" value={this.state.terms} onChange={this.onTermsChange} required isInvalid={!this.state.terms}>
                  <option disabled>Choose</option>
                  <option value="fritt vårt lager">Fritt vårt lager</option>
                  <option value="garanti">Garanti</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Terms and conditions" required />
              </Form.Group>
              <Button onClick={this.onSubmit} variant="secondary" type="submit">
                Create
              </Button>
              {this.state.successStatus && <div className={'alert alert-primary'}>{this.state.successStatus.toString()}</div>}  
              {this.state.failureStatus && <div className={'alert alert-danger'}>{this.state.failureStatus.toString()}</div>} 
            </Form>
          </div>
        </div>
        : null}
      </div>
    );
  }
}