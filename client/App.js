// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import request from './utils/request';

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

  addPost = postState => {
    const postBody = {
      title: postState.title,
      body: postState.body
    };

    request.post({
      route: '/api/post',
      body: postBody
    }).then(res => !console.log(res.data) && this.setState({
      posts: [res.data].concat(this.state.posts)
    }));
  };

  updatePost = (postState, id) => {
    const index = postState.editIndex;
    request.put({
      route: `/api/post/${this.state.posts[index]._id}`,
      body: {
        title: postState.title,
        body: postState.body,
        createdDate: new Date()
      }
    }).then(res => {
      const newPosts = this.state.posts.slice(); // removes reference to old array (arrays are objects!)
      newPosts[index] = res.data;
      this.setState({
        posts: newPosts
      });
    });
  };

  deletePost = id =>
    request.delete(`/api/post/${id}`)
      .then(res => this.setState({
        posts: this.state.posts.filter(val => val._id !== id) // filter deleted id out of state
      }));

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
