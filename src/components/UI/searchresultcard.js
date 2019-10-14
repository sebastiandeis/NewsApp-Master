import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import StarIcon from '@material-ui/icons/Star';

import { get_timestring } from '../../utility/utils';
import * as ROUTES from '../../constants/routes';
import * as NEWSTYPE from '../../constants/newstype';


const styles = theme => ({
    card: {
        position: 'relative',
        // maxWidth: 480,
        width: '100% - 20',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: grey[900]
    },
    header: {
        padding: 0
    },
    avatar: {
        position: 'absolute',
        top: -3,
        left: -3,
        width: 32,
        height: 32
    },
    linkitem: {
        textDecoration: "none"
    },
    title: {
        position: 'relative',
        fontFamily: 'Merriweater, serif',
        fontSize: '20px',
        lineHeight: '20px',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 10,
        marginBottom: 10,
        color: grey[50]
    },
    subtitle: {
        position: 'relative',
        marginLeft: 20,
        marginRight: 10
    },
    subtitle_left: {
        fontSize: 12,
        color: grey[500],
        float: 'left',
        position: 'relative'
    },
    subtitle_right: {
        fontSize: 12,
        color: grey[500],
        float: 'right',
        marginRight: 10
    },
    source_img: {
        position: 'relative',
        width: 'auto',
        float: 'left',
        height: 12,
        marginTop: 2,
        marginRight: 15
    },
    content: {
        paddingTop: 4,
        paddingBottom: 4,
        "&:last-child": {
            paddingBottom: 8
        }
    },
    detail_txt: {
        display: 'inline',
        fontFamily: 'Merriweather, serif',
        fontSize: '14px',
        lineHeight: '14px',
        color: grey[50],
    },
    media: {
        width: 100,
        height: 'auto',
        float: 'right',
        borderRadius: 5,
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 10
    },
    translated_div: {
        marginLeft: 10,
        marginBottom: 10
    },
    traslated_icon: {
        position: 'relative',
        top: 3,
        marginLeft: 5,
        width: 16,
        height: 16,
        color: grey[200]
    },
    translated_txt: {
        display: 'inline',
        marginLeft: 2,
        fontSize: 12,
        fontStyle: 'italic',
        color: grey[500],
    },
    redditavatar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 32,
        height: 32
    },
    titleline: {
        position: 'relative',
        marginLeft: 20,
        marginRight: 10
    },
    reddittitle: {
        position: 'relative',
        float: 'left',
        fontFamily: 'Merriweather, serif',
        fontSize: '20px',
        lineHeight: '20px',
        margin: 10,
        color: grey[50]
    },
    date: {
        fontSize: 12,
        color: grey[500],
        float: 'right',
        margin: 10,
        marginRight: 30
    }
});

class SearchResultCard extends React.Component {

    getSource(name, type) {
        let newstype = -1;
        if (type === "Breaking") {
            newstype = NEWSTYPE.NEWS_TYPE_BREAKING;
        } else if (type === "Opinion") {
            newstype = NEWSTYPE.NEWS_TYPE_OPINION;
        }

        let source = null;
        if (newstype === -1) {
            source = this.props.sources.find(item => item.label === name);
        } else {
            source = this.props.sources.find(item => item.label === name && item.type === newstype);
        }
        if (source) {
            return source;
        }
        return null;
    }

    render() {
        const {
            classes,
            article,
            handleClick
        } = this.props;

        var source = this.getSource(article.source, article.type);
        if (source === null) {
            return (
                <div></div>
            );
        }

        var transMark = "";
        var headline = article.headline;
        var summary = article.summary;
        if (source.translation !== null && article.translated === true) {
            transMark = "Translated from " + source.translation.lang + " by " + source.translation.engine;
        } else {
            headline = article.headline;
        }
        var createdTime = get_timestring(article.created);
        var hasImage = (article.image !== null && article.image !== "" && article.image !== 'self' && article.image !== 'default');

        var needSpacing = false;
        if (headline && headline.length < 50) {
            if (summary === null || summary === undefined) {
                needSpacing = true;
            } else {
                if (summary.length < 50) {
                    needSpacing = true;
                }
            }
        }

        var isNews = (article.type === "Breaking" || article.type === "Opinion");
        var prefix = "";
        if (isNews === false) {
            prefix = 'r/' + article.source;
        }

        return (
            <div>
                {isNews ? (
                    <Card className={classes.card}>
                        <Link className={classes.linkitem} to={ROUTES.SEARCH_VIEW}>
                            <div onClick={handleClick(article.objectID)}>
                                <CardHeader className={classes.header}
                                    avatar={
                                        <Avatar alt={source.label} src={source.cimage} className={classes.avatar} />
                                    }
                                    title={
                                        <Typography className={classes.title}>
                                            {headline}
                                        </Typography>
                                    }
                                    subheader={
                                        <div className={classes.subtitle}>
                                            <img
                                                alt={source.image}
                                                className={classes.source_img}
                                                src={source.image}
                                            />
                                            <Typography className={classes.subtitle_left}>
                                                {article.source}
                                            </Typography>
                                            <Typography className={classes.subtitle_right}>
                                                {createdTime}
                                            </Typography>
                                        </div>
                                    }
                                />
                                <CardContent className={classes.content}>
                                    <Typography variant="body2" color="textSecondary" className={classes.detail_txt}>
                                        {hasImage && (
                                            <img alt={""} src={article.image} className={classes.media} />
                                        )}
                                        {summary} {needSpacing && (
                                            <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                                        )}
                                    </Typography>
                                </CardContent>
                                {source.translation !== null && (
                                    <div className={classes.translated_div}>
                                        <StarIcon className={classes.traslated_icon} />
                                        <Typography className={classes.translated_txt}>
                                            {transMark}
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        </Link>
                    </Card>

                ) : (
                        <Card className={classes.card}>
                            <Link className={classes.linkitem} to={ROUTES.SEARCH_VIEW}>
                                <div onClick={handleClick(article.objectID)}>
                                    <CardHeader className={classes.header}
                                        avatar={
                                            <Avatar alt={source.label} src={source.cimage} className={classes.redditavatar} />
                                        }
                                        title={
                                            <div className={classes.titleline}>
                                                <Typography className={classes.reddittitle}>
                                                    {prefix}
                                                </Typography>
                                                <Typography className={classes.date}>
                                                    {createdTime}
                                                </Typography>
                                            </div>
                                        }
                                    />
                                    <CardContent className={classes.content}>
                                        <Typography variant="body2" color="textSecondary" className={classes.detail_txt}>
                                            {hasImage && (
                                                <img alt={""} src={article.image} className={classes.media} />
                                            )}
                                            {headline} {needSpacing && (
                                                <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                                            )}
                                        </Typography>
                                    </CardContent>
                                </div>
                            </Link>
                        </Card>
                    )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    sources: state.uiState.sources,
    searchKey: state.uiState.searchKey
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SearchResultCard));

