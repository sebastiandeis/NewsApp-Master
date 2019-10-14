import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import SearchArticleBar from '../UI/searcharticlebar';
import SearchResultView from '../UI/searchresultview';

const styles = {
	root: {
		flexGrow: 1
	},
	header: {
		width: '100%',
		height: 56
	}
};

class SearchedArticlePage extends React.Component {

	render() {
		const {
			classes
		} = this.props;

		var title = "Searched Article";

		return (
			<div className={classes.root}>
				<div className={classes.header}>
					<SearchArticleBar title={title}/>
				</div>
				<SearchResultView />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(withStyles(styles)(SearchedArticlePage));
