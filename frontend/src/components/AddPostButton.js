import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { push } from "react-router-redux";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";

const styles = {
  button: {
    position: "fixed",
    top: "95%",
    left: "95%",
    transform: "translate(-100%, -100%)"
  }
};

class AddPostButton extends Component {
  render() {
    return (
      <Button
        className={this.props.classes.button}
        fab
        color="primary"
        aria-label="add"
        onClick={() => this.props.setPage("new/post")}
      >
        <AddIcon />
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  router: state.router
});

const mapDispatchToProps = dispatch => ({
  setPage: page => dispatch(push(`/${page}`))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(AddPostButton);
