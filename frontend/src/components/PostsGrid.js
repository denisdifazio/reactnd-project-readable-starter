import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "material-ui/Grid";
import PostCard from "./PostCard";

class PostsGrid extends Component {
  render() {
    const content = this.props.content;
    const category = this.props.match.params.category;
    return (
      <Grid container spacing={24}>
        {content.posts
          .filter(post => post.category === category || category === "top")
          .map(post => (
            <Grid item key={post.id} xs={12}>
              <PostCard key={post.id} {...post} />
            </Grid>
          ))}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  content: state.content
});

export default connect(mapStateToProps)(PostsGrid);
