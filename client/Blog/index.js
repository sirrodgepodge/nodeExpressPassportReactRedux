// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component } from 'react';

import AddPostForm from './AddPostForm';
import BlogPost from './BlogPost';

import './index.css';

const cleanState = () => ({
  addOrUpdate: 'add',
  title: '',
  body: '',
  editIndex: null
});


export default class Blog extends Component {
  static defaultProps = {
    posts: []
  };

  state = cleanState();

  updateState(prop, event) {
    this.setState({
      [prop]: event.target.value
    });
  }
  updateTitle = this.updateState.bind(this, 'title');
  updateBody = this.updateState.bind(this, 'body');

  editPost = (post, index) => {
    this.setState({
      addOrUpdate: 'update',
      title: post.title,
      body: post.body,
      editIndex: index
    });
  }

  addPost = () => {
    this.props.addPost(this.state);
    this.setState(cleanState());
  }

  updatePost = () => {
    this.props.updatePost(this.state);
    this.setState(cleanState());
  }

  render() {
    return (
      <ul className="blog-list">
        <AddPostForm
          title={this.state.title}
          titleChange={this.updateTitle}
          body={this.state.body}
          bodyChange={this.updateBody}
          buttonStr={`${this.state.addOrUpdate === 'update' ? 'Update' : 'Add'} Post`}
          buttonClickFunc={
            this.state.addOrUpdate === 'update' &&
            this.updatePost ||
            this.addPost
          }
        />
        {
          this.props.posts.map((post, index) =>
            <BlogPost
              key={post._id}
              index={index}
              post={post}
              delete={this.props.deletePost}
              edit={this.editPost}
              userEmail={this.props.userEmail}
            />
          )
        }
      </ul>
    );
  }
}
