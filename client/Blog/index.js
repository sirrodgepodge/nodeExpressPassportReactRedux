// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component } from 'react';

import AddPostForm from './AddPostForm';
import BlogPostList from './BlogPostList';

import './index.css';


export default class Blog extends Component {
  render() {
    return (
      <ul className="blog-list">
        <AddPostForm />
        <BlogPostList />
      </ul>
    );
  }
}
