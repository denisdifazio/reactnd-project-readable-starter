import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "material-ui/Grid";
import CommentCard from "./CommentCard";
import InputComment from "./InputComment";
import { withStyles } from "material-ui/styles";

const styles = {
  inputContainer: {
    paddingBottom: 20
  }
};

class CommentsGrid extends Component {
  render() {
    return (
      <div>
        <div className={this.props.classes.inputContainer}>
          <InputComment post={this.props.post} />
        </div>
        <div>
          <Grid container spacing={24}>
            {this.props.comments &&
              this.props.comments.map(comment => (
                <Grid item key={comment.id} xs={12}>
                  <CommentCard key={comment.id} {...comment} gridView={false} />
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CommentsGrid);
