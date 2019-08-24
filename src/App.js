import React from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
      </div>
    );
  }
}