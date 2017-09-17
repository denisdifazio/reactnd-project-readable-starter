import React, { Component } from "react";
import "typeface-roboto";
import { withStyles } from "material-ui/styles";
import Header from "./Header";
import LeftDrawer from "./LeftDrawer";
import PostsContainer from "./PostsContainer";
import ServerAPI from "../serverApi";

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
    //ServerAPI.getCategories().then(books => this.setState({ books }));
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.appFrame}>
          <Header />
          <LeftDrawer />
          <PostsContainer />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
