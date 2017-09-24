import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { fetchAddComment } from "../actions/index";
import { connect } from "react-redux";
import { compose } from "recompose";
import { create_UUID } from "../utils/StringHelper";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import Button from "material-ui/Button";
import ValidationIn from "./ValidationIn";
import { validate } from "../utils/ValidationHelper";

const styles = {
  container: {
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 20
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

  submitComment = group => {
    validate(group) && this.addComment();
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
        <ValidationIn
          error="helperText"
          groups={["form"]}
          validators={[
            {
              rule: value => value,
              hint: "Required"
            }
          ]}
        >
          <TextField
            required
            id="author"
            label="Author"
            rowsMax="4"
            margin="normal"
            onChange={this.handleChange("author")}
            value={this.state.author}
          />
        </ValidationIn>
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
          <Button
            raised
            color="primary"
            onClick={() => this.submitComment("form")}
          >
            Comment
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
