// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component } from 'react';

// images
import logo from './logo.svg';

// styling
import './index.css';

// components
import NavbarAuth from './NavbarAuth';


export default class Navbar extends Component {
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
        <NavbarAuth />
      </div>
    );
  }
}
