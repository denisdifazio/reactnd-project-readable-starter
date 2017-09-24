import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "material-ui/Grid";
import PostCard from "./PostCard";

class PostsGrid extends Component {
  render() {
    const posts = this.props.posts;
    const category = this.props.match.params.category;
    return (
      <Grid container spacing={24}>
        {posts
          .filter(
            post =>
              !post.deleted &&
              (post.category === category || category === "top")
          )
          .map(post => (
            <Grid item key={post.id} xs={12}>
              <PostCard key={post.id} {...post} gridView={true} />
            </Grid>
          ))}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.postsData.posts
});

export default connect(mapStateToProps)(PostsGrid);
