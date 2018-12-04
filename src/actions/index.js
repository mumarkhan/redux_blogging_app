import axios from "axios";

// using the action type in this way like a constants
// so that we can export the same thing to the reducer
// file so that we can use them their too without any typo mistake
export const FETCH_POSTS = "fetch_posts";
export const FETCH_POST = "fetch_post";
export const CREATE_POST = "create_post";
export const DELETE_POST = "delete_post";

const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=mumarkhan999";

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost(values, callback) {
  // after creating a post just run this callback which is actually the navigation
  // to the index.js page which we are doing in the callback that we are sending from the back
  const request = axios
    .post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback());
  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id, callback) {
  const request = axios
    .delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback());

  // there is no such payload after deleting the post
  // but we are returning the id of the deleted post
  // so that this id will be used to delete that post
  // from the local state in the reducers as well
  return {
    type: DELETE_POST,
    payload: id
  };
}
