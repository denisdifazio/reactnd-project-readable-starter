import React, { Component } from "react";
import withWidth, { isWidthUp } from "material-ui/utils/withWidth";
import { withStyles } from "material-ui/styles";
import {
  intToString,
  timeSince,
  capitalizeString
} from "../utils/StringHelper";
import { compose } from "recompose";
import { CardHeader } from "material-ui/Card";
import Button from "material-ui/Button";
import CommentIcon from "material-ui-icons/ModeComment";
import EditIcon from "material-ui-icons/ModeEdit";
import DeleteIcon from "material-ui-icons/Delete";
import ContentCard from "./ContentCard";
import { Link } from "react-router-dom";

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
  }
});

class PostCard extends Component {
  render() {
    const {
      author,
      body,
      category,
      deleted,
      id,
      timestamp,
      title,
      voteScore
    } = this.props;

    return (
      <ContentCard voteScore={voteScore}>
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
        <div className={this.props.classes.contentFooterContainer}>
          <Button
            color="primary"
            className={this.props.classes.contentFooterButtonsContainer}
          >
            {isWidthUp("sm", this.props.width) ? (
              `${intToString(1000)} COMMENTS`
            ) : (
              <CommentIcon />
            )}
          </Button>
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

export default compose(withStyles(styles), withWidth())(PostCard);
