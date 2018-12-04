import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchPost, deletePost } from "../actions";

class PostsShow extends Component {
  componentDidMount() {
    // this.props.match.params has all the wildcard entry existing in the url
    // provided by react router
    // if you have already the post don't grab it again just use the existing one
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    // pass an id and the callback function to the action creator
    // so that action creator will delete this specific post and then call this
    // this callback function after successful deletion
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    // get the post from the props that we have mapped to the props
    const { post } = this.props;
    // at first when you try to load the particular component to render
    // and it hasn't completely loaded yet then we will show Loading message
    // outherwise that post data when the component is re rendered yet .
    if (!post) {
      return <div> Loading...</div>;
    }
    return (
      <div>
        {/*  use Link to do navigation in redux app  */}
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p> {post.content}</p>
      </div>
    );
  }
}

// in the following function we are getting posts
// because if you look at the index.js/reducers file
// you will find two keys that are
// form and posts that we are making available to the
// state and in reducer_posts.js
// we are just adding or deleting more posts
// in that value of that key that's it
function mapStateToProps({ posts }, ownProps) {
  // in ownProps we are obtaining the things about
  // the current component that from which route the control is coming
  // from e.t.c
  return { post: posts[ownProps.match.params.id] };
}

export default connect(
  mapStateToProps,
  { fetchPost, deletePost }
)(PostsShow);
