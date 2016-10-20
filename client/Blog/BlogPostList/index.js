// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import BlogPost from './BlogPost';

// action creators
import {
  editPost,
  deletePostRequest
} from '../../redux/actionCreators';


@connect(store => ({
  posts: store.posts,
  userEmail: store.user && store.user.email
}))
export default class PostList extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdDate: PropTypes.string.isRequired,
      email: PropTypes.string,
      photo: PropTypes.string,
      google_link: PropTypes.string,
      facebook_link: PropTypes.string
    })).isRequired,
    userEmail: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  editPost(post, index) {
    this.props.dispatch(editPost({
      updating: true,
      title: post.title,
      body: post.body,
      editIndex: index,
      editId: post._id
    }));
  }

  deletePost(_id) {
    this.props.dispatch(deletePostRequest(_id));
  }

  render() {
    return (
      <ul className="blog-post-list">
        {
          this.props.posts.map((post, index) =>
            <BlogPost
              post={post}
              index={index}
              key={post._id}
              delete={this.deletePost.bind(this)}
              edit={this.editPost.bind(this)}
              userEmail={this.props.userEmail}
            />
          )
        }
      </ul>
    );
  }
}
