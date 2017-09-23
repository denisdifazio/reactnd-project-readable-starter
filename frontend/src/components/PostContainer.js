import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "material-ui/Grid";
import PostCard from "./PostCard";

class PostContainer extends Component {
  render() {
    return (
      <div>
        <PostCard {...this.props.post} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  post: state.postsData.posts.find(post => post.id === ownProps.match.params.id)
});

export default connect(mapStateToProps)(PostContainer);
