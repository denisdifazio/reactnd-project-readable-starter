import React, { Component } from "react";
import Drawer from "material-ui/Drawer";
import { connect } from "react-redux";
import { toggleDrawer } from "../actions/index";
import { withStyles } from "material-ui/styles";
import withWidth, { isWidthUp } from "material-ui/utils/withWidth";
import { compose } from "recompose";

const styles = theme => ({
  drawerPaper: {
    width: 250
  },
  drawerHeader: theme.mixins.toolbar
});

class LeftDrawer extends Component {
  handleClose = () => {
    this.props.toggleDrawer(false);
  };

  render() {
    const drawer = this.props.drawer;
    const drawerPaper = this.props.classes.drawerPaper;

    return (
      <Drawer
        classes={{ paper: drawerPaper }}
        type={isWidthUp("md", this.props.width) ? "permanent" : "temporary"}
        open={drawer.open}
        onRequestClose={this.handleClose}
        onClick={this.handleClose}
      >
        <div className={this.props.classes.drawerHeader}>Material Admin</div>
      </Drawer>
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
)(LeftDrawer);
