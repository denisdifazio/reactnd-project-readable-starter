import React, { Component } from "react";
import { sortPosts } from "../actions/index";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import Input from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";

const styles = theme => ({
  select: {
    color: "rgba(255, 255, 255, 1)",
    fontWeight: 500,
    fontSize: "14px"
  },
  disabled: {
    color: theme.palette.text.disabled
  },
  inkbar: {
    "&:after": {
      backgroundColor: theme.palette.common.white
    }
  },
  underline: {
    "&:before": {
      backgroundColor: theme.palette.common.transparent
    },
    "&:hover:not($disabled):before": {
      backgroundColor: theme.palette.common.transparent
    }
  },
  icon: {
    top: 1,
    color: theme.palette.common.white
  }
});

class FilterSelect extends Component {
  handleChange = event => {
    this.props.sortPosts(event.target.value);
  };
  render() {
    return (
      <FormControl>
        <Select
          classes={{
            root: this.props.classes.select,
            icon: this.props.classes.icon
          }}
          value={this.props.sortType}
          onChange={this.handleChange}
          input={
            <Input
              classes={{
                inkbar: this.props.classes.inkbar,
                underline: this.props.classes.underline
              }}
              id="age-simple"
            />
          }
        >
          {this.props.children}
        </Select>
      </FormControl>
    );
  }
}

const mapStateToProps = state => ({
  sortType: state.postsData.sortType
});

const mapDispatchToProps = dispatch => ({
  sortPosts: sortType => dispatch(sortPosts(sortType))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(FilterSelect);
