import React, { Component } from "react";
import Grid from "material-ui/Grid";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

const styles = {
  inputContainer: {
    paddingBottom: 20
  },
  commentLabel: {
    paddingBottom: 20
  }
};

class CommentsGrid extends Component {
  render() {
    return (
      <div>
        <Typography
          className={this.props.classes.commentLabel}
          type="display1"
        >{`Comments`}</Typography>
        <div className={this.props.classes.inputContainer}>
          <CommentInput post={this.props.post} />
        </div>
        <div>
          <Grid container spacing={24}>
            {this.props.comments &&
              this.props.comments
                .filter(comment => !comment.deleted)
                .map(comment => (
                  <Grid item key={comment.id} xs={12}>
                    <CommentCard
                      key={comment.id}
                      {...comment}
                      gridView={false}
                    />
                  </Grid>
                ))}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CommentsGrid);
