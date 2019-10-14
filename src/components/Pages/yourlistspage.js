import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import SearchAppBar from '../UI/searchappbar';
import YourLists from '../UI/yourlists';
import * as menu from '../../constants/menu';

const styles = {
	root: {
		flexGrow: 1
	},
	header: {
		width: '100%',
		height: 56
	}
};

class YourListsPage extends React.Component {
	render() {
		const {
			classes,
			mainFeedsType,
		} = this.props;

		var title = "";
		if (mainFeedsType === menu.NEWS_FEEDS) {
			title = "Your News Lists";

		} else if (mainFeedsType === menu.SOCIAL_FEEDS) {
			title = "Your Social Lists";
		}

		return (
			<div className={classes.root}>
				<div className={classes.header}>
					<SearchAppBar title={title} />
				</div>
				<div>
					<YourLists />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	authUser: state.sessionState.authUser,
	mainType: state.uiState.mainType,
	mainFeedsType: state.uiState.mainFeedsType,
	activeCategory: state.uiState.activeCategory,
	categories: state.uiState.categories,
});

export default connect(mapStateToProps)(withStyles(styles)(YourListsPage));
