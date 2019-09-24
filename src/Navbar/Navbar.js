import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink } from 'mdbreact';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import LoginClient from '../Login/LoginClient';
import LoginCompany from '../Login/LoginCompany';
import Offerts from '../Offerts/Offerts';
import Home from '../Home/Home';
// import Profile from '../Profile/Profile';
//import ProfileCompany from '../Profile/ProfileCompany';
//import ProfileClient from '../Profile/ProfileClient';
import './Navbar.css';

import { history } from '../_helpers';
import { authenticationService } from '../_services';
import { PrivateRoute } from '../_imp_components';
import { UnMatched } from '../helpers/NoMatch';
import RegisterCompany from '../Register/RegisterCompany';
import OffertsCreate from '../OffertsCreate/OffertsCreate';

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
    history.push('/home');
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
                <strong>SaurNet</strong>
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
                    <MDBNavItem>
                      <MDBNavLink to='/offerts-create'>Create offert</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                  <MDBNavbarNav right>
                    <MDBNavItem>
                      {/* <MDBNavLink to='/profile'>Profile</MDBNavLink> */}
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
                  <MDBDropdown>
                      <MDBDropdownToggle nav caret>Register
                      </MDBDropdownToggle>
                      <MDBDropdownMenu basic>
                        <MDBNavLink to='/register/company' component={RegisterCompany}><MDBDropdownItem>Company</MDBDropdownItem></MDBNavLink>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                    </MDBNavItem>
                    <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>Login
                      </MDBDropdownToggle>
                      <MDBDropdownMenu basic>
                        <MDBNavLink to='/login/client' component={LoginClient}><MDBDropdownItem>Client</MDBDropdownItem></MDBNavLink>
                        <MDBNavLink to='/login/company' component={LoginCompany}><MDBDropdownItem>Company</MDBDropdownItem></MDBNavLink>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                    </MDBNavItem>
                  </MDBNavbarNav>
                </>
              }
            </MDBCollapse>
          </MDBNavbar>
          <Switch>
            <PrivateRoute path='/offerts' component={Offerts} />
            <PrivateRoute path="/offerts-create" component={OffertsCreate}/>
            <PrivateRoute path="/offerts-create" component={OffertsCreate}/>
            <PrivateRoute path="/offerts-create" component={OffertsCreate}/>
            {/* <PrivateRoute path='/profile' component={Profile} /> */}
            <Route exact path='/' component={Home} />
            <Route path='/login/client' component={LoginClient} />
            <Route path='/login/company' component={LoginCompany} />
            <Route path='/register/company' component={RegisterCompany} />
            <Route path='/logout' component={Home} />
            <Route component={UnMatched} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default Navbar;