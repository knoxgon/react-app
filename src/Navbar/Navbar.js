import React from 'react';
import Login from '../Login/Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../Home/Home';
import Offerts from '../Offerts/Offerts';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <Router>
        <div>
          <h2>Welcome to Our Offerts</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li><Link to={'/'} className="nav-link"> Home </Link></li>
              <li><Link to={'/login'} className="nav-link">Login</Link></li>
              <li><Link to={'/offerts'} className="nav-link">Offerts</Link></li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/offerts' component={Offerts} />
            <Route path='/login' component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}