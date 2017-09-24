import React, { Component } from "react";
import withWidth, { isWidthUp } from "material-ui/utils/withWidth";
import { fetchVotePost } from "../actions/index";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import { push } from "react-router-redux";
import {
  intToString,
  timeSince,
  capitalizeString
} from "../utils/StringHelper";
import { compose } from "recompose";
import { CardHeader, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import CommentIcon from "material-ui-icons/ModeComment";
import EditIcon from "material-ui-icons/ModeEdit";
import DeleteIcon from "material-ui-icons/Delete";
import ContentCard from "./ContentCard";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Typography from "material-ui/Typography";

const styles = theme => ({
  cardHeaderRoot: { flex: 1 },
  cardHeaderContent: { minWidth: 0 },
  cardHeaderTitle: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
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
  },
  commentsButton: {
    display: "flex"
  },
  commentButtonNumber: {
    paddingRight: 3
  }
});

class PostCard extends Component {
  voteUp = () => {
    this.props.votePost(this.props.id, "upVote");
  };

  voteDown = () => {
    this.props.votePost(this.props.id, "downVote");
  };

  render() {
    const {
      author,
      body,
      category,
      deleted,
      id,
      timestamp,
      title,
      voteScore,
      comments
    } = this.props;

    return (
      <ContentCard
        gridView={this.props.gridView}
        voteUp={this.voteUp}
        voteDown={this.voteDown}
        voteScore={voteScore}
      >
        <CardHeader
          classes={{
            root: this.props.classes.cardHeaderRoot,
            content: this.props.classes.cardHeaderContent,
            title: this.props.classes.cardHeaderTitle
          }}
          title={<Link to={`/${category}/${id}`}>{title}</Link>}
          subheader={`submitted ${timeSince(
            timestamp
          )} by ${author} to ${capitalizeString(category)}`}
        />
        {!this.props.gridView && <CardContent>{body}</CardContent>}
        <div className={this.props.classes.contentFooterContainer}>
          {this.props.gridView && (
            <Button
              color="primary"
              className={this.props.classes.contentFooterButtonsContainer}
              onClick={() => this.props.setPage(`${category}/${id}`)}
            >
              {isWidthUp("sm", this.props.width) ? typeof comments !==
              "undefined" ? (
                `${intToString(comments.length)} COMMENTS`
              ) : (
                "0 COMMENTS"
              ) : (
                <div className={this.props.classes.commentsButton}>
                  <Typography
                    className={this.props.classes.commentButtonNumber}
                    type="body2"
                    color="inherit"
                  >
                    {typeof comments !== "undefined" ? (
                      intToString(comments.length)
                    ) : (
                      "0"
                    )}
                  </Typography>
                  <CommentIcon />
                </div>
              )}
            </Button>
          )}

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
  votePost: (id, vote) => dispatch(fetchVotePost(id, vote))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withWidth()
)(PostCard);
