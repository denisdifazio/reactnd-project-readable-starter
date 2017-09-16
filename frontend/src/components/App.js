import React, { Component } from "react";
import "../App.css";
import "typeface-roboto";
import { Route } from "react-router-dom";
import Header from "./Header";
import LeftDrawer from "./LeftDrawer";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <Header />
              <LeftDrawer />
            </div>
          )}
        />
      </div>
    );
  }
}

export default connect()(App);
