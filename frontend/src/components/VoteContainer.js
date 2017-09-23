import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { intToString } from "../utils/StringHelper";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import ArrowUp from "material-ui-icons/ArrowDropUp";
import ArrowDown from "material-ui-icons/ArrowDropDown";

const styles = {
  voteContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px"
  }
};

class VoteContainer extends Component {
  render() {
    return (
      <div className={this.props.classes.voteContainer}>
        <IconButton>
          <ArrowUp />
        </IconButton>
        <Typography>{intToString(this.props.voteScore)}</Typography>
        <IconButton>
          <ArrowDown />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles)(VoteContainer);
