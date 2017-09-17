import React, { Component } from "react";
import Card, { CardHeader } from "material-ui/Card";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import ArrowUp from "material-ui-icons/ArrowDropUp";
import ArrowDown from "material-ui-icons/ArrowDropDown";

const styles = {
  card: {
    display: "flex"
  },
  contentContainer: {
    minWidth: 0
  },
  cardHeaderContent: {
    minWidth: 0
  },
  cardHeaderTitle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  voteContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px"
  }
};

class PostCard extends Component {
  render() {
    return (
      <Card className={this.props.classes.card}>
        <div className={this.props.classes.voteContainer}>
          <IconButton>
            <ArrowUp />
          </IconButton>
          <Typography>1000</Typography>
          <IconButton>
            <ArrowDown />
          </IconButton>
        </div>
        <div className={this.props.classes.contentContainer}>
          <CardHeader
            classes={{
              content: this.props.classes.cardHeaderContent,
              title: this.props.classes.cardHeaderTitle
            }}
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(PostCard);
