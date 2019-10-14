import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import ArticleBar from '../UI/articlebar';
import SortableList from '../UI/sortablelist';
import * as menu from '../../constants/menu';

const styles = {
	root: {
		flexGrow: 1,
	},
	header: {
		width: '100%',
		height: 56
	}
};

class TestPage extends React.Component {
	render() {
		const {
			classes,
			mainType
		} = this.props;

		var title = "";
		if (mainType === menu.NEWS) {
			title = "Article";
		} else if (mainType === menu.REDDIT) {
			title = "Reddit Post";
		} else if (mainType === menu.TWITTER) {
			title = "Twitter Thread";
		}

		return (
			<div className={classes.root}>
				<div className={classes.header}>
					<ArticleBar title={title}/>
				</div>
    			<SortableList />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	authUser: state.sessionState.authUser,
	mainType: state.uiState.mainType
});

export default connect(mapStateToProps)(withStyles(styles)(TestPage));
