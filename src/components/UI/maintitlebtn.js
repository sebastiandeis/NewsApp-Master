import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
		const { onClick, classes } = this.props;

		return (
			<React.Fragment>
				<Button className={classes.title_btn} onClick={onClick}>
					<Grid container alignItems="flex-start">
						<Grid item className={classes.grid_item}>
							<Typography className={classes.title} variant="h6">NewsRaven</Typography>
						</Grid>
					</Grid>
				</Button>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(MainTitleBtn);
