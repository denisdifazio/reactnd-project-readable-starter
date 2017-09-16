import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import { withStyles } from "material-ui/styles";
import { toggleDrawer } from "../actions/index";
import { connect } from "react-redux";

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
          this.props.browser.greaterThan["medium"] ? (
            { width: `calc(100% - ${drawer.width}px)` }
          ) : (
            { width: "100%" }
          )
        }
      >
        <Toolbar>
          <IconButton
            className={this.props.classes.menuButton}
            onClick={this.setToggleDrawer}
            color="contrast"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit">
            Readable
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  browser: state.browser,
  drawer: state.drawer
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: open => dispatch(toggleDrawer(open))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Header)
);
