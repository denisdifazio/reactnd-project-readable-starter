import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import withWidth, { isWidthUp } from "material-ui/utils/withWidth";
import { compose } from "recompose";
import { toggleDrawer } from "../actions/index";
import { connect } from "react-redux";
import { capitalizeString } from "../utils/StringHelper";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import Hidden from "material-ui/Hidden";
import Typography from "material-ui/Typography";

const styles = {
  appBar: {
    position: "absolute",
    color: "primary"
  },
  menuButton: {
    marginLeft: -20,
    marginRight: 10
  }
};

class Header extends Component {
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
          <Typography type="title" color="inherit">
            {this.props.content.category &&
              capitalizeString(this.props.content.category)}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  drawer: state.drawer,
  content: state.content
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: open => dispatch(toggleDrawer(open))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withWidth()
)(Header);
