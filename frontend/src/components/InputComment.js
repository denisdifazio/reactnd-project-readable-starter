import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { fetchAddComment } from "../actions/index";
import { connect } from "react-redux";
import { compose } from "recompose";
import { create_UUID } from "../utils/StringHelper";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import Button from "material-ui/Button";

const styles = {
  container: {
    padding: 20
  },
  button: {
    paddingTop: 20
  }
};

class InputComment extends Component {
  state = {
    author: "",
    body: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  addComment = () => {
    const comment = {
      id: create_UUID(),
      parentId: this.props.post.id,
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author
    };

    this.props.fetchAddComment(comment);
  };

  render() {
    return (
      <Paper className={this.props.classes.container}>
        <TextField
          id="author"
          label="Author"
          rowsMax="4"
          margin="normal"
          onChange={this.handleChange("author")}
        />
        <TextField
          id="body"
          label="Comment"
          multiline
          fullWidth
          rowsMax="10"
          margin="normal"
          onChange={this.handleChange("body")}
        />
        <div className={this.props.classes.button}>
          <Button raised color="primary" onClick={this.addComment}>
            New Comment
          </Button>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  router: state.router
});

const mapDispatchToProps = dispatch => ({
  fetchAddComment: comment => dispatch(fetchAddComment(comment))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(InputComment);
