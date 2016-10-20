// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component } from 'react';

// Converts javascript date object to 2-digit slashes date format
import prettyDate from '../../../utils/prettyDate';


export default class BlogPost extends Component {
  delete = this.props.delete.bind(this, this.props.post._id);
  edit = this.props.edit.bind(this, this.props.post, this.props.index);

  render() {
    return (
      <li className="blog-post">
        <h3 className="blog-title">{this.props.post.title}</h3>
        <p className="blog-body">{this.props.post.body}</p>
        <p className="blog-created-date">{prettyDate(this.props.post.createdDate)}</p>
        {
          <div>
            <button className="delete-post" onClick={this.delete}>Delete Post</button>
            <button className="update-post" onClick={this.edit}>Update Post</button>
          </div>
        }
      </li>
    );
  }
}
