// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

// styling
import './index.css';

// action creators
import { localAuthRequest, logoutRequest } from '../../redux/actionCreators';


@connect((store) => ({
  user: store.user
}))
export default class NavAuth extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      createdDate: PropTypes.string.isRequired,
      hasPassword: PropTypes.bool.isRequired,
      google: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
      }),
      facebook: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
      })
    }),
    dispatch: PropTypes.func.isRequired
  }

  handleLocalAuth = () => {
    const email = this.refs.email && this.refs.email.value;
    const password = this.refs.password && this.refs.password.value;
    this.props.dispatch(
      localAuthRequest(this.props.user ? this.props.user._id : null, email, password)
    );
  }

  logout = () => this.props.dispatch(logoutRequest());

  render() {
    const user = this.props.user;

    return (
      <ul className="navbar-auth nav navbar-nav navbar-right">
        <li
          className={`nav user-photo ${get(user, 'google.photo') && 'show'}`}
          style={get(user, 'google.photo') && {backgroundImage: `url(${user.google.photo})`}}
        />
        <li
          className={`nav user-photo ${get(user, 'facebook.photo') && 'show'}`}
          style={get(user, 'facebook.photo') && {backgroundImage: `url(${user.facebook.photo})`}}
        />
        <li className="nav-button">
          {
            (!user || !user.email || !user.hasPassword || !user.google || !user.google.photo || !user.facebook || !user.facebook.photo)
            &&
            <span>
              LOG IN &#10161;
              {
                (!user || !user.google)
                &&
                <a href="/auth/google">
                  <i className="fa fa-google o-auth-btn"/>
                </a>
              }
              {
                (!user || !user.facebook)
                &&
                <a href="/auth/facebook">
                  <i className="fa fa-facebook o-auth-btn"/>
                </a>
              }
              {
                (!user || !user.email)
                &&
                <input
                  className="nav-input"
                  ref="email"
                  placeholder="email"
                  type="text"
                />
              }
              {/*Repeating logic the the two below because of some CSS annoying-ness*/}
              {
                (!user || !user.hasPassword)
                &&
                <input
                  className="nav-input"
                  ref="password"
                  placeholder="password"
                  type="password"
                />
              }
              {
                (!user || !user.hasPassword)
                &&
                <button
                  className="local-auth-button"
                  onClick={this.handleLocalAuth}
                >
                  Post LocalAuth
                </button>
              }
            </span>
          }
          {
            user
            &&
            <a
              className="nav-button log-out-button show"
              href="#"
              onClick={this.logout}
            >
              LOG OUT
            </a>
          }
        </li>
      </ul>
    );
  }
}
