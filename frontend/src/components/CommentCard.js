import React, { Component } from "react";
import withWidth, { isWidthUp } from "material-ui/utils/withWidth";
import { fetchVoteComment } from "../actions/index";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import { push } from "react-router-redux";
import { timeSince } from "../utils/StringHelper";
import { compose } from "recompose";
import { CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import EditIcon from "material-ui-icons/ModeEdit";
import DeleteIcon from "material-ui-icons/Delete";
import ContentCard from "./ContentCard";
import { Link } from "react-router-dom";
import Typography from "material-ui/Typography";

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
  voteUp = () => {
    this.props.voteComment(this.props.id, "upVote");
  };

  voteDown = () => {
    this.props.voteComment(this.props.id, "downVote");
  };

  render() {
    const {
      author,
      body,
      deleted,
      parentDeleted,
      id,
      parentId,
      timestamp,
      voteScore
    } = this.props;

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
            <Typography type="body2" className={this.props.classes.commentBody}>
              {body}
            </Typography>
          </CardContent>
        )}

        <div className={this.props.classes.contentFooterContainer}>
          <Button className={this.props.classes.contentFooterButtonsContainer}>
            {isWidthUp("sm", this.props.width) ? "EDIT" : <EditIcon />}
          </Button>
          <Button className={this.props.classes.contentFooterButtonsContainer}>
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
  voteComment: (id, vote) => dispatch(fetchVoteComment(id, vote))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withWidth()
)(CommentCard);
