import React from 'react';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;


  }

  render() {
    return (
      <div>
        <p>Username: </p>
        <p>Email: </p>
        <p>Fullname: </p>
      </div>
    )
  }
}