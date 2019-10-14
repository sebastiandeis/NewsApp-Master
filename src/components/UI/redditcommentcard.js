import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// import Avatar from '@material-ui/core/Avatar';
// import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import purple from '@material-ui/core/colors/purple';

// import ShareDialog from './sharedialog';
import { get_timestring } from '../../utility/utils';

const styles = theme => ({
    card: {
        position: 'relative',
        // maxWidth: 480,
        width: '100% - 20',
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: grey[900]
    },
    header: {
        padding: 0
    },
    avatar: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 24,
        height: 24,
        backgroundColor: purple[500]
    },
    titleline: {
        position: 'relative',
        marginLeft: 0
    },    
    title: {
        position: 'relative',
        fontSize: 12,
        float: 'left',
        margin: 10,
        color: grey[50]
    },
    date: {
        fontSize: 12,
        float: 'right',
        marginRight: 70,
        marginTop: 10,
        color: grey[500]
    },
    content: {
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 10
    },
    detail_txt: {
        display: 'inline',
        fontFamily: 'Merriweather, serif',
        fontSize: '14px',
        lineHeight: '14px',
        color: grey[50],        
    },
    author: {
        display: 'inline',
        float: 'right',
        fontSize: '12px',
        lineHeight: '12px',
        color: grey[500],
        marginRight: 10,
        marginBottom: 10
    }
});

function get_ordered_number(number) {
    if (number < 0 || number > 9) {
        return null;
    }

    const ordered_number = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
    return ordered_number[number]
}


class RedditCommentCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showShareDlg: false
        };

        this.clickShareButton = this.clickShareButton.bind(this);
        this.handleShareClose = this.handleShareClose.bind(this);
    }

    clickShareButton() {
        this.setState({
            showShareDlg: true
        });
    }

    handleShareClose() {
        this.setState({
            showShareDlg: false
        });
    };

    render() {
        const { comment, number, classes } = this.props;
        // const { showShareDlg } = this.state;

        var ordered_number = get_ordered_number(number);
        var title = ordered_number + ' Ranked Response';
        var author = 'Posted by ' + comment.author;
        var redditTime = get_timestring(comment.created);

        return (
            <div>
            <Card className={classes.card}>
                <CardHeader className={classes.header}
                    // avatar={
                    //     <Avatar className={classes.avatar} onClick={this.clickShareButton}>
                    //         <ShareIcon />
                    //     </Avatar>
                    // }
                    title={
                        <div className={classes.titleline}>
                            <Typography className={classes.title}>
                                {title}
                            </Typography>
                            <Typography className={classes.date}>
                                {redditTime}
                            </Typography>
                        </div>
                    }
                />
                <CardContent className={classes.content}>
                    <Typography variant="body2" color="textSecondary" className={classes.detail_txt}>
                        {comment.body}
                    </Typography>
                </CardContent>

                { comment.author !== '' && (
                <Typography variant="body2" color="textSecondary" className={classes.author}>
                    {author}
                </Typography>                                
                )}                
                </Card>
                {/* <ShareDialog
                    open={showShareDlg}
                    onClose={this.handleShareClose}
                    shareUrl={comment.url}
                    title={title} /> */}
            </div>
        );
    }
}

export default withStyles(styles)(RedditCommentCard);
