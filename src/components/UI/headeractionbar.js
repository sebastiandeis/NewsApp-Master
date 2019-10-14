import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

import * as MENU from '../../constants/menu';
import * as ROUTES from '../../constants/routes';


const styles = theme => ({
	root: {
		flexGrow: 1,
		marginLeft: 6,
		marginRight: 6,
	},
	grid: {
		justifyContent: 'center',
		flexWrap: 'inherit',
	},
	fab: {
		margin: theme.spacing(1),
		backgroundColor: 'rgba(74, 74, 74, 1)',
		color: '#ffffff',
		fontSize: '0.7em',
		borderRadius: '25px',
		paddingLeft: 10,
		paddingRight: 10,
		fontWeight: 400,
		'&:hover': {
			backgroundColor: 'rgba(74, 74, 74, 1)',
		}
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	iconImg: {
		height: 'auto',
		width: 18,
		marginRight: theme.spacing(1),
	},
	linkitem: {
        textDecoration: "none"
    },
});

class HeaderActionBar extends React.Component {
	render() {
		const { classes, mainFeedsType } = this.props;
		const mainFeedImg = mainFeedsType === MENU.NEWS_FEEDS ? '/static/images/icons/newspaper2.gif' : '/static/images/icons/members.gif';
		const yourListsRoute = mainFeedsType === MENU.NEWS_FEEDS ? ROUTES.YOUR_NEWS_LISTS : ROUTES.YOUR_SOCIAL_LISTS;

		return (
			<div className={classes.root}>
				<Grid container className={classes.grid}>
					<Link className={classes.linkitem} to={yourListsRoute}>
						<Button className={classes.fab} variant="contained" size="small">
							<img className={classes.iconImg} src={mainFeedImg} alt='Your Lists' />
							Your&nbsp;Lists
						</Button>
					</Link>
					<Button className={classes.fab} variant="contained" size="small">
						<img className={classes.iconImg} src="/static/images/icons/discover.gif" alt='Discover' />
						Discover
      				</Button>
					<Button className={classes.fab} variant="contained" size="small">
						<AddIcon fontSize='small' />
						Create
      				</Button>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	mainFeedsType: state.uiState.mainFeedsType,
})

export default connect(mapStateToProps)(withStyles(styles)(HeaderActionBar))
