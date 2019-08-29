import React from 'react';
import './Footer.css'
export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <footer id="main-footer">
        <div className="footer-copyright text-center py-4">© 2019 Copyright:
          <a href="https://bidstacker.com/"> BidStacker.com</a>
        </div>
      </footer>
    )
  }
}