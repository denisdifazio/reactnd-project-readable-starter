import React, { Component } from "react";
import { connect } from "react-redux";
import List from "material-ui/List";
import CategoryListItem from "./CategoryListItem";

class CategoryList extends Component {
  render() {
    return (
      <List>
        {this.props.categories.map(category => (
          <CategoryListItem key={category.name} name={category.name} />
        ))}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categoriesData.categories
});

export default connect(mapStateToProps)(CategoryList);
