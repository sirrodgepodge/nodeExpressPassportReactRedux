// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component } from 'react';
import logo from './logo.svg';

import './index.css';


class Navbar extends Component {
  handleLocalAuth = () => {
    const email = this.refs.email && this.refs.email.value;
    const password = this.refs.password && this.refs.password.value;
    this.props.localAuth(email, password);
  }

  render() {
    return (
      <div className="example-react-app-nav">
        <img
          src={logo}
          className="example-react-app-logo"
          alt="example-react-app-logo"
        />
        <h2 className="example-react-app-header">
          Check out React!
        </h2>
      </div>
    );
  }
}

export default Navbar;
