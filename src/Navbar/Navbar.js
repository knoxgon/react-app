import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink } from 'mdbreact';
import Login from '../Login/Login';
import Offerts from '../Offerts/Offerts';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';

import { history } from '../_helpers';
import { authenticationService } from '../_services';
import { PrivateRoute } from '../_imp_components';
import { UnMatched } from '../helpers/NoMatch';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      collapse: false,
      currentUser: null
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  onClick = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    const currentUser = this.state.currentUser;

    return (
      <>
        <Router history={history}>
          <MDBNavbar style={{ backgroundColor: '#00BFFF' }} dark expand="md" scrolling fixed="top">
            <MDBNavbarBrand>
              <MDBNavLink to='/'>
                <strong>BidStacker</strong>
              </MDBNavLink>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>

              {currentUser &&
                <>
                  <MDBNavbarNav left>
                    <MDBNavItem active>
                      <MDBNavLink to='/'>Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to='/offerts'>Offerts</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                  <MDBNavbarNav right>
                    <MDBNavItem>
                      <MDBNavLink to='/profile'>Profile</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to='/logout' onClick={this.logout}>Logout</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                </>
              }
              {!currentUser &&
                <>
                  <MDBNavbarNav left>
                    <MDBNavItem>
                      <MDBNavLink to='/' component={Home}>Home</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                  <MDBNavbarNav right>
                    <MDBNavItem>
                      <MDBNavLink to='/login' component={Login}>Login</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                </>
              }
            </MDBCollapse>
          </MDBNavbar>
          <Switch>
            <PrivateRoute path='/offerts' component={Offerts} />
            <PrivateRoute path='/profile' component={Profile} />
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Login} />
            <Route component={UnMatched} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default Navbar;