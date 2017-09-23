import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
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
import Button from "material-ui/Button";

const styles = theme => ({
  appBar: {
    position: "absolute",
    color: "primary",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 250px)"
    }
  },
  menuButton: {
    marginLeft: -20,
    marginRight: 10
  },
  flex: {
    flex: 1
  }
});

class Header extends Component {
  setToggleDrawer = () => {
    this.props.toggleDrawer(!this.props.drawer.open);
  };

  render() {
    return (
      <AppBar className={this.props.classes.appBar}>
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
          <Typography
            className={this.props.classes.flex}
            type="title"
            color="inherit"
          >
            {capitalizeString(this.props.match.params.category)}
          </Typography>
          <Button color="contrast">Last 24 Hours</Button>
          <Button color="contrast">New Post</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({ drawer: state.drawer });

const mapDispatchToProps = dispatch => ({
  toggleDrawer: open => dispatch(toggleDrawer(open))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Header);
