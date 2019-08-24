import React from 'react';
import './Product.css'

export default function Product(props) {
  return (
    <tbody>
      <tr>
        <td>{props.i}</td>
        <td>{props.owner}</td>
        <td>{props.productName}</td>
        <td>{props.branch}</td>
        <td>{props.terms}</td>
        <td>{props.amount}</td>
      </tr>
    </tbody>
  );
}