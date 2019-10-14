import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';

import * as menu from '../../constants/menu'


const styles = {
  root: {
    width: 170,
    margin: 0,
    padding: 0,
    backgroundColor: grey['900']
  },
  menu_list: {
    paddingTop: 0,
    paddingBottom: 0
  },
  menu_item: {
    padding: 0,
    marginLeft: 10,
    marginTop: 0,
    minHeight: 24
  },
  grid_item: {
    marginTop: -3,
    width: 130
  },
  title: {
    flexGrow: 1,
    display: 'inline',
    fontFamily: 'Merriweather',
    fontSize: 22,
    fontWeight: 700,
    color: '#5ED1AA'
  },
  avatar: {
    marginTop: 5,
    width: 22,
    height: 22,
    backgroundColor: grey[900]
  }
};

class MainMenu extends React.Component {

  render() {
    const { onSelected, classes } = this.props;

    return (
      <Paper className={classes.root}>
        <MenuList className={classes.menu_list}>
          <MenuItem className={classes.menu_item} onClick={onSelected(menu.NEWS)}>
            <Grid container alignItems="flex-start">
              <Grid item className={classes.grid_item}>
                <Typography variant="h6" className={classes.title}>NewsRaven</Typography>
              </Grid>
              <Avatar alt={"news"} src={"/static/images/planet.gif"} className={classes.avatar} />
            </Grid>
          </MenuItem>
          <MenuItem className={classes.menu_item} onClick={onSelected(menu.REDDIT)}>
            <Grid container alignItems="flex-start">
              <Grid item className={classes.grid_item}>
                <Typography variant="h6" className={classes.title}>NewsRaven</Typography>
              </Grid>
              <Avatar alt={"reddit"} src={"/static/images/reddit.png"} className={classes.avatar} />
            </Grid>
          </MenuItem>
          <MenuItem className={classes.menu_item} onClick={onSelected(menu.TWITTER)}>
            <Grid container alignItems="flex-start">
              <Grid item className={classes.grid_item}>
                <Typography variant="h6" className={classes.title}>NewsRaven</Typography>
              </Grid>
              <Avatar alt={"twitter"} src={"/static/images/twitter.png"} className={classes.avatar} />
            </Grid>
          </MenuItem>
        </MenuList>
      </Paper>
    );
  }
}

export default withStyles(styles)(MainMenu);
