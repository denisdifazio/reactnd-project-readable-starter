import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import withWidth, { isWidthUp } from "material-ui/utils/withWidth";
import { connect } from "react-redux";
import { compose } from "recompose";
import Grid from "material-ui/Grid";
import PostCard from "./PostCard";

const styles = theme => ({
  content: {
    boxSizing: "border-box",
    overflow: "auto",
    position: "absolute",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    height: "calc(100% - 64px)",
    marginTop: 64,
    [theme.breakpoints.up("sm")]: {
      content: {
        height: "calc(100% - 64px)",
        marginTop: 64
      }
    }
  }
});

class PostsContainer extends Component {
  render() {
    const drawer = this.props.drawer;
    return (
      <div
        className={this.props.classes.content}
        style={
          isWidthUp("md", this.props.width) ? (
            {
              width: `calc(100% - ${drawer.width}px)`,
              marginLeft: `${drawer.width}px`
            }
          ) : (
            {
              width: "100%"
            }
          )
        }
      >
        <Grid container spacing={24}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
            <Grid item key={value} xs={12}>
              <PostCard />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  drawer: state.drawer,
  content: state.content
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
  withWidth()
)(PostsContainer);
