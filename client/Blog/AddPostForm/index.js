// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// styling
import './index.css';

// action creators
import {
  editPost,
  addPostRequest,
  updatePostRequest,
} from '../../redux/actionCreators';


@connect(store => ({
  postForm: store.postForm,
  userInfo: {
    email: store.user && store.user.email,
    photo: store.user && ((store.user.facebook && store.user.facebook.photo) || (store.user.google && store.user.google.photo)),
    facebook_link: store.user && store.user.facebook && store.user.facebook.facebook_link,
    google_link: store.user && store.user.google && store.user.google.google_link
  }
}))
export default class PostForm extends Component {
  static propTypes = {
    postForm: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
      updating: PropTypes.bool,
      editIndex: PropTypes.number,
      editId: PropTypes.string
    }),
    dispatch: PropTypes.func.isRequired
  }

  editPost = prop => event => this.props.dispatch(
    editPost({
      [prop]: event.target.value
    })
  );
  editTitle = this.editPost('title');
  editBody = this.editPost('body');

  addPost = () => this.props.dispatch(
    addPostRequest({
      ...this.props.postForm,
      ...this.props.userInfo
    })
  );

  updatePost = () => this.props.dispatch(
    updatePostRequest(this.props.postForm)
  );

  render() {
    return (
      <li className="blog-add-post">
        <input
          className="blog-add-post-title"
          type="text"
          placeholder="Title"
          onChange={this.editTitle}
          value={this.props.postForm.title}
        />
        <textarea
          className="blog-add-post-body"
          placeholder="Body"
          onChange={this.editBody}
          value={this.props.postForm.body}
        />
        <button
          onClick={
            this.props.postForm.updating &&
            this.updatePost ||
            this.addPost
          }
        >
          {`${this.props.postForm.updating ? 'Update' : 'Add'} Post`}
        </button>
      </li>
    );
  }
}
