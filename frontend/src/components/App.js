import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { fetchRequest, fetchCategories, fetchAllPosts } from "../actions/index";
import "typeface-roboto";
import { withStyles } from "material-ui/styles";
import Header from "./Header";
import LeftDrawer from "./LeftDrawer";
import ContentContainer from "./ContentContainer";

const styles = {
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
};

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchRequest();
    this.props.fetchAllPosts();
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.appFrame}>
          <Header />
          <LeftDrawer />
          <ContentContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  router: state.router
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
