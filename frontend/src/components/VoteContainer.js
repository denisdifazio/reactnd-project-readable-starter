import React, { Component } from "react";
import PropTypes from "prop-types";
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
  static propTypes = {
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    voteScore: PropTypes.number.isRequired
  };

  render() {
    return (
      <div className={this.props.classes.voteContainer}>
        <IconButton onClick={this.props.voteUp}>
          <ArrowUp />
        </IconButton>
        <Typography>{intToString(this.props.voteScore)}</Typography>
        <IconButton onClick={this.props.voteDown}>
          <ArrowDown />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles)(VoteContainer);
