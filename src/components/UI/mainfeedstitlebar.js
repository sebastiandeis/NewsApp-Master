import React from 'react'
import { withStyles } from '@material-ui/styles';
import { Typography, Paper } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#000',
    },
    wrapper: {
        background: 'inherit',
        display: 'flex',
        marginLeft: 16,
        marginRight: 16
    },
    mainTitle: {
        color: '#ffffff',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 20,
        lineHeight: '56px',
    },
    summaryTitle: {
        color: grey[500],
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 14,
        lineHeight: '56px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
})

const MainFeedsTitlebar = (props) => {
    const { classes, mainTitle, summaryTitle } = props;

    return (
        <div className={classes.root}>
            <Paper className={classes.wrapper}>
                <Typography className={classes.mainTitle}>{mainTitle || 'News'}&nbsp;&nbsp;</Typography>
                <Typography className={classes.summaryTitle}>{summaryTitle || 'from top sources around the world'}</Typography>
            </Paper>
        </div>
    )
}

export default withStyles(styles)(MainFeedsTitlebar)