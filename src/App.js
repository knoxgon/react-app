import React from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="general-div">
        <Navbar>
        </Navbar>
        <Footer></Footer>
      </div>
    );
  }
}