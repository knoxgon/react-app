import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink } from 'mdbreact';
import Login from '../Login/Login';
import Offerts from '../Offerts/Offerts';
import Home from '../Home/Home';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    return (
      <div>
        <Router>
          <header>
            <MDBNavbar style={{ backgroundColor: '#00BFFF' }} dark expand="md" scrolling fixed="top">
              <MDBNavbarBrand>
                <MDBNavLink to={'/'}>
                  <strong>MassNet</strong>
                </MDBNavLink>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to={'/'}>Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to={'/offerts'}>Offerts</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBNavLink to={'/login'}>Login</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/offerts' component={Offerts} />
            <Route path='/login' component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Navbar;