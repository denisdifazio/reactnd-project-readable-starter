import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import PostCard from "./PostCard";
import CommentsGrid from "./CommentsGrid";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  commentsContainer: {
    paddingTop: 80
  }
};

class PostContainer extends Component {
  render() {
    return this.props.post === undefined ? (
      <div>Post not found</div>
    ) : (
      <div className={this.props.classes.container}>
        <PostCard {...this.props.post} gridView={false} />
        <div className={this.props.classes.commentsContainer}>
          <CommentsGrid
            post={this.props.post}
            comments={this.props.post.comments}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  post: state.postsData.posts.find(post => post.id === ownProps.match.params.id)
});

export default compose(connect(mapStateToProps), withStyles(styles))(
  PostContainer
);
