import React from 'react';
import { MDBCardText, MDBContainer } from 'mdbreact';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <MDBContainer>
        <MDBCardText>Hej, denna sida är synlig för alla.</MDBCardText>
      </MDBContainer>
    )
  }
}