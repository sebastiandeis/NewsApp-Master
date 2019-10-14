import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import NewsView from './newsview';
import RedditMainCard from './redditmaincard';
import RedditCommentCard from './redditcommentcard';

const styles = theme => ({
});


class SearchResultView extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }    

    render() {
        const { selectedSearchArticle, classes } = this.props;

        var isNews = (selectedSearchArticle.type === "Breaking" || selectedSearchArticle.type === "Opinion");
        var article = selectedSearchArticle;
        if (isNews) {
            article.published = article.created;
        }

        return (
            <div>
                {isNews ? (
                    <NewsView article={article} />
                ) : (
                        <div>
                            <RedditMainCard article={selectedSearchArticle} />
                            {selectedSearchArticle.comments.map((comment, i) => (
                                <RedditCommentCard comment={comment} number={i} />
                            ))}
                            <Button className={classes.actionbtn} size="small" color="primary"
                                target="_blank" href={selectedSearchArticle.url}>
                                Read original thread on Reddit
                        </Button>
                        </div>
                    )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    sources: state.uiState.sources,
    selectedSearchArticle: state.uiState.selectedSearchArticle
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SearchResultView));
