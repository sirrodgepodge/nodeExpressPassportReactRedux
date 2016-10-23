// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// action creators
import { initializationRequests } from './redux/actionCreators';

// other components
import Navbar from './Navbar';
import Blog from './Blog';

// this will bring this CSS file into build
import './App.css';


@connect()
export default class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  state = {
    posts: []
  }

  componentDidMount() {
    this.props.dispatch(initializationRequests());
  }

  render() {
    return (
      <div>
        <Navbar />
        <Blog
          posts={this.state.posts}
          addPost={this.addPost}
          updatePost={this.updatePost}
          deletePost={this.deletePost}
        />
      </div>
    );
  }
}
