import * as actionTypes from '../actionTypes';
import request from '../../utils/request';


export function initializeUserAndPosts({user, posts}) {
  return {
    type: actionTypes.INITIALIZE_APP,
    user,
    posts
  };
}

export function initializationRequests() {
  return dispatch =>
    // retrieve app initialization data once root component has mounted
    Promise.all([
      request.get('/auth/session'),
      request.get('/api/post')
    ])
    .then(([{ data: user }, { data: posts }]) =>
      dispatch(initializeUserAndPosts({
        user: user || null,
        posts: posts.sort((a,b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)) // sort by date, descending
      })));
}


export function localAuth(user) {
  return {
    type: actionTypes.LOCAL_AUTH,
    user
  };
}

export function localAuthRequest(_id, email, password) {
  const addingPassword = !!_id;
  return dispatch => request.post({
    route: addingPassword ? '/auth/addPassword' : '/auth/login',
    body: {
      _id: _id,
      email: email,
      password: password
    }
  }).then(({ data: user }) =>
    dispatch(localAuth(user)));
}


export function logout() {
  return {
    type: actionTypes.LOG_OUT
  };
}

export function logoutRequest() {
  return dispatch => request.get('/auth/logout')
    .then(() =>
      dispatch(logout()));
}


export function editPost(post) {
  return {
    type: actionTypes.EDIT_POST,
    post
  };
}


export function addPost(post) {
  return {
    type: actionTypes.ADD_POST,
    post
  };
}

export function addPostRequest(postBody) {
  return dispatch => request.post({
    route: '/api/post',
    body: postBody
  }).then(({ data }) => dispatch(addPost(data)));
}


export function updatePost({index, post}) {
  return {
    type: actionTypes.UPDATE_POST,
    index,
    post
  };
}

export function updatePostRequest(postForm) {
  const index = postForm.editIndex;
  return dispatch => request.put({
      route: `/api/post/${postForm.editId}`,
      body: {
        title: postForm.title,
        body: postForm.body,
        createdDate: new Date()
      }
    }).then(({ data }) =>
      dispatch(updatePost({
        index: index,
        post: data
      })));
}


export function deletePost(_id) {
  return {
    type: actionTypes.DELETE_POST,
    _id
  };
}

export function deletePostRequest(_id) {
  return dispatch => request.delete(`/api/post/${_id}`)
    .then(res => dispatch(deletePost(_id)));
}
