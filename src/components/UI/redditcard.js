import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import { conf_sources } from '../../config/source';
import { get_timestring } from '../../utility/utils';

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
    title: {
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
    },
    content: {
        paddingTop: 0,
        paddingBottom: 0
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
    }
});


function get_source_by_name(name) {
    var source = conf_sources.find(item => item.label === name);
    if (source) {
        return source;
    }
    return null;
}

class RedditCard extends React.Component {

    render() {
        const { article, classes } = this.props;

        var source = get_source_by_name(article.source);
        if (source === null) {
            console.log("Error, Unknown article source!");
            return (
                <div></div>
            );
        }

        var redditTime = get_timestring(article.created);

        var title = article.title;
        var needSpacing = false;
        if (title && title.length < 50) {
            needSpacing = true;
        }

        return (
            <Card className={classes.card}>
                <CardHeader className={classes.header}
                    avatar={
                        <Avatar alt={source.label} src={source.cimage} className={classes.avatar} />
                    }
                    title={
                        <div className={classes.titleline}>
                            <Typography className={classes.title}>
                                {article.prefix}
                            </Typography>
                            <Typography className={classes.date}>
                                {redditTime}
                            </Typography>
                        </div>
                    }
                />
                <CardContent className={classes.content}>
                    <Typography variant="body2" color="textSecondary" className={classes.detail_txt}>
                    { article.thumbnail !== '' && article.thumbnail !== 'self' && article.thumbnail !== 'default' && (
                        <img alt={""} src={article.thumbnail} className={classes.media} />
                    )}
                        {title} { needSpacing && ( 
                            <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                        )}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(RedditCard);
