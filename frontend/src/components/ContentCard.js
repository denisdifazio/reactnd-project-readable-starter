import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Card from "material-ui/Card";
import VoteContainer from "./VoteContainer";

const styles = theme => ({
  card: {
    display: "flex"
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0
  }
});

class ContentCard extends Component {
  render() {
    return (
      <Card className={this.props.classes.card}>
        <VoteContainer voteScore={this.props.voteScore} />
        <div className={this.props.classes.contentContainer}>
          {this.props.children}
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(ContentCard);
