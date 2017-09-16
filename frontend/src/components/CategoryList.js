import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import ReactIcon from "./ReactIcon";
import ReduxIcon from "./ReduxIcon";
import UdacityIcon from "./UdacityIcon";
import FireIcon from "./FireIcon";

const styles = theme => ({
  text: {
    textAlign: "left"
  }
});

class CategoryList extends Component {
  render() {
    return (
      <List>
        <ListItem button>
          <ListItemIcon>
            <FireIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ text: this.props.classes.text }}
            primary="Top"
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ReactIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ text: this.props.classes.text }}
            primary="React"
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ReduxIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ text: this.props.classes.text }}
            primary="Redux"
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <UdacityIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ text: this.props.classes.text }}
            primary="Udacity"
          />
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(CategoryList);
