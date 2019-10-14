import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { withStyles } from '@material-ui/core/styles';
import RedditMainCard from './redditmaincard';
import RedditCommentCard from './redditcommentcard';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    actionbtn: {
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontSize: 12,
        marginRight: 5,
        textTransform: 'inherit',
        float: 'right',
        color: grey[400]
    }    
});

class RedditView extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const { article, classes } = this.props;

        console.log("RedditView article", article);

        return (
            <div>
                <RedditMainCard article={article} />
                {article.comments && article.comments.map((comment, i) => (
                    <RedditCommentCard comment={comment} number={i} />
                ))}
                <Button className={classes.actionbtn} size="small" color="primary"
                    target="_blank" href={article.url}>
                    Read original thread on Reddit
                </Button>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(RedditView));

