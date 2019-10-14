import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
    root: {
        backgroundColor: 'rgb(58, 180, 73)',
        borderRadius: '50%',
        fontSize: 20
    },
    checkIcon: {
        color: '#fff',
        height: 20,
        width: 18
    },
    background: {
        backgroundColor: '#fff',
    }
});

const CheckIcon = (props) => {
    const { classes, height, width } = props;
    return (
        <div className={classes.root} style={{ height: height || 20, width: width || 20}}>
            <SvgIcon className={classes.checkIcon}>
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </SvgIcon>
        </div>
    )
};
export default withStyles(styles)(CheckIcon);