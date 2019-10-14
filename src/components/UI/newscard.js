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
import Grid from '@material-ui/core/Grid';

import { get_timestring } from '../../utility/utils';
import { conf_countries } from '../../config/state';
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
    groupArticles: {
        marginLeft: 20,
        marginBottom: 5
    },
    groupAvatar: {
        width: 24,
        height: 24
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
    }
});


class NewsCard extends React.Component {

    getSource(name, newsType) {
        let newstype = NEWSTYPE.NEWS_TYPE_BREAKING;
        if (newsType === "Breaking") {
            newstype = NEWSTYPE.NEWS_TYPE_BREAKING;
        } else if (newsType === "Opinion") {
            newstype = NEWSTYPE.NEWS_TYPE_OPINION;
        }

        let source = this.props.sources.find(item => item.label === name &&
            item.type === newstype);
        if (source) {
            return source;
        }
        return null;
    }

    getFlagPath(countryCode) {
        for (let country of conf_countries) {
            if (country.value === countryCode) {
                return country.flag;
            }
        }
        return "";
    }

    render() {
        const { 
            classes,
            article,
            handleClick,
            handleGroupId
        } = this.props;

        var source = this.getSource(article.source, article.type);
        if (source === null) {
            console.log("Error, Unknown article source!", article);
            return (
                <div></div>
            );
        }

        var hasGroupIds = false;
        var groupInfo = [];
        if (article.group_ids && article.group_ids.length > 0) {
            hasGroupIds = true;
            for (let item of article.group_ids) {
                let flag = this.getFlagPath(item.state);
                groupInfo.push({
                    flag: flag,
                    nid: item.nid
                });
            }
        }

        var transMark = "";
        var headline = "";
        var summary = "";
        if (source.translation !== null && article.translated === true) {
            transMark = "Translated from " + source.translation.lang + " by " + source.translation.engine;
            headline = article.tr_headline;
            headline = headline.slice(0, headline.length - 1);
            summary = article.tr_summary;
        } else {
            headline = article.headline;
            summary = article.summary;
        }
        var newsTime = get_timestring(article.published);
        var hasImage = (article.image !== null && article.image !== "");

        var needSpacing = false;
        if (headline && headline.length < 50) {
            if (summary === null) {
                needSpacing = true;
            } else {
                if (summary.length < 50) {
                    needSpacing = true;
                }
            }
        }

        // limit summary to 5 lines
        if (summary !== null && summary.length > 160) {
            summary = summary.slice(0, 160);
            summary += "...";
        }

        return (
            <Card className={classes.card}>
            <Link className={classes.linkitem} to={ROUTES.NEWS}>
            <div onClick={handleClick(article.nid)}>
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
                                {newsTime}
                            </Typography>
                        </div>
                    }
                />
                <CardContent className={classes.content}>
                    <Typography variant="body2" color="textSecondary" className={classes.detail_txt}>
                    { hasImage && (
                        <img alt={""} src={article.image} className={classes.media} />
                    )}
                        {summary} { needSpacing && ( 
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

                {hasGroupIds && (
                <Grid container className={classes.groupArticles} spacing={0} justify="flex-start" alignItems="center">
                    {groupInfo.map((item, index) => (
                        <Grid key={index} item>
                            <Link className={classes.linkitem} to={ROUTES.NEWS}>
                                <Avatar src={item.flag} 
                                    className={classes.groupAvatar} 
                                    onClick={handleGroupId(item.nid)} />                    
                            </Link>
                        </Grid>
                    ))}
                </Grid>
                )}
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    sources: state.uiState.sources
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(NewsCard));

