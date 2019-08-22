import React from 'react';
import Button from 'react-bootstrap/Button';
import './Product.css'

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="container">
        <div className="card-deck mb-3 text-center">
          <div className="card mb-4 box-shadow">
            <h2 className="card-header">{this.props.prodTitle}</h2>
            {/*<img src={require(this.props.image)} alt="Something"></img>*/}
            <p className="card-text text-primary">Description: {this.props.desc} </p>
            <p className="font-weight-bold text-success">Price: {this.props.price} </p>
            <Button className="btn mt-auto btn-primary" variant="success">Add to cart: {this.props.isAvailable}</Button>
          </div>
        </div>
      </div>
    );
  }
}