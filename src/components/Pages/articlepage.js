import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import ArticleBar from '../UI/articlebar';
import NewsView from '../UI/newsview';
import RedditView from '../UI/redditview';
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

class ArticlePage extends React.Component {
	render() {
		const {
			classes,
			mainType,
			selectedArticle
		} = this.props;

		var title = "";
		var article = {};
		if (mainType === menu.NEWS) {
			title = "Article";

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

		} else if (mainType === menu.REDDIT) {
			title = "Reddit Post";

			article = selectedArticle;
		} else if (mainType === menu.TWITTER) {
			title = "Twitter Thread";
		}

		return (
			<div className={classes.root}>
				<div className={classes.header}>
					<ArticleBar title={title}/>
				</div>
				{mainType === menu.NEWS && (
					<NewsView article={article}/>
				)}
				{mainType === menu.REDDIT && (
					<RedditView article={article}/>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	authUser: state.sessionState.authUser,
	mainType: state.uiState.mainType,
	selectedArticle: state.uiState.selectedArticle
});

export default connect(mapStateToProps)(withStyles(styles)(ArticlePage));
