import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions";

class PostsIndex extends Component {
  componentDidMount() {
    // call the action creator fetchPosts action creator that we have
    // connected to the props using connect function at the bottom of the file
    this.props.fetchPosts();
  }
  renderPosts() {
    // using lodash function in which we pass
    // the whole object of posts and mapping each key-value in the second argument
    // which is actually the function
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    });
  }
  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <div>
          <h3> Posts </h3>
          <ul className="list-group">{this.renderPosts()}</ul>
        </div>
      </div>
    );
  }
}

// we may use mapDispatchToProps
// but as we are not using any computation
// just leaving the fetchPosts as it is so we can use
// this way also

function mapStateToProps(state) {
  // adding posts to props that are coming form the state
  return { posts: state.posts };
}

// make posts, fecthPosts, fetchPosts available at props level
export default connect(
  mapStateToProps,
  { fetchPosts: fetchPosts }
)(PostsIndex);
// could be this only
// { fetchPosts } as key and value are same title
