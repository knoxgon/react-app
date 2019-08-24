import React from 'react';
import './App.css';
import Product from './Product/Product';
import Table from 'react-bootstrap/Table';
import Login from './Login/Login';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      clientInputs: []
    }
  }

  fetchInput = () => {
    fetch('http://localhost:3000/clinput')
    .then(response => { return response.json() })
    .then(result => this.setState({ clientInputs: result }));
  }

  componentDidMount() {
    this.fetchInput();
    setInterval(this.fetchInput, 3000);
  }

  render() {
    return (
      <div>
        <Table responsive className="container">
          <thead className="contHeader">
            <tr>
              <th>#</th>
              <th>Owner</th>
              <th>Description</th>
              <th>Branch</th>
              <th>Terms</th>
              <th>Amount</th>
            </tr>
          </thead>
          {this.state.clientInputs.map((item, index) => {
            return <Product i={index + 1} owner={item.username} productName={item.productName} branch={item.branch} terms={item.terms} amount={item.amount} >
            </Product>
          })}
        </Table>
        <Login></Login>
      </div>
    );
  }
}