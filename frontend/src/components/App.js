import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { fetchRequest, fetchCategories, fetchAllPosts } from "../actions/index";
import { indigo } from "material-ui/colors";
import "typeface-roboto";
import { withStyles } from "material-ui/styles";
import Header from "./Header";
import LeftDrawer from "./LeftDrawer";
import ContentContainer from "./ContentContainer";
import { Route } from "react-router-dom";

const styles = theme => ({
  "@global": {
    a: {
      color: indigo[500],
      textDecoration: "none"
    }
  },
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    overflow: "hidden"
  },
  appFrame: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%"
  }
});

class App extends Component {
  componentDidMount() {
    this.props.fetchRequest();
    this.props.fetchCategories();
    this.props.fetchAllPosts();
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.appFrame}>
          <Route path="/:category?" component={Header} />
          <Route path="/:category?" component={LeftDrawer} />
          <ContentContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  router: state.router,
  posts: state.postsData.posts
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: () => dispatch(fetchRequest()),
  fetchCategories: () => dispatch(fetchCategories()),
  fetchAllPosts: () => dispatch(fetchAllPosts())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(App);
