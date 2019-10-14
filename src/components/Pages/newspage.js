import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { withStyles } from '@material-ui/core/styles';
import NewsView from '../UI/newsview';

const styles = {
	root: {
		flexGrow: 1
	},
	header: {
		width: '100%',
		height: 56
	}
};

class NewsPage extends React.Component {

	componentDidMount() {
		console.log("News id ", this.props.match.params.id);

		var nid = this.props.match.params.id;
		if (nid === "") return;

		this.props.getNewsArticle(nid);
	}
	
	render() {
		const {
			classes,
			selectedArticle
		} = this.props;

		var article = {};

		article.id = selectedArticle.nid;
		article.source = selectedArticle.source;
		article.author = selectedArticle.author;
		article.published = selectedArticle.published;
		article.translated = selectedArticle.translated;
		if (article.translated) {
			article.headline = selectedArticle.tr_headline;
			article.summary = selectedArticle.tr_summary;
			article.text = selectedArticle.tr_text;
		} else {
			article.headline = selectedArticle.headline;
			article.summary = selectedArticle.summary;
			article.text = selectedArticle.text;
		}
		article.url = selectedArticle.url;
		article.image = selectedArticle.image;
		article.summarized_text = selectedArticle.summarized_text;

		return (
			<div className={classes.root}>
				{/* <div className={classes.header}>
					<ArticleBar title={title}/>
				</div> */}
				<NewsView article={article}/>
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
)(withStyles(styles)(NewsPage));
  