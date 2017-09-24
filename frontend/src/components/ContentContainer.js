import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import withWidth from "material-ui/utils/withWidth";
import { connect } from "react-redux";
import { compose } from "recompose";
import { CircularProgress } from "material-ui/Progress";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PostsGrid from "./PostsGrid";
import PostContainer from "./PostContainer";
import AddPostButton from "./AddPostButton";
import Hidden from "material-ui/Hidden";
import AddEditPostContainer from "./AddEditPostContainer";

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
    return (
      <div className={this.props.classes.content}>
        {this.props.postsData.isFetching ? (
          <CircularProgress className={this.props.classes.progress} size={75} />
        ) : (
          <div>
            <Switch>
              <Route
                exact
                path="/(new|edit)/:post"
                component={AddEditPostContainer}
              />
              <Route exact path="/:category" component={PostsGrid} />
              <Route exact path="/:category/:id" component={PostContainer} />
            </Switch>

            <Hidden mdUp>
              <Route exact path="/:category" component={AddPostButton} />
            </Hidden>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  router: state.router,
  postsData: state.postsData
});

export default compose(
  withRouter,
  connect(mapStateToProps),
  withStyles(styles),
  withWidth()
)(ContentContainer);
