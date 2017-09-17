import React, { Component } from "react";
import { connect } from "react-redux";
import List from "material-ui/List";
import CategoryListItem from "./CategoryListItem";

class CategoryList extends Component {
  render() {
    return (
      <List>
        {this.props.categories.map(category => (
          <CategoryListItem key={category} name={category} />
        ))}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.content.categories
});

export default connect(mapStateToProps)(CategoryList);
