import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import grey from '@material-ui/core/colors/grey';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const styles = {
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: grey['900']
	},
	title: {
		flexGrow: 1,
		marginTop: 10,
		marginBottom: 10,
		padding: 5,
        fontFamily: 'Arial',
        fontSize: 16,
		fontWeight: 500,
		color: '#FFF',
		backgroundColor: grey['800']
	},
	avatar: {
		margin: 0,
		width: 24,
		height: 24
	},
	list_avatar: {
		minWidth: 36
	}
};

class SourceMenu extends React.Component {
	constructor(props) {
		super(props);

		this.handleToggle = this.handleToggle.bind(this);
	}

	handleToggle = (value) => () => {
		this.props.toggleSourceStatus(value);
	};

	render() {
		const { 
			classes,
			categories,
			categoryValue,
			sources
		} = this.props;

		var allSources = sources.filter(source => source.category === categoryValue);
		if (allSources.length === 0) {
			console.log("Unknown error!");
			return (<div></div>);			
		}

		var category = null;
		for (let item of categories) {
			if (item.value === categoryValue) {
				category = item;
				break;
			}
		}

		if (category === null) {
			console.log("Unknown error!");
			return (<div></div>);
		}

		return (
			<div className={classes.root}>
				<Typography className={classes.title}>
				<Box textAlign="center" m={1}>				
					{category.label}
					</Box>
				</Typography>
				<List dense className={classes.root}>
					{allSources.map((source) => (
						<ListItem key={source.value} button>
							<ListItemAvatar className={classes.list_avatar}>
								<Avatar alt={source.label} src={source.cimage} className={classes.avatar} />
							</ListItemAvatar>
							<ListItemText primary={source.label} />
							<ListItemSecondaryAction>
								<Checkbox
									edge="end"
									onChange={this.handleToggle(source.value)}
									checked={source.selected}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    mainType: state.uiState.mainType,
	categories: state.uiState.categories,
	activeCategory: state.uiState.activeCategory,
	sources: state.uiState.sources,
	articleNeeded: state.uiState.articleNeeded
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SourceMenu));
