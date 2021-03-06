import React, { Component } from "react";
import { fetchAddPost, fetchEditPost } from "../actions/index";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withStyles } from "material-ui/styles";
import { capitalizeString } from "../utils/StringHelper";
import { create_UUID } from "../utils/StringHelper";
import { validate } from "../utils/ValidationHelper";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Button from "material-ui/Button";
import ValidationIn from "./ValidationIn";

const styles = {
  formControl: {
    minWidth: 120
  },
  paper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  select: {
    paddingTop: 10
  },
  buttons: {
    paddingTop: 30
  }
};

class AddEditPostContainer extends Component {
  state = {
    author: "",
    title: "",
    category: "",
    body: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  submitPost = group => {
    validate(group) && this.addPost();
  };

  submitEditPost = group => {
    validate(group) && this.editPost();
  };

  editPost = () => {
    const post = {
      title: this.state.title,
      body: this.state.body
    };

    this.props.fetchEditPost(this.props.post.id, post);
  };

  componentDidMount() {
    this.props.post !== undefined &&
      this.setState({
        author: this.props.post.author,
        title: this.props.post.title,
        category: this.props.post.category,
        body: this.props.post.body
      });
  }

  addPost = () => {
    const post = {
      id: create_UUID(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    };

    this.props.fetchAddPost(post);
  };

  render() {
    const editing = this.props.match.params[0] === "edit";
    const post = this.props.post;
    return editing && post === undefined ? (
      <div>Invalid post</div>
    ) : (
      <Paper className={this.props.classes.paper}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
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
                disabled={editing}
                required
                id="author"
                label="Author"
                margin="normal"
                onChange={this.handleChange("author")}
                value={this.state.author}
              />
            </ValidationIn>
          </Grid>
          <Grid item xs={12}>
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
                multiline
                id="title"
                label="Title"
                margin="normal"
                onChange={this.handleChange("title")}
                value={this.state.title}
              />
            </ValidationIn>
          </Grid>
          <Grid className={this.props.classes.select} item xs={12}>
            <ValidationIn
              groups={["form"]}
              validators={[
                {
                  rule: value => value,
                  hint: "Required"
                }
              ]}
            >
              <FormControl
                disabled={editing}
                required
                className={this.props.classes.formControl}
                value={this.state.category}
              >
                <InputLabel htmlFor="category">Category</InputLabel>

                <Select
                  value={this.state.category}
                  onChange={this.handleChange("category")}
                  input={<Input id="category" />}
                >
                  {this.props.categories
                    .filter(category => category.name !== "top")
                    .map(category => (
                      <MenuItem key={category.name} value={category.name}>
                        {capitalizeString(category.name)}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </ValidationIn>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="body"
              label="Body"
              multiline
              fullWidth
              rowsMax="10"
              margin="normal"
              onChange={this.handleChange("body")}
              value={this.state.body}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid className={this.props.classes.buttons} container spacing={16}>
              <Grid item>
                <Button
                  raised
                  color="primary"
                  onClick={() =>
                    editing
                      ? this.submitEditPost("form")
                      : this.submitPost("form")}
                >
                  {editing ? "Edit" : "Post"}
                </Button>
              </Grid>
              <Grid item>
                <Button raised onClick={() => this.props.history.goBack()}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  post: state.postsData.posts.find(
    post => post.id === ownProps.match.params.post
  ),
  categories: state.categoriesData.categories
});

const mapDispatchToProps = dispatch => ({
  fetchAddPost: post => dispatch(fetchAddPost(post)),
  fetchEditPost: (id, post) => dispatch(fetchEditPost(id, post))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(AddEditPostContainer);
