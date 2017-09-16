import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import withWidth, { isWidthUp } from "material-ui/utils/withWidth";
import { compose } from "recompose";
import { toggleDrawer } from "../actions/index";
import { connect } from "react-redux";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import Hidden from "material-ui/Hidden";

const styles = {
  appBar: {
    overflow: "hidden",
    position: "fixed",
    color: "primary"
  },
  menuButton: {
    marginLeft: -20,
    marginRight: 10
  }
};

class Header extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  setToggleDrawer = () => {
    this.props.toggleDrawer(!this.props.drawer.open);
  };

  render() {
    const drawer = this.props.drawer;
    return (
      <AppBar
        className={this.props.classes.appBar}
        style={
          isWidthUp("md", this.props.width) ? (
            { width: `calc(100% - ${drawer.width}px)` }
          ) : (
            { width: "100%" }
          )
        }
      >
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              className={this.props.classes.menuButton}
              onClick={this.setToggleDrawer}
              color="contrast"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  drawer: state.drawer
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: open => dispatch(toggleDrawer(open))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withWidth()
)(Header);
