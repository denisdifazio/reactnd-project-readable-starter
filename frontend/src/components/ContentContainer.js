import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import withWidth from "material-ui/utils/withWidth";
import { connect } from "react-redux";
import { compose } from "recompose";
import Grid from "material-ui/Grid";
import PostCard from "./PostCard";
import { CircularProgress } from "material-ui/Progress";

const DRAWER_WIDTH = 250;

const styles = theme => ({
  content: {
    boxSizing: "border-box",
    overflow: "auto",
    position: "absolute",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    height: "calc(100% - 56px)",
    marginTop: 56,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px)",
      marginTop: 64
    },
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: `${DRAWER_WIDTH}px`
    }
  },
  progress: {
    alignSelf: "center"
  }
});

class ContentContainer extends Component {
  render() {
    const content = this.props.content;
    return (
      <div className={this.props.classes.content}>
        {content.isFetching ? (
          <CircularProgress className={this.props.classes.progress} size={75} />
        ) : (
          <Grid container spacing={24}>
            {content.posts.map(post => (
              <Grid item key={post.id} xs={12}>
                <PostCard {...post} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  content: state.content
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
  withWidth()
)(ContentContainer);
