import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
    root: {
        backgroundColor: grey[700],
        borderRadius: '50%',
    },
    closeIcon: {
        color: '#fff',
        height: 20,
        width: 24
    },
    background: {
        backgroundColor: '#fff',
    }
});

const CloseIcon = (props) => {
    const { classes, height, width } = props;
    return (
        <div className={classes.root} style={{ height: height || 20, width: width || 20}}>
            <SvgIcon className={classes.closeIcon}>
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
            </SvgIcon>
        </div>
    )
};
export default withStyles(styles)(CloseIcon);