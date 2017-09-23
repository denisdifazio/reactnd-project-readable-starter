import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withStyles } from "material-ui/styles";
import { push } from "react-router-redux";
import { capitalizeString } from "../utils/StringHelper";
import { indigo } from "material-ui/colors";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import ReactIcon from "./ReactIcon";
import ReduxIcon from "./ReduxIcon";
import UdacityIcon from "./UdacityIcon";
import FireIcon from "./FireIcon";

const styles = theme => ({
  text: {
    textAlign: "left"
  },
  textSeleted: {
    textAlign: "left",
    color: indigo[500],
    fontWeight: "bold"
  }
});

const icons = {
  top: FireIcon,
  react: ReactIcon,
  redux: ReduxIcon,
  udacity: UdacityIcon
};

class CategoryListItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  changeCategory = () => {
    this.props.setPage(this.props.name);
  };

  render() {
    const pathname = this.props.router.location.pathname;
    const CategoryIcon = icons[this.props.name];

    return (
      <ListItem button onClick={this.changeCategory}>
        <ListItemIcon>
          <CategoryIcon
            style={
              pathname.includes(this.props.name) ? { color: indigo[500] } : {}
            }
          />
        </ListItemIcon>
        <ListItemText
          classes={
            pathname.includes(this.props.name) ? (
              { text: this.props.classes.textSeleted }
            ) : (
              { text: this.props.classes.text }
            )
          }
          primary={capitalizeString(this.props.name)}
        />
      </ListItem>
    );
  }
}

const mapStateToProps = state => ({
  router: state.router
});

const mapDispatchToProps = dispatch => ({
  setPage: page => dispatch(push(`/${page}`))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CategoryListItem);
