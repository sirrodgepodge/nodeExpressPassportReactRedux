// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component } from 'react';

// images
import logo from './logo.svg';

// styling
import './index.css';

// components
import NavbarAuth from './NavbarAuth';


export default class Navbar extends Component {
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
