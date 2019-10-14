import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

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
        marginBottom: 10,
        padding: 0,
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
    title: {
        position: 'relative',
        fontFamily: 'Merriweather, serif',
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
            paddingBottom: 0
        }
    },
    contentbreak: {
        paddingTop: 8,
        paddingBottom: 8
    },
    summary_txt: {
        display: 'inline',
        position: 'relative',
        fontFamily: 'Merriweather, serif',
        fontSize: '14px',
        lineHeight: '14px',
        color: grey[50],
    },
    full_txt: {
        display: 'inline',
        position: 'relative',
        fontFamily: 'Merriweather, serif',
        fontSize: '14px',
        lineHeight: '14px',
        color: grey[50],
    },
    summ_txt: {
        display: 'inline',
        position: 'relative',
        fontFamily: 'Merriweather, serif',
        fontSize: '14px',
        lineHeight: '14px',
        color: '#5ED1AA'
    },
    modebtn_pretxt: {
        display: 'inline',
        fontFamily: 'Roboto, Arial',
        fontSize: '10px',
        fontWeight: 600,
        lineHeight: '12px',
        color: grey[200]
    },
    modebtn_txt: {
        display: 'inline',
        fontFamily: 'Roboto, Arial',
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: '12px',
        color: grey[200]
    },
    modebtn_section: {
        minHeight: 70,
        display: 'flex',
    },
    media: {
        width: 100,
        height: 'auto',
        float: 'right',
        borderRadius: 5,
        marginLeft: 5,
        marginTop: 8,
        marginBottom: 10,
        marginRight: 15
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
        position: 'relative',
        marginLeft: 65,
        fontSize: 12,
        fontStyle: 'italic',
        color: grey[500],
    },
    author: {
        position: 'relative',
        marginBottom: 0,
        fontSize: 14,
        fontFamily: 'Merriweather, serif',
        color: grey[200],
    },
    actionbtn: {
        position: 'absolute',
        bottom: 5,
        right: 10,
        fontFamily: 'Arial',
        fontSize: 12,
        textTransform: 'inherit',
        float: 'right',
        color: grey[400]
    },
    prefixbtn: {
        marginTop: 8,
        maxHeight: 70,
        minWidth: 71
    }
});

const PrefixButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        lineHeight: 1,
        marginRight: 10,
        marginBottom: 3,
        padding: 5,
        borderRadius: 0,
        border: '1px solid',
        backgroundColor: grey[900],
        borderColor: grey[200],
        '&:hover': {
            backgroundColor: grey[900],
            borderColor: '#FFF'
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: grey[900],
            borderColor: '#FFF'
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(21,21,21,.5)',
        },
    },
})(Button);


class NewsView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fullMode: true
        };

        this.handleModeClick = this.handleModeClick.bind(this);
    }

    handleModeClick() {
        var newMode = !this.state.fullMode;
        this.setState({
            fullMode: newMode
        });
    }

    getSource(name) {
        let source = this.props.sources.find(item => item.label === name);
        if (source) {
            return source;
        }
        return null;
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const { article, classes } = this.props;
        const { fullMode } = this.state;

        var source = this.getSource(article.source);
        if (source === null) {
            console.log("Error, Unknown article source!");
            return (
                <div></div>
            );
        }

        var headline = article.headline;
        var summary = article.summary;
        var newsTime = get_timestring(article.published);
        var transMark = "";
        if (source.translation !== null && article.translated === true) {
            transMark = "Translated from " + source.translation.lang + " by " + source.translation.engine;
        }
        var prefix = "";
        var sentences = [];
        if (fullMode) {
            prefix = "Full Article";
            sentences = article.text.split('\n');
        } else {
            prefix = "Auto Summary";
            sentences = article.summarized_text.split('\n');
        }

        var first_sentence = sentences[0];
        var other_sentences = sentences.slice(1);

        var author = article.author;
        if (author === null || author === "") {
            author = "";
        } else {
            author = "By " + author;
        }
        var hasImage = (article.image !== null && article.image !== "");

        return (
            <Card className={classes.card}>
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
                                alt={""}
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
                {source.translation !== null && (
                    <Typography className={classes.translated_txt}>
                        {transMark}
                    </Typography>
                )}

                <CardContent className={classnames(classes.content, classes.modebtn_section)}>
                    <PrefixButton className={classes.prefixbtn} onClick={this.handleModeClick}>
                        <Box>
                            <Typography className={classes.modebtn_pretxt}>
                                Press  here<br /> for the<br />
                            </Typography>
                            <Typography className={classes.modebtn_txt}>
                                {prefix.split(' ')[0]}<br />{prefix.split(' ')[1]}
                            </Typography>
                        </Box>
                    </PrefixButton>
                    <CardContent className={classes.content}>
                        {
                            author &&
                            <Typography className={classes.author}>
                                {author}
                            </Typography>
                        }
                        <Typography variant="body2" color="textSecondary" className={classes.summary_txt}>
                            {summary}
                        </Typography>
                    </CardContent>
                </CardContent>

                <div className={classes.content}>
                    <Typography className={classes.author}>
                        {hasImage && (
                            <img alt={""} src={article.image} className={classes.media} />
                        )}
                    </Typography>
                    <CardContent className={classes.content}>
                        {fullMode ? (
                            <Typography variant="body2" color="textSecondary" className={classes.full_txt}>
                                {first_sentence}
                            </Typography>
                        ) : (
                                <Typography variant="body2" color="textSecondary" className={classes.summ_txt}>
                                    {first_sentence}
                                </Typography>

                            )}
                    </CardContent>
                </div>

                {other_sentences.map((sentence, index) => (
                    <CardContent key={index} className={classes.content}>
                        {fullMode ? (
                            <Typography variant="body2" color="textSecondary" className={classes.full_txt}>
                                {sentence}
                            </Typography>
                        ) : (
                                <Typography variant="body2" color="textSecondary" className={classes.summ_txt}>
                                    {sentence}
                                </Typography>
                            )}
                    </CardContent>
                ))}
                <CardContent className={classes.contentbreak}></CardContent>
                <CardActions>
                    <Button className={classes.actionbtn} size="small" color="primary"
                        target="_blank" href={article.url}>
                        Read original article
                    </Button>
                </CardActions>
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
)(withStyles(styles)(NewsView));
