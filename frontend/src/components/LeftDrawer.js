import React, { Component } from "react";
import Drawer from "material-ui/Drawer";
import { connect } from "react-redux";
import { toggleDrawer } from "../actions/index";
import { withStyles } from "material-ui/styles";

const styles = {
  drawer: {
    width: 250
  }
};

class LeftDrawer extends Component {
  handleClose = () => {
    this.props.toggleDrawer(false);
  };

  render() {
    const drawer = this.props.drawer;

    return (
      <Drawer
        type={
          this.props.browser.greaterThan["medium"] ? "permanent" : "temporary"
        }
        open={drawer.open}
        onRequestClose={this.handleClose}
        onClick={this.handleClose}
      >
        <div className={this.props.classes.drawer}>Material Admin</div>
      </Drawer>
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
  withStyles(styles)(LeftDrawer)
);
