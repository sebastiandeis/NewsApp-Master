import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { withStyles } from '@material-ui/core/styles';
import RedditView from '../UI/redditview';

const styles = {
	root: {
		flexGrow: 1
	},
	header: {
		width: '100%',
		height: 56
	}
};

class RedditPage extends React.Component {

	componentDidMount() {
		console.log("Reddit id ", this.props.match.params.id);

		var rid = this.props.match.params.id;
		if (rid === "") return;

		this.props.getRedditPost(rid);
	}
	
	render() {
		const {
			classes,
			selectedArticle
		} = this.props;

		if (Object.keys(selectedArticle).length === 0) {
			return (
				<div></div>
			)
		}

		return (
			<div className={classes.root}>
				{/* <div className={classes.header}>
					<ArticleBar title={title}/>
				</div> */}
				<RedditView article={selectedArticle}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	authUser: state.sessionState.authUser,
	selectedArticle: state.uiState.selectedArticle
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(RedditPage));
  