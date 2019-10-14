import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import * as maintypes from '../../constants/menu';
import { Button } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';


const styles = {
	root: {
		flexGrow: 1
	},
	grid_item: {
		marginTop: 5,
		width: 130
	},
	title_btn: {
        // marginLeft: 5,
		textTransform: 'inherit'		
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
		marginTop: 13,
		width: 22,
        height: 22,
		backgroundColor: grey[900]
	}
};

class MainTitleBtn extends React.Component {
	render() {
		const { maintype, onClick, classes } = this.props;

		return (
			<div className={classes.root}>
			<Button className={classes.title_btn} onClick={onClick}>
				{maintype === maintypes.NEWS && (
					<Grid container alignItems="flex-start">
						<Grid item className={classes.grid_item}>
							<Typography className={classes.title} variant="h6">NewsRaven</Typography>
						</Grid>
						<Avatar alt={"news"} src={"/static/images/planet.gif"} className={classes.avatar} />
					</Grid>
				)}
				{maintype === maintypes.REDDIT && (
					<Grid container alignItems="flex-start">
						<Grid item className={classes.grid_item}>
							<Typography className={classes.title} variant="h6">NewsRaven</Typography>
						</Grid>
						<Avatar alt={"reddit"} src={"/static/images/reddit.png"} className={classes.avatar} />
					</Grid>
				)}
				{maintype === maintypes.TWITTER && (
					<Grid container alignItems="flex-start">
						<Grid item className={classes.grid_item}>
							<Typography className={classes.title} variant="h6">NewsRaven</Typography>
						</Grid>
						<Avatar alt={"twitter"} src={"/static/images/twitter.png"} className={classes.avatar} />
					</Grid>
				)}
			</Button>				
			</div>
		);
	}
}

export default withStyles(styles)(MainTitleBtn);
