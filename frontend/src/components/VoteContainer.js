import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { intToString } from "../utils/StringHelper";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import ArrowUp from "material-ui-icons/ArrowDropUp";
import ArrowDown from "material-ui-icons/ArrowDropDown";
import classNames from "classnames";

const styles = {
  voteContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px"
  },
  voteContainerGridView: {
    justifyContent: "flex-start"
  }
};

class VoteContainer extends Component {
  static propTypes = {
    gridView: PropTypes.bool.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    voteScore: PropTypes.number.isRequired
  };

  render() {
    return (
      <div
        className={classNames(
          this.props.classes.voteContainer,
          !this.props.gridView && this.props.classes.voteContainerGridView
        )}
      >
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
