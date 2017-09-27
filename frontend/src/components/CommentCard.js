import React, { Component } from "react";
import withWidth, { isWidthUp } from "material-ui/utils/withWidth";
import {
  fetchVoteComment,
  fetchEditComment,
  fetchDeleteComment
} from "../actions/index";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import { push } from "react-router-redux";
import { timeSince } from "../utils/StringHelper";
import { compose } from "recompose";
import { CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import EditIcon from "material-ui-icons/ModeEdit";
import DeleteIcon from "material-ui-icons/Delete";
import CancelIcon from "material-ui-icons/Cancel";
import ContentCard from "./ContentCard";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";

const styles = theme => ({
  commentInformation: {
    color: theme.palette.text.secondary
  },
  cardContentRoot: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  commentBody: {
    display: "flex",
    alignItems: "center",
    fontSize: 16,
    flex: 1,
    wordBreak: "break-all"
  },
  contentFooterContainer: {
    display: "flex",
    justifyContent: "flex-start"
  },
  contentFooterButtonsContainer: {
    [theme.breakpoints.down("sm")]: {
      flex: 1,
      minWidth: 0
    }
  }
});

class CommentCard extends Component {
  state = {
    editing: false,
    body: this.props.body
  };

  voteUp = () => {
    this.props.voteComment(this.props.id, "upVote");
  };

  voteDown = () => {
    this.props.voteComment(this.props.id, "downVote");
  };

  editComment = () => {
    if (this.state.editing) {
      const comment = {
        timestamp: Date.now(),
        body: this.state.body
      };
      this.props.fetchEditComment(this.props.id, comment);
    }

    this.setState({ editing: !this.state.editing });
  };

  handleChange = event => {
    this.setState({
      body: event.target.value
    });
  };

  render() {
    const { author, body, timestamp, voteScore } = this.props;

    return (
      <ContentCard
        gridView={this.props.gridView}
        voteUp={this.voteUp}
        voteDown={this.voteDown}
        voteScore={voteScore}
      >
        {!this.props.gridView && (
          <CardContent
            classes={{
              root: this.props.classes.cardContentRoot
            }}
          >
            <Typography
              type="body1"
              className={this.props.classes.commentInformation}
            >
              {`submitted ${timeSince(timestamp)} by ${author}`}
            </Typography>
            {this.state.editing ? (
              <TextField
                id="body"
                label="Comment"
                multiline
                fullWidth
                rowsMax="10"
                margin="normal"
                autoFocus
                onChange={this.handleChange}
                value={this.state.body}
              />
            ) : (
              <Typography
                type="body2"
                className={this.props.classes.commentBody}
              >
                {body}
              </Typography>
            )}
          </CardContent>
        )}

        <div className={this.props.classes.contentFooterContainer}>
          <Button
            className={this.props.classes.contentFooterButtonsContainer}
            color={this.state.editing ? "primary" : "default"}
            raised={this.state.editing}
            onClick={this.editComment}
          >
            {isWidthUp("sm", this.props.width) ? "EDIT" : <EditIcon />}
          </Button>
          {this.state.editing && (
            <Button
              className={this.props.classes.contentFooterButtonsContainer}
              onClick={() => this.setState({ editing: false })}
            >
              {isWidthUp("sm", this.props.width) ? "CANCEL" : <CancelIcon />}
            </Button>
          )}
          <Button
            className={this.props.classes.contentFooterButtonsContainer}
            onClick={() => this.props.fetchDeleteComment(this.props.id)}
          >
            {isWidthUp("sm", this.props.width) ? "DELETE" : <DeleteIcon />}
          </Button>
        </div>
      </ContentCard>
    );
  }
}

const mapStateToProps = state => ({
  router: state.router
});

const mapDispatchToProps = dispatch => ({
  setPage: page => dispatch(push(`/${page}`)),
  voteComment: (id, vote) => dispatch(fetchVoteComment(id, vote)),
  fetchEditComment: (id, comment) => dispatch(fetchEditComment(id, comment)),
  fetchDeleteComment: id => dispatch(fetchDeleteComment(id))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withWidth()
)(CommentCard);
