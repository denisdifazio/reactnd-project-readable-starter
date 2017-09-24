import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { compose } from "recompose";
import { toggleDrawer } from "../actions/index";
import { connect } from "react-redux";
import { capitalizeString } from "../utils/StringHelper";
import { push } from "react-router-redux";
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
            {this.props.match.params.category === "new" ? (
              "New Post"
            ) : (
              capitalizeString(this.props.match.params.category)
            )}
          </Typography>
          <Button color="contrast">Last 24 Hours</Button>
          <Hidden mdDown>
            <Button
              onClick={() => this.props.setPage("new/post")}
              color="contrast"
            >
              New Post
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({ drawer: state.drawer });

const mapDispatchToProps = dispatch => ({
  setPage: page => dispatch(push(`/${page}`)),
  toggleDrawer: open => dispatch(toggleDrawer(open))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Header);
