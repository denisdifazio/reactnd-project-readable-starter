import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleDrawer } from "../actions/index";
import { withStyles } from "material-ui/styles";
import withWidth, { isWidthUp } from "material-ui/utils/withWidth";
import { compose } from "recompose";
import Drawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import CategoryList from "./CategoryList";
import Typography from "material-ui/Typography";

const styles = theme => ({
  drawerPaper: {
    width: 250
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    paddingLeft: 20,
    display: "flex",
    alignItems: "center"
  }
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
        <div className={this.props.classes.drawerHeader}>
          <Typography type="title" color="inherit">
            Readable
          </Typography>
        </div>
        <Divider />
        <CategoryList />
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
