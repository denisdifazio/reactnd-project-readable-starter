import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import withWidth from "material-ui/utils/withWidth";
import { connect } from "react-redux";
import { compose } from "recompose";
import { CircularProgress } from "material-ui/Progress";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PostsGrid from "./PostsGrid";

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
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
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
          <Route exact path="/:category" component={PostsGrid} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  content: state.content
});

export default withRouter(
  compose(connect(mapStateToProps), withStyles(styles), withWidth())(
    ContentContainer
  )
);
